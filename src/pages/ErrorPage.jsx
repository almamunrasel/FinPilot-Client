import React from 'react';

import { useNavigate } from 'react-router';
import errorPage from '../assets/error-404.png';
import Navigationbar from '../components/Navigationbar';
import Footer from '../components/Footer';


const ErrorPage = () => {

  const navigate=useNavigate();
  return (
    <div className='max-w-full mx-auto'>
      <Navigationbar></Navigationbar>
       <div className='flex flex-col justify-center pt-30 pb-10'>
        <div className='flex justify-center items-center'>
          <img className='w-[400px] h-[400px]' src={errorPage} alt="" />
        </div>
        
        <div className=' justify-items-center'>
        <p className='text-4xl font-bold'>Oops,page not found</p>
        <p>The page you are looking for is not available</p>
        <div className="flex justify-center items-center mt-10 pb-10">
  <button onClick={() => navigate("/")} className="btn weight-hover bg-[linear-gradient(125.07deg,_rgba(99,46,227,1)_0%,_rgba(159,98,242,1)_100%)] text-white">
    Go Back!
  </button>

      </div>
      </div>

      <Footer></Footer>


      </div>
      
    </div>
  );
};

export default ErrorPage;