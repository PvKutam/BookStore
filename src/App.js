import './App.css';
import {Route,Routes} from "react-router-dom"
import { Registerpage } from './Pages/Register';
import { LoginPage } from './Pages/Login';
import { ListingPage } from "./Pages/Listing"
import {Home} from "./Pages/Home"
import BookDetails from './Pages/BookDetails';


function App() {
  return (
    <>
    <Routes>  
      <Route path='/' element={<Home />} />
      <Route path= '/Login' element ={<LoginPage />} />
      <Route path= '/Register' element ={<Registerpage />} />
      <Route path= '/Book/List' element ={<ListingPage />} />
      <Route path='/Book/View/:Bookid' element={<BookDetails />} />
    </Routes>
    
    </>
  );
}

export default App;
