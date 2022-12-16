import React from 'react'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import UserNavBar from '../components/UserNavBar'
import Footer from '../components/Footer'
import voterPic from "../assets/voterpic.png"


export default function UserProfile() {
    
    const[id, setId]= useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [state, setState] = useState()
    const [vote, setVote] = useState()


    useEffect(() => {
        //Runs on first render
        setId(localStorage.getItem('userId'))
        setFirstName(localStorage.getItem('userFirstName'))
        setLastName(localStorage.getItem('userLastName'))
        setState(localStorage.getItem('userState'))
        setVote(localStorage.getItem('vote'))
        
      }),[];
  
    return (
    
    <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
        <UserNavBar></UserNavBar>
        <div className="p-16">
    <div className="p-8 bg-white shadow mt-24">
    <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="relative">
        <div className="w-48 h-48 bg-sky-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-sky-500">
        <Image src={voterPic}></Image>
        </div>
        </div>
        <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
        <h1 className="text-xl">Welcome back!</h1>
        </div>
    </div>

    <div className="mt-20 text-center border-b pb-12">
        <h1 className="text-4xl font-medium text-gray-700">Citizen Name: {firstName} {lastName}</h1>
        <h1 className="text-2xl font-small text-gray-700">CIN NUMBER: {id}</h1>
        <p className="font-light text-2xl text-gray-600 mt-3">State: {state}</p>
        <p className="font-light text-2xl text-gray-600 mt-3">VoterStatus: {vote}</p>
    </div>

    </div>
        </div>
        <Footer></Footer>
    </div>


  )
}
