import React from 'react';
import Navigationbar from '../components/Navigationbar';

import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const AuthLayout = () => {
  return (
    <div className='min-h-screen'>
     
      <main>
        <Outlet></Outlet>
      </main>
      <div>
        <Footer></Footer>
      </div>
      
    </div>
  );
};

export default AuthLayout;