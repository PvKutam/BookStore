import React,{useEffect,useState} from 'react'
import {Form, useParams} from "react-router-dom"
import { useFirebase } from '../Context/Firebase'
import {Navbar} from "../Components/Navbar"


const BookDetails = () => {
    const id = useParams()
    const firebase = useFirebase()
    const [BookData,setBookData] = useState(null)
    const [image,setImage] = useState(null)
    const [qty,setQty] = useState(1)

    useEffect(()=>{
        firebase.getBookByID(id.Bookid).then((val)=>setBookData(val.data()))
    },[])
    useEffect(()=>{
        if(BookData){
            const imgURL = BookData.imgURL;
            firebase.getImageURL(imgURL).then((url)=>setImage(url))
        }
    },[BookData])
    // const {name,UserEmail,price} = BookData
    
        if (!BookData) {
         return <div>Loading...</div>;
    }

    const placeorder = async()=>{
     const result=  await firebase.placeOrder(id.Bookid,qty)
     console.log("order placed",    result);
    }
  return (
    <div>
        <Navbar />
        
      <div className='flex gap-4 justify-center items-center py-4 px-6  flex-col '> 
        <img  className='md:w-1/2' src={image}/>
        <div>
        <h1 className='text-3xl text-blue-800'>{BookData?.name}</h1>
        <h3 className='text-xl mt-2 mb-2'>Rs. {BookData?.price}</h3>
        <h2 className='text-3xl text-blue-800 mb-2'>Owener Deatils</h2>
        <h1 className='text-2xl'>P.v.kutamraju</h1>
        <h1 className='text-2xl'>{BookData?.UserEmail}</h1>
       <div className='flex  gap-5 mt-5 rounded-sm'>
      <input type='Number' onChange={(e)=>setQty(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
       dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500 w" placeholder="Qty"  value={qty} required></input>
        
        <button onClick={placeorder} className='px-3 py-2 rounded-lg text-white bg-green-600'>Buy now </button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails
