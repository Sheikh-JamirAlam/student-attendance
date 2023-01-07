/* eslint-disable array-callback-return */
import React,{useState,useEffect} from 'react';
import Logbook from './Logbook';
import Navbar from './Navbar';

export default function Records(){
    const [details,setDetails]=useState({rollNumber:"",name:""});
    const [students,setStudents]=useState([]);
    const [presentCount,setPresentCount]=useState(0);
    const [isVisible,setIsVisible]=useState({inputForm:"visible",studentsPresent:"hidden",logbook:"hidden"});
    const [isWarning,setIsWarning]=useState(false);

    function handleCheckIn(student){
        const isAlreadyAdded=students.filter(eachStudent=>{return eachStudent.rollNumber===student.rollNumber})
        if(isAlreadyAdded.length===0){
            const today=new Date();
            const time=new Intl.DateTimeFormat("en-us",{timeStyle:"short"}).format(today);
            setStudents((prevStudents)=>[
                ...prevStudents,
                {
                    ...student,
                    checkInTime:time
                }
            ])
            setDetails({rollNumber:"",name:""});
        }else{
            setIsWarning(true);
            setTimeout(()=>{
                setIsWarning(false);
           },1000);
        }
    }
    function handleCheckOut(studentRoll){
        const today=new Date();
        const time=new Intl.DateTimeFormat("en-us",{timeStyle:"short"}).format(today);
        const updatedStudents=students.map(student=>{
            if(student.rollNumber===studentRoll){
                return{
                    ...student,
                    checkOutTime:time
                };
            }
            return student;
        });
        setStudents(updatedStudents);
    }
    function handleChange(event){
        const {name,value}=event.target;
        setDetails((prevDetails)=>{return {
            ...prevDetails,
            [(name==="rollNumber")?"rollNumber":"name"]:(name==="rollNumber")?`${value.replace(/\D/g,'')}`:`${value}`}})
    }
    function changeVisibility(element){
        if(element==="inputForm"){
            setIsVisible({inputForm:"visible",studentsPresent:"hidden",logbook:"hidden"});
            document.body.style.overflow="hidden";
        } else if(element==="studentsPresent"){
            setIsVisible({inputForm:"hidden",studentsPresent:"visible",logbook:"hidden"});
            document.body.style.overflow="auto";
        } else if(element==="logbook"){
            setIsVisible({inputForm:"hidden",studentsPresent:"hidden",logbook:"visible"});
            document.body.style.overflow="auto";
        }
        setIsWarning(false);
    }

    useEffect(()=>{
        setPresentCount(students.filter(student=>!student.checkOutTime).length);
    },[students]);

    return (<div>
        <Navbar changeVisibility={changeVisibility} />
        <form className={`${isVisible.inputForm} input-form`} onSubmit={(event) => {
                event.preventDefault();
                (details.rollNumber!==""&&details.name!=="")&&handleCheckIn(details);
            }}>
            <label htmlFor="rollNumber">Roll Number:</label>
            <input type="text" id="rollNumber" name="rollNumber" value={details.rollNumber} onChange={handleChange} />
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={details.name} onChange={handleChange} />
            <button className='checkin-button' type="submit">Check In</button>
            <span style={isWarning?{visibility:"visible"}:{visibility:"hidden"}} className='warning'>Student with same roll number already added*</span>
        </form>

        <div className={`${isVisible.studentsPresent} present-list`}>
            <span>Number of students currently present: <span className='count-students'>{presentCount}</span></span>
            <div className='table-wrapper'>
                <table className='student-table'>
                    <thead>
                        <tr>
                            <th>Roll Number</th>
                            <th>Student Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student)=>{
                            if(!student.checkOutTime){
                                return (<tr key={student.rollNumber}>
                                    <td>{student.rollNumber}</td>
                                    <td>{student.name}</td>
                                    <td><button className='checkout-button' onClick={()=>{handleCheckOut(student.rollNumber)}}>Check Out</button></td>
                                </tr>);
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>

        <Logbook visibility={isVisible.logbook} students={students} />
    </div>);
}