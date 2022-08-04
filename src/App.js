import './App.css';
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { auth, db } from './services/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState([]);

  const [users, setUsers] = useState([]);

  function handleGoogleSignin(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result)=> {
      setUser(result.user);
      console.log(result);

      const data = {
        nome:  result.user.displayName,
        email: result.user.email,
        foto: result.user.photoURL,
      };    

      console.log(data);
      const dbRef = collection(db, "usuario");
    
      addDoc(dbRef, data)
      .then(docRef => {
         console.log("Document has been added successfully", docRef);
      })     
      .catch(error => {
        console.log(error);
      })
    })    
    .catch((error)=> {
      console.log(error);
    }
    )
  }

  useEffect(() => {
    const dbRef = collection(db, "usuario");
    getDocs(dbRef)
    .then(docs => {
      setUsers(docs.docs.map(doc => ({ ...doc.data() })));
    })

  }, []);

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
      <div>
      <h2>Últimos Visitantes</h2>
      <ul>
          {users.map((u,i) => (<li key={i}>{u.nome}-{u.email}</li>
          ))}
      </ul>
      </div>
    </div>
  );
}

export default App;
