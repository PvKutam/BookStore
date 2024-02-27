import React,{useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import {useFirebase} from "../Context/Firebase"
export function Card(props) {
    const [url,setUrl]= useState()
    const navigate= useNavigate()
    const firebase = useFirebase()

    useEffect(()=>{
        firebase.getImageURL(props.imgURL).then((url)=>setUrl(url))

    },[firebase])
  return (

           <div className="max-w-xs mt-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg" src={url} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">This book has a title Complete {props.name} and price is  Rs.{props.price}</p>
                    <button onClick={e=> navigate(`/Book/View/${props.id}`)} href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg
                     hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        View
                         <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                </div>
            </div>
      
  )
}


