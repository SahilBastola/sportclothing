import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Signup";
import Products from "./components/Product/Product";
import Gallery from "./components/Home/Gallery";
import About from "./components/Home/About";
import Contact from "./components/Home/Contact";
import ProfilePage from "./components/Home/Profilepage"
import EditProfilePage from "./components/Home/Editprofile"

import Cart from "./components/Product/Cart";
import OrderPage from "./components/Product/order";
import AdminPage from "./components/adminpage/AdminPage"
import AdminUserPage from "./components/adminpage/Adminusers"
import AdminproductPage from "./components/adminpage/AdminProductpage"
import AdminOrderPage from "./components/adminpage/Adminorderpage"
import ProductDetailPage from './components/Product//ProductDetail';
import EditProductPage from "./components/adminpage/EditProductPage"
import AdminContactPage from "./components/adminpage/AdmincontactPage"
import "./style/Main.css"
import Protected from "./components/Route/protected"
import AdminProtected from "./components/Route/adminprotected"
import CreateProductForm from "./components/adminpage/Addproduct"
 
function App() {
  
  return (
    <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/Products" element={<Products/>}/>
      
      <Route path="/productDetail/:id" element={<Protected Component={ProductDetailPage}/>}/>
      <Route path="/Gallery" element={<Gallery/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/ProfilePage" element={<Protected Component={ProfilePage}/>}/>
      <Route path="/EditProfilePage" element={<Protected Component={EditProfilePage}/>}/>
      <Route path="/OrderPage" element={<Protected Component={OrderPage}/>}/>
      <Route path="/CartPage" element={<Cart/>}/>


      {/* admin panel */}
      <Route path="/AdminPage" element={<AdminProtected Component={AdminPage}/>}/>
      <Route path="/CreateProductForm" element={<AdminProtected Component={CreateProductForm}/>}/>
      <Route path="/AdminorderPage" element={<AdminProtected Component={AdminOrderPage}/>}/>
      <Route path="/AdminuserPage" element={<AdminProtected Component={AdminUserPage}/>}/>
      <Route path="/AdminproductPage" element={<AdminProtected Component={AdminproductPage}/>}/>
      <Route path="/AdminContactPage" element={<AdminProtected Component={AdminContactPage}/>}/>
      <Route path="/EditProductPage/:id" element={<AdminProtected Component={EditProductPage}/>}/>

   
      

    </Routes>
   </Router>
  );
}

export default App;