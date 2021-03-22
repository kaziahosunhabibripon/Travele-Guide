import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift,  faGlobe, faMap } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import {
    handleFbSignIn, handleGithubSignIn, handleGoogleSignIn, handleSignOut,
    initializeLoginFramework, createUserWithEmailAndPassword, signInWithEmailAndPassword
} from './LoginManager';
import './Login.css';

initializeLoginFramework();

function Login() {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({

        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }


    const FbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true);

            })
    }
    const GithubSignIn = () => {
        handleGithubSignIn()
            .then(res => {
                handleResponse(res, true);

            })
    }
    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }
    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        event.preventDefault();
    }

    const handleBlur = (event) => {

        let isFieldValid = true;

        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passWordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = (isPasswordValid && passWordHasNumber);
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }
   
    return (
        <div className='col-md-4 text-center'>
            
            <form className="login-form">
                <h1 className="form-heading"> User Form </h1>
            
                {
                    newUser &&
                    <input type="text" onBlur={handleBlur} name="name" required placeholder="your name" />

                }
                <input type="text" onBlur={handleBlur} name="email" placeholder="Enter your email address" required />

                <input type="password" onBlur={handleBlur} id='' name="password" placeholder="password should be 2 alphabet and 6 number" required />
                <input type="submit" value={newUser ? 'Create an account' : 'LogIn'} onClick={handleSubmit} className="btn-submit" />
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id='' /> &nbsp;
                <h2 htmlFor="newUser" > Or </h2>
                {
                    user.success && <p style={{ color: 'green' }}> User {newUser ? 'Created' : 'Logged In'} Successfully {user.error}</p>
                }
                {
                    user.isSignedIn ? <button onClick={signOut} className="btn-submit"> Sign out </button> :
                        <button onClick={googleSignIn} className="btn-submit"><FontAwesomeIcon icon={faGlobe} /> &nbsp; Sign in With Google </button>
                }
          
                <button onClick={FbSignIn} className="btn-submit"><FontAwesomeIcon icon={faMap} /> &nbsp; Continue with Facebook </button>
            
                <button onClick={GithubSignIn} className="btn-submit"><FontAwesomeIcon icon={faGift} /> &nbsp;Continue with Github </button>
                </form>   
                <p style={{ color: 'red' }}>{user.error}</p> 
        </div>
    );
}

export default Login;