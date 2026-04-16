import React, {  } from 'react';

import Footer from '../components/Footer';
import { Outlet } from 'react-router';
import Navigationbar from '../components/Navigationbar';
import { Home } from 'lucide-react';






const homelayout = () => {



  return (
    <div>
      <section className='sticky top-0 z-50'>
        
        <Navigationbar></Navigationbar>
        
        

      </section>
       <main className=''>
        <Outlet></Outlet>

      </main>
      <footer>
        <Footer></Footer>
         
      </footer>
      
    </div>
  );
};

export default homelayout;