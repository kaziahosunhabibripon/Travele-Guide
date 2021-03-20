import React, { useContext, useState } from 'react';
import './Login.css';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

import { Link } from 'react-router-dom';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState({
        isSignInUser:false,
        name:'',
        email:'',
        photo:'',
        password:''
    })
    const { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const GhProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(GhProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const signInUser = {
                    isSignInUser: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setLoggedInUser(signInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                console.log(errorMessage, errorCode, email);
            });
    }
   const handleSubmit = () => {

   }
   const handleBlur = (event)=>{
       let isFormValid = true;
       if(event.target.name=== 'email'){
        isFormValid =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value);
        

       }
       if(event.target.name=== 'password'){
           const isPasswordValid = (event.target.value.length) > 8;
           const numberUpperLowerCase =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(event.target.value);
           isFormValid = (isPasswordValid && numberUpperLowerCase);
    }
    if(isFormValid){
        const newUserInfo = {...user};
        newUserInfo[event.target.name] = event.target.value;
        setUser(newUserInfo);

    }
       console.log(event.target.name, event.target.value);

   }
    return (
        <div className="row">
            <div className="col-md-4 login p-5 m-5">
                <form onSubmit={handleSubmit} className="signup-form">
                    <h4 className="text-left p-1" style={{marginLeft:"50px"}}>Login</h4>
                    <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your Email Address" required/>
                    <input type="password"  name="password" onBlur={handleBlur} placeholder="Input your password" required/>
                    <button onClick={handleSubmit} className="btn btn-danger btn-custom">Login </button>
                    <label htmlFor="login"> Don't have an account? <Link to="/createAccount"> Create an account</Link></label>
                </form>
                <h3> <span>Or </span> </h3>
                    <button onClick={handleGoogleSignIn} className="btn btn-socialMedia btn-danger"> Continue with Google </button>
                    <br />
                    <button onClick={handleGoogleSignIn} className="btn btn-socialMedia btn-danger">  Continue with Facebook </button>
            </div>
        </div>
    );
};

export default Login;