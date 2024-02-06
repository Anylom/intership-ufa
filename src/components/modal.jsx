import React, { useEffect, useState } from 'react';
import { Datta } from './api';


const Modal = ({id, onClose}) => {
    const [details, setDetais] = useState(null);

    useEffect(()=>{
    async function getData() {
        const res = await Datta({id});
        if (res){
            setDetais(res);
        }
    }
    getData();
}, [id])

    return (
        <div className='modal'>
            <button onClick={onClose}>X</button>
            {details ? (
             <>
                <h3>{details.firstName} {details.lastName}</h3>
                <p>Age: {details.age}</p>
                <p>Height: {details.height}</p>
                <p>Weight: {details.weight}</p>
                <p>Phone: {details.phone}</p>
                <p>email: {details.email}</p>
            </>
            ):(<p>Liading details</p>)} 
            
            
            
        </div>
    );
};
export default Modal;