import React from 'react';
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";


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
            weight
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
                <button type="submit" className="btn btn-primary mt-2">Submit</button>

            </form>
        </div>
    );
};

export default FormUser;