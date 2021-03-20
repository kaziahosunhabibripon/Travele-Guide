import React, {  useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from './firebase.config';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
 const CreateAccount = () => {
     
     
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        error:'',
        success: false
    });
    const handleSubmit = (e) => {
        if (user.email && user.password && user.name) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {   
                    const newUserInfo = { ...user};
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                })
                .catch(error => {
                   const newUserInfo = {...user};
                   newUserInfo.error = error.message;
                   newUserInfo.success = false;
                    setUser(newUserInfo);                    
                });
        }
        e.preventDefault();
    }
    const handleBlur = (e) => {
        let isFieldValid = true;

        if (e.target.name === 'email') {
            isFieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = (e.target.value.length) > 7;
            const numberUpperLowerCase = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(e.target.value);
            isFieldValid = (isPasswordValid && numberUpperLowerCase);
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }


    }
    return (
        <div className="row">
            <div className="col-md-4 login p-5 m-5">
            <form onSubmit={handleSubmit} className="signup-form">
                    <h1 className="form-heading">Create an account</h1>
                    <input
                        type="text"
                        placeholder="Name"
                        onBlur={handleBlur}
                        name="name"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username or Email"
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
                    <input
                        type="password"
                        placeholder="Confirm password"
                        name="Confirm_password"
                        onBlur={handleBlur}
                        required
                    />
                    <button  value="Submit" className="btn-submit">Create an account </button>
                    <label htmlFor="login"> Already have an account? <Link to="/login"> Login </Link></label>
                    <p className="error"> {user.error}</p>
                    {
                       user.success &&  <p className="success"> User Created  Successfully</p>
                    }
                </form>
                <h3> <span>Or </span> </h3>
                <button  className="btn-submit" > Continue with Google </button>
                <br/>
                <button  className="btn-submit"> <FontAwesomeIcon icon={faGlobeEurope} /> Continue with Facebook </button>
            </div>
        </div>
    );
};

export default CreateAccount;