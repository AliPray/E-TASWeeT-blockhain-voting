import React from 'react'
import Image from 'next/image'
import logo from "../assets/logo.png"
import {useEffect, useState} from "react"
import Footer from '../components/Footer'
import metamasklogo from '../assets/metamasklogo.png'
import { ethers } from 'ethers'
import ABI from "../constants/abi.json"

export default function Register() {

  const contractAddress = "0xB532C8eA3855C724126068d14F7BE39beEbf7B79"
   //states for checking metamask in borwser, connected, and set the singer form the connected wallet
   const [isConnected, setIsConnected] = useState(false)
   const [hasMetamask, setHasMetamask] = useState(false);
   const [signer, setSigner] = useState(undefined);
   const [address, setAddress] = useState("")


  //other states
  const [citizen, setCitizen] = useState([])
  const [inputs, setInputs] = useState({
    id:"",
    fName: "",
    lName:"",
    state:"",
  })
  const [checked, setChecked] = useState(false)

  //change the checkbox status
  const handleClick = () => {
    setChecked(!checked)
    console.log(checked)
  }

  //render page once onload

   useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);

    }
  },[]);

  //registration function:
  async function register(){
    if (typeof window.ethereum !== "undefined"){
      const abi = ABI
      const contract = new ethers.Contract(contractAddress, abi, signer);
      if(checked){
        try {
            await contract.addVoter(inputs.id,inputs.fName,inputs.lName,inputs.state)
            window.location.href = '/';  

        } catch (error) {
          alert("Id already registered to the Election!")
          
        }

      }

    } else {
        console.log("Please install MetaMask");
    }
  }

  //function to fetch the voter from the citizens database (mongodb)
  const fetchCitizen = async () => {
      const response = await fetch(`/api/citizens/${inputs.id}`);
      const data = await response.json();
    console.log(data)
    setCitizen(data);
  };

  //functin to connect to metamask wallet account 
  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log(accounts[0]);
        var userAdd = accounts[0];
        setAddress(userAdd)
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }


  //function hadnle input changes and update the states
  const handleInputChange =  (evt) => {
    const value = evt.target.value;
    setInputs({
      ...inputs,
      [evt.target.name]: value
    });
    console.log(inputs)
  }

  
  return (
    <div>
      {hasMetamask ? (
      isConnected ? (
        <div className=" grid h-screen place-items-center">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-sky-100 ">
              <div className="grid place-items-center">
                <Image src={logo} className="object-scale-down h-40 w-40 rounded-full shadow-lg"></Image>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an Account
                </h1>
              </div>
              
              {/* register form */}
              <div className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wallet Address:</label>
                      <p className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="address" id="" placeholder="User Address">
                        {address+"...."}</p>
                  </div>
                  <div>
                      <label for="id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Citizen Identity Card Number (CIN):</label>
                      <input onChange={handleInputChange} type="number" name="id" id="id" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your CIN here" required=""></input>
                  </div>
                  <div>
                      <label for="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name:</label>
                      <input onChange={handleInputChange} type="name" name="fName" id="fName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your first Name here" required=""></input>
                  </div>
                <div>
                      <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name:</label>
                      <input onChange={handleInputChange} type="name" name="lName" id="lName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your last name here" required=""></input>
                  </div>
                  <label for="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select State:</label>
                  <select onChange={handleInputChange} name="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="Monastir">Monastir</option>
                      <option value="Sousse">Sousse</option>
                      <option value="Mahdia">Mahdia</option>
                  </select>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input onClick={handleClick} checked={checked} id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""></input>
                      </div>
                      <div className="ml-3 text-sm">
                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/TermsAndConditions" target="_blank">Terms and Conditions of use.</a></label>
                      </div>
                  </div>
                  <button onClick={()=>register()} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/"  className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login from here.</a>
                  </p>
              </div>
          </div>
          
          </div>
          <div className="w-full">
            <Footer></Footer>
          </div>
          
        </div>
        ) : (
          <div className='grid place-items-center h-screen'>
            
            <button onClick={()=>connect()} className="w-60 h-20 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
            <Image className='scale-50' src={metamasklogo} alt="Meta mask logo"></Image>
            Connect to Metamask!</button>
  
          </div>
        )
      ) : (
            <a href="https://metamask.io/download/" class="button">Please Install Metamask from here.</a>
      )}

    </div>
    
  )
}
