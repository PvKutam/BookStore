import { useContext, createContext,useState, useEffect } from "react";
import { initializeApp, } from "firebase/app";
import{ getFirestore, collection,addDoc,getDocs,getDoc,doc, Firestore} from "firebase/firestore"
import {getStorage,ref ,uploadBytes,getDownloadURL} from "firebase/storage"

import {getAuth, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged} from "firebase/auth"


const FirebaseContext = createContext(null)
const firebaseConfig = {
    apiKey: "AIzaSyAGZGOHOrvI9PhNK9uBrNKoOWStb1Bpweo",
    authDomain: "bookstore-eafd0.firebaseapp.com",
    projectId: "bookstore-eafd0",
    storageBucket: "bookstore-eafd0.appspot.com",
    messagingSenderId: "506668560406",
    appId: "1:506668560406:web:8de753d380b9122c804537"
  };

export const useFirebase = ()=>useContext(FirebaseContext)
  
  
const FirebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(FirebaseApp)
const firebaseStorage = getFirestore(FirebaseApp)
const storage = getStorage(FirebaseApp)

const googleProvider = new GoogleAuthProvider()

export const FirebaseProvider =(props) =>{
    const [user,setUser ] = useState(null)
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth, user =>{
            if (user){
                setUser(user)
            }
            else{
                setUser(null)
            }
        })
    },[])
    const SignupUserWithEmailandPassword =(email,password)=>{
        return(
            createUserWithEmailAndPassword(firebaseAuth, email, password)
        )
    }
    const SigninUserWithEmailandPassword=(email,password)=>{
        return(signInWithEmailAndPassword(firebaseAuth,email, password)
        )   
    }
    const SignInWithGoogle=()=>{signInWithPopup(firebaseAuth,googleProvider) } 

    const HandlecreatenewListing = async (name, isbn, price, coverPic) => {
        if (!coverPic) {
            console.error("Cover pic is not provided");
            return; // Return early if coverPic is not provided
        }
    
        const imgRef = ref(storage, `/uploads/images/${Date.now()}-${coverPic.name}`);
        const uploadResult = await uploadBytes(imgRef, coverPic);
    
        return await addDoc(collection(firebaseStorage, "Books"), {
            name,
            isbn,
            price,
            imgURL: uploadResult.ref.fullPath,
            UserID: user ? user.uid : null,
            UserEmail: user ? user.email : null,
            displayName: user ? user.displayName : null,
            photoURL: user ? user.photoURL : null,
        });
    };
    const HandlegetallBooks = ()=>{
        return getDocs(collection(firebaseStorage,"Books"))
    }
    const getImageURL =(path)=>{
       
        return getDownloadURL(ref(storage,path))
    }
    const placeOrder = async (bookId, qty) => {
        const collectionRef = collection(firebaseStorage, "Books", bookId, "orders");
        const result = await addDoc(collectionRef, {
          userID: user.uid,
          userEmail: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          qty: Number(qty),
        });
        return result;
      };
    
    const getBookByID =async (id)=>{
        const docref = doc(firebaseStorage,"Books", id);
       const result = await getDoc(docref)
       return result
    }
    const isLoggedin = user ? true : false
    return(
        <FirebaseContext.Provider value={{ getImageURL,HandlegetallBooks,isLoggedin,SignInWithGoogle,SignupUserWithEmailandPassword, 
        SigninUserWithEmailandPassword,HandlecreatenewListing,getBookByID,placeOrder}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}