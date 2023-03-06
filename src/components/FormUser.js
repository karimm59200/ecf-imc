import React from 'react';
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {addUserAction} from "./user/userSlice";
import {BASE_DB_URL} from "../firebaseConfig";


const FormUser = () => {

    const nameRef = useRef();
    const sizeRef = useRef();
    const weightRef = useRef();


    const users = useSelector(state => state.user.users)
    const dispatch = useDispatch()


    const submitForm = (e) => {
        e.preventDefault()

        const id= users.length + 1;
        const name = nameRef.current.value;
        const size = sizeRef.current.value;
        const weight = weightRef.current.value;
        const user = {id, name, size, weight};

        nameRef.current.value = "";
        sizeRef.current.value = "";
        weightRef.current.value = "";

        const userValues = {
            id,
            name,
            size,
            weight,
            date: new Date().toLocaleDateString(),
            imc: Imc(weight/(size*size))

        }

    }

    const Imc = (imc) => {
        if (imc < 16.5) {
            return ` Votre indice de masse corporelle est de ${Imc}  vous êtes en état de Dénutrition ou famine`
        } else if (imc >= 16.5 && imc < 18.5) {
            return  ` Votre indice de masse corporelle est de ${Imc} vous êtes en état de Maigreur`
        } else if (imc >= 18.5 && imc < 25) {
            return ` Votre indice de masse corporelle est de ${Imc} vous êtes en état de Maigreur Corpulence normale`
        } else if (imc >= 25 && imc < 30) {
            return  ` Votre indice de masse corporelle est de ${Imc} vous êtes en état de Maigreur Surpoids`
        } else if (imc >= 30 && imc < 35) {
            return ` votre indice de masse corporelle est de ${Imc} vous êtes en Obésité modérée`
        } else if (imc >= 35 && imc < 40) {
            return  `votre indice de masse corporelle est de ${Imc}  vous êtes en Obésité sévère`
        } else if (imc >= 40) {
            return `votre indice de masse corporelle est de ${Imc} vous êtes en Obésité morbide`
        }
    }



    const addUserHandler = async (user) => {
        try {
            const response = await fetch(`${BASE_DB_URL}/user.json?auth=${localStorage.getItem('token')}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            if (!response.ok) {
                throw new Error("Il y a eu une erreur !")
            }
            const data = await response.json()
            dispatch(addUserAction({...user, id: data.name}))
        } catch (error) {
            console.error(error.message);
        }
    }



    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" className="form-control" id="name" placeholder="Nom" required ref={nameRef}/>
                </div>
                <div className="form-group">
                    <label htmlFor="size">Taille</label>
                    <input type="text" className="form-control" id="size" placeholder="Taille en mètres" required ref={sizeRef}/>
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Poids</label>
                    <input type="text" className="form-control" id="weight" placeholder="Poids en kilos" required ref={weightRef}/>
                </div>
                <button type="submit" onClick={addUserHandler} className="btn btn-primary mt-2">Submit</button>

            </form>
        </div>
    );
};

export default FormUser;