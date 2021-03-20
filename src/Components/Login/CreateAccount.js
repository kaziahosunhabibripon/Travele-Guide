import React, {  useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom';


 const CreateAccount = () => {
    
    const history = useHistory();
  
    const [user, setUser] = useState({
        isSignInUser:false,
        name:'',
        email:'',
        photo:'',
        password:'',
        confirmPassword:''
    })
    const handleSubmit =(event)=>{
        console.log(user);
        if(user.email && user.password && user.name && user.confirmPassword){
            console.log('submitting');
        }
 
        event.preventDefault();
    }
    const handleBlur = (event)=>{
        let isFieldValid = true;
        if(event.target.name=== 'email'){
         isFieldValid =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value);     
        }
        if(event.target.name=== 'password') {
            const isPasswordValid = (event.target.value.length) > 8;
            const numberUpperLowerCase =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(event.target.value);
            isFieldValid = (isPasswordValid && numberUpperLowerCase);
     }
     if(isFieldValid){
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
                    <h4 className="text-left p-1" style={{marginLeft:"50px"}}>Create an account</h4>
                    <input type="text" name="name" onBlur={handleBlur} placeholder="Name" required/>
                    <input type="text" name="email" onBlur={handleBlur} placeholder="Email" required/>
                    <input type="password"  name="password" onBlur={handleBlur} placeholder="password" required/>
                    <input type="password"  name="confirmPassword" onBlur={handleBlur} placeholder="Confirm password" required/>
                    <button onClick={handleSubmit}  className="btn btn-danger btn-custom">Create an account </button>
                    <label htmlFor="login"> Already have an account? <Link to="/login"> Login </Link></label>
                </form>
                <h3> <span>Or </span> </h3>
                <button  className="btn btn-socialMedia btn-danger" > Continue with Google </button>
                <br/>
                <button  className="btn btn-socialMedia btn-danger"> <FontAwesomeIcon icon={faGlobeEurope} /> Continue with Facebook </button>
            </div>
        </div>
    );
};

export default CreateAccount;