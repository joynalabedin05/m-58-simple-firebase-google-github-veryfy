import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';

const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignin = () =>{
        signInWithPopup(auth, googleProvider)
        .then(result =>{
            const logginUser = result.user;
            console.log(logginUser);
            setUser(logginUser)
        })
        .catch(error=>{
            console.log('error' , error.message)
        })
    }

    const handleGithubSignin=()=>{
        signInWithPopup(auth, githubProvider)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser)
        })
        .catch(error=>{
            console.log(error);
        })
    }

    const handleSignout = ()=>{
        signOut(auth)
        .then(result=>{
            console.log(result)
            setUser(null)
        })
        .catch(error=>{
            console.log(error)
        })

    }

    return (
        <div>
            {
                user?
                <button onClick={handleSignout}>signout</button> :
                <div>
                    <button onClick={handleGoogleSignin}>google login</button>
                    <button onClick={handleGithubSignin}>Github Login</button>
                </div>

            }
           {
            user&& <div>
                <h4>logginUser: {user?.displayName}</h4>
                <p>Email: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>
            }
        </div>
    );
};

export default Login;