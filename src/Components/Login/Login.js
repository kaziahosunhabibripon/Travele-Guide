import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const[user, setUser] = useState('');
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);
    const clearInputs = () =>{
        setEmail('');
        setPassword('');
    }
    const clearErrors = () =>{
        setEmailError('');
        setPassword('');
    }
    const handleLogin = () => {
        clearErrors();
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err =>{
            
            switch(err.code){
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    break;    
                case "auth/wrong-password":
                    setPasswordError(err.message);
                    break;
            }
        })
    }
    const handleSignup = () => {
        clearErrors();
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err =>{      
            switch(err.code){
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    break;    
                case "auth/weak-password":
                    setPasswordError(err.message);
                    break;
            }
        })
    }
    const handleLogout = ()=>{
        firebase.auth().signOut();
    }
    const authListener = ()=>{
        firebase.auth().onAuthStateChanged(user=>{
            if (user){
                clearInputs();
                setUser(user);
            }else{
                setUser("");
            }
        })
    }
    useEffect(()=>{
        authListener();
    }, [])
    // const [user, setUser] = useState({
    //     isSignIn: false,
    //     name: '',
    //     email: '',
    //     photo: '',
    //     password: '',
    //     error: '',
    //     success: false
    // });

    // const handleSubmit = (e) => {
    //     if (user.email && user.password && user.name) {
    //         firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    //             .then(res => {
    //                 const newUserInfo = { ...user };
    //                 newUserInfo.error = '';
    //                 newUserInfo.success = true;
    //                 setUser(newUserInfo);
    //             })
    //             .catch(error => {
    //                 const newUserInfo = { ...user };
    //                 newUserInfo.error = error.message;
    //                 newUserInfo.success = false;
    //                 setUser(newUserInfo);
    //             });
    //     }
    //     e.preventDefault();
    // }
    // const handleBlur = (e) => {
    //     let isFieldValid = true;

    //     if (e.target.name === 'email') {
    //         isFieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);

    //     }
    //     if (e.target.name === 'password') {
    //         const isPasswordValid = (e.target.value.length) > 7;
    //         const numberUpperLowerCase = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(e.target.value);
    //         isFieldValid = (isPasswordValid && numberUpperLowerCase);
    //     }
    //     if (isFieldValid) {
    //         const newUserInfo = { ...user };
    //         newUserInfo[e.target.name] = e.target.value;
    //         setUser(newUserInfo);
    //     }


    // }
    return (
        <div className="row">
            <div className="col-md-4 login p-5 m-5">
                {/* <form onSubmit={handleSubmit} className="signup-form my-5 p-3">
                   <p>Email: {user.email}</p>
                    <h1 className="form-heading">Login</h1>
                    <input
                        type="text"
                        placeholder="Email"
                        onBlur={handleBlur}
                        name="email"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onBlur={handleBlur}
                        required
                    />
                    <button value="Submit" className="btn-submit" onClick={handleSubmit}>Login </button>
                    
                    <label htmlFor="login"> Don't have an account? <Link to="/createAccount"> Create an account</Link></label>
                    
                </form>
                
                    
                    
                    <p className="error"> {user.error}</p>
                    {
                        user.success && <p className="success"> User Login  Successfully</p>
                    }
                
                <h3> <span>Or </span> </h3> */}
            </div>
        </div>
    );
};

export default Login;