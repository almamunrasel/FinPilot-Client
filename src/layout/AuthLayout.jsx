import React from 'react';
import Navigationbar from '../components/Navigationbar';

import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className='min-h-screen'>
     
      <main>
        <Outlet></Outlet>
      </main>
      
    </div>
  );
};

export default AuthLayout;