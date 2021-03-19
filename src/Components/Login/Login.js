import React, { useContext } from 'react';
import './Login.css';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const GhProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(GhProvider)
            .then((result) => {
                const {displayName, email, photoURL} = result.user;
                const signInUser = {
                    name: displayName,
                    email: email,
                    photo:photoURL
                }
                setLoggedInUser(signInUser);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                console.log(errorMessage, errorCode, email);
            });
    }
    return (
        <div className="login">
            <button onClick={handleGoogleSignIn}> Google SignIn </button>
            <p>Name: {loggedInUser.name}</p>

        </div>
    );
};

export default Login;