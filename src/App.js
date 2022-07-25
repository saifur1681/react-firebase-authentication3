
import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile, signOut } from "firebase/auth";
import firebaseconfigarationInitilization from './Firebase/Firebase.init';
import { useState } from 'react';


firebaseconfigarationInitilization();


const provider = new GoogleAuthProvider();
const auth = getAuth();

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState('')
  const [error, setError] = useState('')

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user)
      })
      .catch((error) => {
        console.log(error.message)
      })
  };


  <div>----------------------------------------------</div>


  const toggleLogin = e => {
    setIsLogin(e.target.checked)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handleRegistration = e => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return;
    }

    isLogin ? loginUser(email, password) : newUserRegistration(email, password)


    console.log(email, password)
  }

  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user)
      })
      .catch(error => {
        setError(error.message)
      })
  }

  const emailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {

      })
  }



  const handleLogout = () => {
    signOut(auth)
      .then(() => {

      })
  }

  const getUserName = e => {
    setName(e.target.value)
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {

      })
  }

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {

      })
  }

  const newUserRegistration = (email, password) => {

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user)
        setError('')
        emailVerification();
        setUserName();
      })
      .catch(error => {
        setError(error.message)
      })
  }



  return (
    <div className="m-5">

      <form onSubmit={handleRegistration} >
        <h3 className="text-regular" >Please{isLogin ? ' Login' : ' Registered'}</h3>
        {!isLogin && <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input onBlur={getUserName} type="name" class="form-control" id="inputEmail3" required />
          </div>
        </div>}
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input onBlur={handleEmailChange} type="email" class="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <input onBlur={handlePasswordChange} type="password" class="form-control" id="inputPassword3" required />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-sm-10 offset-sm-2">
            <div class="form-check">
              <input onChange={toggleLogin} class="form-check-input" type="checkbox" id="gridCheck1" />
              <label class="form-check-label" for="gridCheck1">
                Already Registered ?
              </label>
            </div>
          </div>
        </div>
        <div className="text-danger" ><h4>{error}</h4></div>
        <button type="submit" class="btn btn-primary">{isLogin ? 'Sign in' : 'Register'}</button>
        <button onClick={handleLogout} type="submit" class="btn btn-secondary m-1">Log out</button>
        <button onClick={handleResetPassword} type="submit" class="btn btn-warning m-1">Reset Password</button>
      </form>

      <br /><br /><br /><br /><br />
      <div>-------------------------------------</div>
      <button onClick={handleGoogleSignIn} >Google Sign In</button>
    </div>
  );
}

export default App;
