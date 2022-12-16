import React from 'react'
import { useState } from 'react'




export default function testcitizendata() {

const [citizen, setCitizen] = useState([])
const [id, setId] = useState("")
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [state, setState] = useState("")

const fetchCitizen = async () => {
      const response = await fetch(`/api/citizens/${id}`);
      const data = await response.json();
    console.log(data)
    setCitizen(data);
     };

const handleInputChange =  (evt) => {
    const val = evt.target.value;
    setId(val)
    setFirstName(val)
    setLastName(val)
    setState(val)
}


  return (
    
    <>
    <input placeholder="id" onChange={handleInputChange}></input>
    <input placeholder="firstName" onChange={handleInputChange}></input>
    <input placeholder="LastName" onChange={handleInputChange}></input>
    <input placeholder="state" onChange={handleInputChange}></input>
    <button onClick={fetchCitizen}>test</button>
    {
        citizen.map(citizen =>{
            return(
                <div key={citizen.voterId}>
                    {citizen.voterId}
                    {citizen.firstName} 
                    {citizen.lastName}
                    {citizen.state}
                </div>
               
            )
        })
        
    }
    </>


    
  )
}
