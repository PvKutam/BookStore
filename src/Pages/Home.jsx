import React,{useState,useEffect} from 'react'
import {useFirebase} from "../Context/Firebase"
import {Navbar} from "../Components/Navbar"
import {Card} from "../Components/Card"

export  function Home() {
    const [books,setBooks] = useState([])
    const firebase = useFirebase();
    useEffect(()=>{
        firebase.HandlegetallBooks().then((books)=>setBooks(books.docs))
    },[firebase])
  return (
    <>
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-3  py-4 px-6 " >
        {books.map(book=> <Card key={book.id} id={book.id} {...book.data()} />)}      
        </div>
        
       

   
    </>
  )
}
