import React, { useState } from 'react'
import LoginPage from './components/loginPage'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import UserPage from './components/userPage';
import AdminPage from './components/adminPage';

export default function App(){

  const [login,setLogin] = useState(false);
  const [userPage, setUserPage] = useState(false);
  const [adminPage, setAdminPage] = useState(false);


  function handleSignin(isAdmin){
    isAdmin && setAdminPage(true)
    !isAdmin && setUserPage(true)
    setLogin(prev => !prev);
  }

  return (
    <div>
      {!login && <LoginPage handleSignin={(isAdmin) => handleSignin(isAdmin)}/>}
      {userPage && <UserPage/>}
      {adminPage && <AdminPage/>}

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </div>

  )
}
