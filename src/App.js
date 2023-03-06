import {useRef, useState} from "react";
import ModalComponent from "./components/shared/ModalComponent";
import {createPortal} from "react-dom";
import FormUser from "./components/FormUser";
import {API_KEY} from "./firebaseConfig";
import NavBar from "./components/shared/NavBar";
import {addUserAction} from "./components/user/userSlice";



const App = async () => {


    const BASE_DB_URL = "https://efc-imc-default-rtdb.europe-west1.firebasedatabase.app/"

    const [modalVisible, setModalVisible] = useState(false)

    const [isLogging, setIsLogging] = useState(false)

    const [isLogged, setIsLogged] = useState(false)

    const [users, setUsers] = useState([])


    const emailRef = useRef()
    const passwordRef = useRef()


    const submitFormHandler = async (event) => {
        event.preventDefault()

        let BASE_URL = ""


        if (isLogging) {
            BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

        } else {
            BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
        }

        try {

            const response = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    returnSecureToken: true
                })
            })

            // Si la réponse n'a pas comme code de retour un OK (200), alors on va envoyer une erreur
            if (!response.ok) {
                throw new Error("Il y a eu une erreur !")
            }

            // Si la réponse est concluante, il va nous falloir extraire les données de la réponse (le body). Pour ce faire, on utilise la méthode asynchrone .json()
            const data = await response.json()

            // Dans la réponse se trouve un token qui nous servira par la suite pour faire notre requêtes de gestion de la base de données Firestore. Pour le moment, l'endroit le plus utile où le stocker est le stockage local de notre navigateur
            localStorage.setItem('token', data.idToken)

            emailRef.current.value = ""
            passwordRef.current.value = ""

            setIsLogged(true)
            setModalVisible(false)
        } catch (error) {
            console.error(error.message);
        }
    }
    const logOutHandler = () => {
        localStorage.removeItem('token')
        setIsLogged(false)
    }



    return (
      <>
        {modalVisible && createPortal(<ModalComponent closeModal={() => setModalVisible(false)}>
            <div className="d-flex justify-content-between align-items center">
                <h3>{isLogging ? 'Sign In' : 'Sign Up'}</h3>
                <button onClick={() => setModalVisible(false)} className="btn btn-outline-dark rounded-circle"><i
                    className="bi bi-x"></i></button>
            </div>
            <hr/>
            <form onSubmit={submitFormHandler}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email : </label>
                    <input type="text" required ref={emailRef} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password : </label>
                    <input type="password" required ref={passwordRef} className="form-control"/>
                </div>
                <div className="text-end">
                    <button type="button" className="btn btn-outline-info me-2"
                            onClick={() => setIsLogging(!isLogging)}>Switch
                        to {isLogging ? 'Sign Up' : 'Sign In'}</button>
                    <button className="btn btn-primary">{isLogging ? 'Sign In' : 'Sign Up'}</button>
                </div>
            </form>
        </ModalComponent>, document.getElementById("modal-root"))}
        <div className="container">
            <div className="row g-2 py-3">

                <div className="col-10 offset-1">
                    <div className="bg-dark text-light rounded p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h1>Application IMC</h1>
                            <button className="btn btn-primary"
                                    onClick={() => isLogged ? logOutHandler() : setModalVisible(true)}>{isLogged ? 'Log Out' : 'Show Modal'}</button>
                        </div>
                        <hr/>

                        {isLogged && <FormUser/>}
                    </div>
                </div>
            </div>
        </div>
    </>
);
}

export default App;








