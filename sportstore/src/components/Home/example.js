import React from 'react'
import Contact from "./Contact"
import Gallery from "./Gallery"
import About from "./About"
// import Product from "../products/Product"
const Home = () => {
  return (
    <>
  <section className="home  ">
    <div className="container-fluid ">
        <div class="row">
            <div class="col-md-6 mt-5 py-3">
                <h1 class="text-dark ms-5 fw-bold">We offer you the <span class="text-info">Best Product</span></h1>
                <br/>
                <p class="text-dark ms-5 fs-5 fst-italic">Looking to buy and sell the product then enroll now.</p>
                <br/>
                <a href="/" class="btn btn-primary ms-5 fw-bold fs-5">Buy Now</a>
            </div>
            <div class="col-md-4   text-center ">
                <img src="https://miro.medium.com/max/1600/0*C-cPP9D2MIyeexAT.gif" alt="" style={{width:'40rem',height:'25rem'}} class="py-2 img-fluid" />
            </div>
        </div>
    </div>
  {/* <!-- {{!-- Main section ends --}} --> */}
  {/* <Product/> */}
    {/* {{!-- banner section  --}} --> */}
<div class="container   rgbs shadow-lg p-3 mb-5 bg-info rounded">
     <div class="row">
        <div class="col-md-6">
            <p class="fs-5 ">Need Help?</p>
            <h1>Talk to us Directly to clear your confusion.</h1>
            <p class="fs-5">We will contact you.</p>
        </div>
        <div class="col-md-6 mt-5 py-5 text-center">
        <a href="#contact-form" class="btn  btn-warning ms-2 fw-bold fs-5 text-center" type="submit">Contact now</a>
        </div>
     </div>
</div>
{/* {{!-- Banner section --}} --> */}
</section>
<div class="container shadow-lg p-3 mb-5 rounded bg-info py-3">
        <div class="row py-2">
            <div class="col-md-5 py-2">
                <img src="./images/bn.png" style={{width:'25rem',height:'20rem'}}alt="" class="img-fluid ms-5 ps-5"  />
            </div>
            <div class="col-md-6">
            <h1 class="text-center text-danger">Want to become a Seller?</h1>
                <h2 class="fst-italic py-2">Enroll now and Sell your Products </h2>
                <p class="fs-4">Enroll now and Sell your products here without paying extra cost or commission.</p>
                <a href="/" class="btn  btn-warning ms-2 fw-bold fs-5 text-center" type="submit">Enroll now</a>
            </div>
        </div>
    </div>
 {/* <!-- {{!-- Banner section ends --}} */}
 <About/>
<Gallery/>
<Contact/>
    </>
    
  )
  
}

export default Home