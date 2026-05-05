import React from 'react';
import Logo from './Logo';
import { FaFacebookF, FaInstagramSquare, FaLinkedin, FaYoutube, } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";

const Footer = () => {
    return (
      
          <footer className="bg-base-200 text-base-content p-10 ">
  <div className='footer sm:footer-horizontal pb-5'>
    <aside>
    <div className='flex items-center gap-2'>
       <img src='/loanlink_logo.png' className='h-8 w-8' alt="" />
       <p className='custom-font text-2xl text-primary'>LoanLink</p>
    </div>
    <p className='custom-font text-sm font text-gray-700'>
      <br />
      Providing reliable financial<br />  services since 2020
    </p>

    
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Microloan Request</a>
    <a className="link link-hover">Review</a>
    <a className="link link-hover">Approval</a>
    <a className="link link-hover">Investment</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>

  <nav>
    <h2 className='font-semibold text-gray-500 text-center text-2xl'>SOCIALS</h2>
    <div className='mt-5 flex justify-around items-center gap-2'>
      <FaFacebookF className='h-5 w-5' />
      <FaXTwitter className='h-5 w-5' />
      <FaInstagramSquare className='h-6 w-6' />
      <FaYoutube className='h-6 w-6' />
      <IoMailSharp className='h-6 w-6' />
      <FaLinkedin className='h-5 w-5' />
    </div>
  </nav>
  </div>
  <div className='footer sm:footer-horizontal flex justify-center border-t border-gray-400 pt-5 '>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </div>
</footer>

  

       

    );
};

export default Footer;