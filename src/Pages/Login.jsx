import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"
import { useFirebase } from "../Context/Firebase";


export const LoginPage=()=>{

    
    const firebase= useFirebase()
    const Navigation = useNavigate()
    console.log(firebase);
    useEffect(()=>{
        if (firebase.isLoggedin){
            Navigation("/")
        }
    }, [ firebase, Navigation])
    const [email,setEmail] = useState("")
    const [password,setPassword] =  useState("")
    console.log(firebase);
    const Formsubmit = async(e)=>{
        e.preventDefault();
        const result = await firebase.SigninUserWithEmailandPassword(
            email,
            password
        )
    }
    return(
        <div className="flex flex-col justify-center items-center h-screen w-full bg-sky-800">
        <form className="max-w-sm mx-auto" onSubmit={Formsubmit}>
            <div className="mb-5">
                <label type="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
            </div>
            <div className="mb-5">
                <label type="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        </form>
        <h1 className="mt-4 mb-4 text-white">OR</h1>
        <button className="bg-red-500 p-2 rounded-lg text-white" onClick={firebase.SignInWithGoogle}>Signin with Google</button>
    </div>
    
    )
}