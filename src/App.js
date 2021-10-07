import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import initializeAuthentication from './Firebase/firebase.init';
initializeAuthentication();
const googlProvider = new GoogleAuthProvider();

function App() {
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googlProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);

      })
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
