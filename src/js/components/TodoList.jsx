import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => { 

    const [tarea, setTarea] = useState(""); 

    const [agregarTarea, setAgregarTarea] = useState([]);

     const handleKeyDown = (e) => {
        if ( e.key === "Enter") {
            setAgregarTarea([...agregarTarea, tarea])
            setTarea("");
    }
    }
    const handleOnChange = (e) => {
        setTarea(e.target.value)
    }
    const handleDelete = (index) => { 
        const eliminarTarea = agregarTarea.filter((agregarTarea,i) => i !== index )
        setAgregarTarea(eliminarTarea)
    }

    return ( 
        <div className="container">
            <h1>¿Que tienes que hacer hoy?</h1>
            <div className="container">
                <input type="text"
                       value={tarea}
                       onChange={handleOnChange}
                       onKeyDown={handleKeyDown}
                       placeholder="Agregar Tarea y presiona Enter"/> 

            <ul>
                
            </ul>
            {
                agregarTarea.length > 0 ? agregarTarea.map((agregarTarea, index)=>{
                    return (
                        <li key={index}>{agregarTarea}<FontAwesomeIcon className="float-end" icon={faXmarkCircle} size="lg" onClick={()=>{handleDelete(index)}}/></li>
                    )
                }) 
                : 
                <p>¡Felicicades, no tienes nada que hacer por hoy!</p>
            }

            </div>
            

        </div>
    )
}
export default TodoList