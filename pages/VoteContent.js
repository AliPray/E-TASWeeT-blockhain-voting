import React from 'react'
import UserNavBar from '../components/UserNavBar'
import candidatePic from "../assets/candidatepic.png"
import Image from 'next/image'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers' 
import ABI from "../constants/abi.json"




export default function VoteContent() {

  


  useEffect(() => {
    getCandidateInfo()
  },);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
    connect()
    

  },[]);
  

  const contractAddress = "0xB532C8eA3855C724126068d14F7BE39beEbf7B79"

  const [isConnected, setIsConnected] = useState(false)
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [address, setAddress] = useState("")
  const [candidateInfo, setCandidateInfo] = useState(null)
  const [voteTo, setVoteTo] = useState()


  
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

  async function getCandidateInfo(){
    if (typeof window.ethereum !== "undefined"){
      const abi = ABI
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {

        const result = await contract.returnCandidates()
        let array = [] 
        for(var i=0;i<result.length;i++){
          array.push([result[i][0].toNumber(),result[i][1],result[i][2]])
        }
        setCandidateInfo(array)

      } catch (error) {
        console.log(error);
      }
      } else {
        console.log("Please install MetaMask");
      }
  }

  async function castVote(){
    if (typeof window.ethereum !== "undefined"){
      const abi = ABI
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {

        const result = await contract.vote()

      } catch (error) {
        console.log(error);
      }
      } else {
        console.log("Please install MetaMask");
      }
  }
  

  //get button value to cast vote,
  const handleClick =  (evt) => {
    var val = evt.target.value
    console.log(val)
  }
  
  return (
    <div>
      
      <div className="bg-blue-100 font-sans w-full min-h-screen m-0">
          <UserNavBar></UserNavBar> 
          <div className="grid place-items-center">
            <h1 className="my-8 font-bold text-white-600 text-4xl">choose your candidate:</h1>
          </div>
          <div className='mx-5 grid grid-cols-4 gap-10 '>

          {candidateInfo && candidateInfo.map(item=>(

            
              <div className ="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <div className ="flex justify-end px-4 pt-4">
                  </div>
                  <div className ="flex flex-col items-center pb-10">
                      <div className="w-40 h-40">
                        <Image className =" scale-50 mb-3 rounded-full shadow-lg" src={candidatePic} alt="candidate picture"/>
                      </div>
                      <h5 className ="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item[1]}</h5>
                      <span className ="text-m font-medium text-gray-500 dark:text-gray-400">{item[2]}</span>
                      <span className ="text-xl text-gray-500 dark:text-gray-400">vote now for n°: {item[0]}</span>
                      <div className ="flex mt-4 space-x-3 md:mt-6">
                          <button  onClick={()=>handleClick()} value={item[0]} className ="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Vote Now</button>
                      </div>
                  </div>
              </div>

            
          ))}
                          
          </div>

      </div>

      <Footer></Footer>
    </div>
  )
}



//  {/* candidate card */}
//  {candidateInfo && candidateInfo.map(item=>(
                
//   ))}