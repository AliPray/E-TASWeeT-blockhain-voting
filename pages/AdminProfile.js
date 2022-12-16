import React from 'react'
import AdminNavBar from '../components/AdminNavBar'

export default function AdminProfile() {
  return (
    <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
        <AdminNavBar></AdminNavBar>
        <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="relative">
            <div className="w-48 h-48 bg-sky-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-sky-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
            </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <h1 className="text-xl">Welcome back Admin!</h1>
            </div>
    </div>

    <div className="mt-20 text-center border-b pb-12">
        <h1 className="text-4xl font-medium text-gray-700">Election Admin</h1>
        <h1 className="text-2xl font-small text-gray-700">Wallet Address</h1>
    </div>

    </div>
        </div>
        
    </div>
  )
}
