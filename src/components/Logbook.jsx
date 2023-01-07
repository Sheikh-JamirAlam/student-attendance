import React from 'react';

export default function Logbook(props){
    return (<div className={`${props.visibility} present-list`}>
        {/* <h1>Student Logbook</h1> */}
        <div className='table-wrapper'>
            <table className='student-table'>
                <thead>
                    <tr>
                        <th>Roll Number</th>
                        <th>Student Name</th>
                        <th>Checkin Time</th>
                        <th>Checkout Time</th>
                    </tr>
                </thead>
                <tbody>
                    {props.students.map((student)=>{
                        return (<tr key={student.rollNumber}>
                            <td>{student.rollNumber}</td>
                            <td>{student.name}</td>
                            <td>{student.checkInTime}</td>
                            <td>{student.checkOutTime}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
    </div>);
}