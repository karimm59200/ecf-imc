import { useEffect, useRef, useState } from "react";
import ModalComponent from "./components/shared/ModalComponent";
import { createPortal } from "react-dom";
import FormUser from "./components/FormUser";
import { BASE_DB_URL, SIGN_IN_URL, SIGN_UP_URL, API_KEY } from "./firebaseConfig";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";





const App = () => {

const dispatch = useDispatch()



  console.log(useSelector(state => state.user))

  const BASE_DB_URL = "https://efc-imc-default-rtdb.europe-west1.firebasedatabase.app/"

  const [modalVisible, setModalVisible] = useState(false)

  const [isLogging, setIsLogging] = useState(false)

  const [isLogged, setIsLogged] = useState(false)

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
        body : JSON.stringify({

          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true
        })
      })

      // Si la réponse n'a pas comme code de retour un OK (200), alors on va envoyer une erreur
      if(!response.ok) {
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




   // const addTodoHandler = async (todoItem) => {
  //   console.log(todoItem)
  //   try {
  //     const token = localStorage.getItem('token')
  //     if (token) {
  //       const response = await fetch(`${BASE_DB_URL}todoItems.json?auth=${token}`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body : JSON.stringify(todoItem)
  //       })
  //
  //       if (!response.ok) {
  //         throw new Error("Il y a eu un problème !")
  //       }
  //
  //       const data = await response.json()
  //       setTodos([...todos, {id: data.name, ...todoItem}])
  //       refreshTodos()
  //
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }

  /*
    Pour avoir l'accès à nos todoItems, il faut faire une requête de type GET dans le but de récupérer les différents todos.

    Cette requête n'a pas besoin d'authentification suite au paramétrage de notre projet Firebase. On peut donc envoyer une requête simplifiée sans paramètre de requête 'auth'

    Cependant, le fonctionnement de Firebase se basant sur le principe d'un objet JSON géant, il va nous falloir déplier les clés de notre objet pour ensuite transformer ces clés en objets ajouté à un tableau vierge. Ce tableau servira ensuite à être stocké dans la constante de state 'todos'.
  */

  // const refreshTodos = async () => {
  //   try {
  //     const response = await fetch(`${BASE_DB_URL}todoItems.json`)
  //
  //     if (!response.ok) {
  //       throw new Error("Il y a eu une erreur lors de la requête GET !")
  //     }
  //
  //     const data = await response.json()
  //
  //     const tmpTodos = []
  //     for (const key in data) {
  //       tmpTodos.push({id: key, ...data[key]})
  //     }
  //     setTodos(tmpTodos)
  //
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }

  // useEffect(() => {
  //   refreshTodos()
  // }, [])

  /*
    Pour modifier nos todos, il va nous falloir cibler un endpoint spécifique : celui de notre todo à modifier. La modification passera par une requête de type PATCH (pour modification). Cet endpoint sera plus précis que l'endpoint que l'on ciblait précédemment, et ressemblera à ceci :
       https://addresse-de-database.com/todoItem/id-du-todoItem.json

    Ayant besoin d'authentification, il va falloir suffixer la requête de '?auth=<valeur du token Firebase de connexion>' tout comme pour l'ajout et la suppresion.

    Le corps de notre requête devra être l'objet modifié, qui finira par remplacer dans le JSON géant de notre base de données l'objet précédemment placé et requêté.
  */

  // const switchTodoStatusHandler = async (todoId) => {
  //   const todoItemFound = todos.find(todo => todo.id === todoId)
  //   if (todoItemFound) {
  //     const token = localStorage.getItem('token')
  //     if (token) {
  //       try {
  //         const newTodoValues = {
  //           ...todoItemFound,
  //           isDone: !todoItemFound.isDone
  //         }
  //         const response = await fetch(`${BASE_DB_URL}todoItems/${todoId}.json?auth=${token}`, {
  //           method: "PATCH",
  //           headers: {
  //             "Content-Type": "application/json"
  //           },
  //           body: JSON.stringify(newTodoValues)
  //         })
  //
  //         if (!response.ok) {
  //           throw new Error("Erreur durant la requête PATCH !")
  //         }
  //
  //         const data = await response.json()
  //
  //         console.log(data);
  //
  //         setTodos([...todos.filter(todo => todo !== todoItemFound), newTodoValues])
  //
  //       } catch (error) {
  //         console.error(error.message);
  //       }
  //     }
  //   }
  // }

  /*
    Dans le cadre d'une suppression, il suffit de taper le même endpoint que lors de la requête PATCH, mais avec cette fois-ci une requête DELETE (pour suppresion). Cette requête ne renvoyant rien de particulier, on peut se passer de notre constante 'data', qui aurait été nulle.
  */

  // const deleteTodoHandler = async (todoId) => {
  //   // eslint-disable-next-line no-restricted-globals
  //   if(confirm("Etes-vous sûr ?")) {
  //     const todoItemFound = todos.find(todo => todo.id === todoId)
  //     if (todoItemFound) {
  //       try {
  //         const token = localStorage.getItem('token')
  //         if (token) {
  //           const response = await fetch(`${BASE_DB_URL}todoItems/${todoId}.json?auth=${token}`, {
  //             method: "DELETE"
  //           })
  //
  //           if (!response.ok) {
  //             throw new Error("Erreur lors de la requête DELETE !")
  //           }
  //
  //           setTodos([...todos.filter(todo => todo !== todoItemFound)])
  //         }
  //       } catch (error) {
  //         console.error(error.message);
  //       }
  //
  //     }
  //   }
  // }

  /*
    On choisit de trier les todoItems via leur date d'échance (de façon croissante)
  */

  // const sortedTodos = () => {
  //   return todos.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  //
  //   // return todos.sort((a, b) => a.title - b.title)
  // }

  /*
    Le logOut est simplement le changement du booléen 'connecté' avec écrasement de notre token de connexion dans le stockage local.
  */

  const logOutHandler = () => {
    localStorage.removeItem('token')
    setIsLogged(false)
  }

  return (
      <>
        {modalVisible && createPortal(<ModalComponent closeModal={() => setModalVisible(false)}>
          <div className="d-flex justify-content-between align-items center">
            <h3>{isLogging ? 'Sign In' : 'Sign Up'}</h3>
            <button onClick={() =>setModalVisible(false)} className="btn btn-outline-dark rounded-circle"><i className="bi bi-x"></i></button>
          </div>
          <hr />
          <form onSubmit={submitFormHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email : </label>
              <input type="text" required ref={emailRef} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password : </label>
              <input type="password" required ref={passwordRef} className="form-control" />
            </div>
            <div className="text-end">
              <button type="button" className="btn btn-outline-info me-2" onClick={() => setIsLogging(!isLogging)}>Switch to {isLogging ? 'Sign Up' : 'Sign In'}</button>
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
                  <button className="btn btn-primary" onClick={() => isLogged ? logOutHandler() : setModalVisible(true)}>{isLogged ? 'Log Out' : 'Show Modal'}</button>
                </div>
                <hr />

                { isLogged && <FormUser/>}
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default App;








