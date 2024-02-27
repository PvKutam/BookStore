import React,{useState} from "react";
import {useFirebase} from "../Context/Firebase";
import { Navbar } from "../Components/Navbar"

export const ListingPage =()=>{
    const firebase = useFirebase();

    const [name,setName] = useState("")
    const [isbnNumber,setIsbnNumber] =  useState("") 
    const [price,setPrice] = useState("")
    const [coverPic,setCoverPic] = useState("")
    const Formsubmit =async(e)=>{
        e.preventDefault();
        await firebase.HandlecreatenewListing(name,isbnNumber,price,coverPic)
    }

      return(
        <>
        <Navbar />  
        <div className="flex flex-col justify-center items-center h-screen w-full bg-black">
        <form className="max-w-xl mx-auto" onSubmit={Formsubmit}>
            <div className="mb-5">  
                <label type="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter BookName </label>
                <input type="text" placeholder={name} value={name} onChange={(e)=>{setName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900
                 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"required />
            </div>
            <div className="mb-5">
                <label type="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ISBN</label>
                <input type="text" placeholder={isbnNumber} value={isbnNumber}  onChange={(e)=>{setIsbnNumber(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label type="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input type="text" placeholder={price} value={price}  onChange={(e)=>{setPrice(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            
            

                <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="coverPicInput">Cover Pic</label>
                <input 
                    type="file" 
                    id="coverPicInput" 
                    onChange={(e)=>{setCoverPic(e.target.files[0])}} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    required 
                />
                </div>




            
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
             focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600
              dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
       
    </div>
        </>
    )
}