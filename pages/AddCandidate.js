import React from 'react'
import AdminNavBar from '../components/AdminNavBar'
import CandidateCards from '../components/CandidateCards'
import Footer from '../components/Footer'
import ABI from "../constants/abi.json"
import { ethers } from 'ethers'



export default function AddCandidate() {
  
  const contractAddress = "0xB532C8eA3855C724126068d14F7BE39beEbf7B79"
  const abi = ABI


  return (

    <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
        <AdminNavBar></AdminNavBar>
        <div className=" mt-10 ml-10">
        </div>
        <div className="p-16">
          <div className="p-8 bg-white shadow ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-sky-100">
          <div className="grid place-items-center">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                add candidate to the election
            </h1>
          </div>
          <form className="space-y-4 md:space-y-6" action="#">
              <div>
                  <label for="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Candidate Identity Card Number (CIN):</label>
                  <input type="number" name="cin" id="cin" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Candidate's CIN here" required=""></input>
              </div>
              <div>
                  <label for="cname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name:</label>
                  <input type="name" name="cname" id="cname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Candidate's Full Name here" required=""></input>
              </div>

              <div>
                  <label for="party" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Party Name:</label>
                  <input type="name" name="party" id="party" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Candidate's Party Name here" required=""></input>
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add Candidate</button>
          </form>
      </div>

          </div>
        </div>
        <Footer></Footer>
        
    </div>
  )
}
