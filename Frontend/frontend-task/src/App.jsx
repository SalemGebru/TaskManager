import { BrowserRouter as Routes,Route,Router } from 'react-router';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {setUsername,setEmail,setPassword,setConfPassword,setValidUsername,setValidEmail,setValidPassword,setValidConfPassword,setUsernameFocus,
  setEmailFocus,setPasswordFocus,setConfPasswordFocus,signUp} from './features/userSlice';

import './App.css';
import './components/signup';
import Register from './components/signup';


function App() {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {username,email,password,confPassword,validUsername,validEmail,validPassword,validConfPassword,usernameFocus,emailFocus,passwordFocus,confPasswordFocus,
   loading,registered}=useSelector((state)=>state.user);
  

  const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  useEffect(() => {
    dispatch(setValidUsername(USERNAME_REGEX.test(username)));
  }, [username,dispatch]);

  useEffect(() => {
    dispatch(setValidEmail(EMAIL_REGEX.test(email)));
  }, [email,dispatch]);

  useEffect(() => {
    dispatch(setValidPassword(PASSWORD_REGEX.test(password)));
  }, [password,dispatch]);

  useEffect(() => {
    dispatch(setValidConfPassword(password===confPassword));
  }, [password, confPassword,dispatch]);

useEffect(()=>{
  if(registered){
    navigate('/tasks');
  }
},[registered,navigate]);
  
const handleUsernameFocus=()=>dispatch(setUsernameFocus(true));
const handleUsernameBlur=()=>dispatch(setUsernameFocus(false));

const handleEmailFocus=()=>dispatch(setEmailFocus(true));
const handleEmailBlur=()=>dispatch(setEmailFocus(false));

const handlePasswordFocus=()=>dispatch(setPasswordFocus(true));
const handlePasswordBlur=()=>dispatch(setPasswordFocus(false));

const handleConfPasswordFocus=()=>dispatch(setConfPasswordFocus(true));
const handleConfPasswordBlur=()=>dispatch(setConfPasswordFocus(false));



  const handleSignUp = async (e) => {
    e.preventDefault(); 

   
    if (!validUsername || !validEmail || !validPassword || !validConfPassword) {
        alert('Please fill out the required fields correctly');
        return; 
    }

    dispatch(signUp({username,email,password}));
};

  return (
    <>
    
        <Register setUsername={(value) => dispatch(setUsername(value))}
        validUsername={validUsername}
        setEmail={(value) => dispatch(setEmail(value))}
        validEmail={validEmail}
         setPassword={(value) => dispatch(setPassword(value))}
        validPassword={validPassword}
         setConfPassword={(value) => dispatch(setConfPassword(value))}
        validConfPassword={validConfPassword}
        usernameFocus={usernameFocus} handleUsernameFocus={handleUsernameFocus} handleUsernameBlur={handleUsernameBlur}
        emailFocus={emailFocus} handleEmailFocus={handleEmailFocus} handleEmailBlur={handleEmailBlur}
        passwordFocus={passwordFocus} handlePasswordFocus={handlePasswordFocus} handlePasswordBlur={handlePasswordBlur}
        confPasswordFocus={confPasswordFocus}handleConfPasswordFocus={handleConfPasswordFocus} handleConfPasswordBlur={handleConfPasswordBlur}
        handleSignUp={handleSignUp}
        />
        
   
      

    </>
  );
}

export default App;
