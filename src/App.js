import './App.css';
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { auth } from '../src/services/firebase';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState([]);
  function handleGoogleSignin(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result)=> {
      setUser(result.user);
      console.log(result.user);
    })
    .catch((error)=> {
      console.log(error);
    }
    )
  }

  return (
    <div className="App">
      <h1>Utilizar autenticação social google.</h1>
      <button onClick={handleGoogleSignin}>
        Entrar com o google
      </button>
      <div>
        <h3>{user.displayName}</h3>
        <h4>{user.email}</h4>
        {user.photoURL && (<img src={user.photoURL} alt="Foto do usuário" />)}
      </div>
    </div>
  );
}

export default App;
