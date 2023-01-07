import React,{useState} from 'react';

export default function Navbar(props){
    const [isChanged,setIsChanged]=useState({inputForm:"selected",studentsPresent:"not-selected",logbook:"not-selected"});
    function handleButtonClick(event){
        const {name}=event.target;
        props.changeVisibility(name);
        if(name==="inputForm"){
            setIsChanged({inputForm:"selected",studentsPresent:"not-selected",logbook:"not-selected"});
        } else if(name==="studentsPresent"){
            setIsChanged({inputForm:"not-selected",studentsPresent:"selected",logbook:"not-selected"});
        } else if(name==="logbook"){
            setIsChanged({inputForm:"not-selected",studentsPresent:"not-selected",logbook:"selected"});
        }
    }
    return (<div className='navbar'>
        <button className={isChanged.inputForm} name="inputForm" onClick={handleButtonClick}>INPUT FORM</button>
        <button className={isChanged.studentsPresent} name="studentsPresent" onClick={handleButtonClick}>STUDENTS PRESENT LIST</button>
        <button className={isChanged.logbook} name="logbook" onClick={handleButtonClick}>STUDENT LOGBOOK</button>
    </div>);
}