import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

import initializeAuthentication from './Firebase/firebase.init';
import { useState } from 'react';
initializeAuthentication();
const googlProvider = new GoogleAuthProvider();

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIslogin] = useState('')


  const handleRegistration = e => {
    e.preventDefault()
    if (password.length < 6) {
      setError('Password Must be at least 6 Charecters Long')
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError('password Must contain 2 Upper case')
      return;
    }
    // console.log(email, password);
    isLogin ? processLogin(email, password) : registerNewUser(email, password)

  }
  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('')
      })
      .catch(error => {
        setError(error.message);
      })
  }
  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('');
        verifyEmail()
      })
      .catch(error => {
        setError(error.message);
      })
  }
  const toggleLogin = e => {
    setIslogin(e.target.checked);
  }

  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googlProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {
        console.log(result);
      })
  }
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(result => { })
  }
  return (
    <div className="mx-5">
      <form onSubmit={handleRegistration}>
        <h3 className='text-primary text-center'>Please {isLogin ? 'Login' : 'Register'}</h3>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Registered?
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3 text-danger">{error}</div>
        <button type="submit" className="btn btn-primary text-right">{isLogin ? 'Login' : 'Register'}</button>
        <button type="button" onClick={handleResetPassword} className="btn btn-secondary">Reset Password</button>

      </form>
      <div>---------------------------</div>
      <br /><br /><br />
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
