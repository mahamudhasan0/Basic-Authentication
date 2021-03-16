import { useState } from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); 
}

function App() {
  const[user,setUser]=useState({})
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const ghProvider = new firebase.auth.GithubAuthProvider();

  const googleSignInHandle= () => {
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    setUser(user);
  
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    
  });
  }


  const fbSignInHandle = () => {
    firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    var credential = result.credential;
    var user = result.user;
    var accessToken = credential.accessToken;
    setUser(user);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
  }


  const githubSignInHandle = () => {
    firebase
  .auth()
  .signInWithPopup(ghProvider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    setUser(user);
    console.log(user);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
  }
  return (
    <div className="App">

      <button onClick={googleSignInHandle}>Google Sign In</button>
      <br/>
      <button onClick={fbSignInHandle}>FB Sign In</button>
      <br/>
      <button onClick={githubSignInHandle}>Git Hub Sign In</button>

      <h2>Name:{user.displayName}</h2>
      <h3>Email:{user.email}</h3>
      <img src={user.photoURL} alt=""/>     
    </div>
  );
}

export default App;
