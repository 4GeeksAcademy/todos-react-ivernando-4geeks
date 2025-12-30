import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {

    const [tarea, setTarea] = useState("");
    const [agregarTarea, setAgregarTarea] = useState([]);
    const [users, setUsers] = useState([])
    const [selected, setSelected] = useState("")
    const [usersTodos, setUsersTodos] = useState([])
    const [crearUsuario, setCrearUsuario] = useState([])
    const [todo, setTodo] = useState("")
    const [todoId, setTodoId] = useState("")
    


    useEffect(() => {
        readUsers()
    

    }, [])


    const readUsers = () => {
        fetch("https://playground.4geeks.com/todo/users")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data => setUsers(data.users))
            .catch(err => console.log(err))
    }


    const getTodos = () => {

    		fetch("https://playground.4geeks.com/todo/users/" + selected)
    			.then(resp => {
    				if (!resp.ok) {
    					throw new Error("something went wrong")
    				}
    				return resp.json()
    			})

    			.then(data => setUsersTodos(data.todos))
    			.catch(err => console.log(err))

    	}

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setAgregarTarea([...agregarTarea, tarea])
            setTarea("");
        }
    }
    const handleOnChange = (e) => {
        setTarea(e.target.value)
    }


    const handleDelete = (index) => {
        const eliminarTarea = agregarTarea.filter((agregarTarea, i) => i !== index)
        setAgregarTarea(eliminarTarea)
    }


    const SubirUsuarioFetch = async () => {
        const response = await fetch('https://playground.4geeks.com/todo/users/' + crearUsuario, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
    }

    const CrearTodoFetch = async () => {
        const responde = await fetch('https://playground.4geeks.com/todo/todos/' + selected, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                label: todo,
                is_done: false
            })
        }


        )
    }
    const EliminarTodoFetch = async () => {
        const response = await fetch('https://playground.4geeks.com/todo/todos/' + todoId, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
    }



    const handleOnChangeCrearUsuario = (e) => {
        setCrearUsuario(e.target.value)
    }

    const handleOnChangeTodo = (e) => {
        setTodo(e.target.value)
    }
    const handleOnChangeTodoId = (e) => {
        setTodoId(e.target.value)
    }
    const SeleccionarClick = (user) => {

        setSelected(user.name);
        getTodos();

        console.log("soy " + user.name);
    }

    



    return (
        <div className="container">
            <h1>¿Que tienes que hacer hoy?</h1>
            <div className="container">
                <input type="text"
                    value={tarea}
                    onChange={handleOnChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Agregar Tarea y presiona Enter" />

                <ul>

                </ul>
                {
                    agregarTarea.length > 0 ? agregarTarea.map((agregarTarea, index) => {
                        return (
                            <li key={index}>{agregarTarea}<FontAwesomeIcon className="float-end" icon={faXmarkCircle} size="lg" onClick={() => { handleDelete(index) }} /></li>
                        )
                    })
                        :
                        <p>¡Felicicades, no tienes nada que hacer por hoy!</p>
                }

            </div>
            <h2>Usuarios</h2>
            <hr/>
            <ul>
                {users.map(el => <li key={el.id} onClick={() => SeleccionarClick(el)}>{el.name}</li>)}
            </ul>
            <input type="text" value={crearUsuario} onChange={handleOnChangeCrearUsuario}></input>
            <button type="button" className="btn btn-primary mx-4" onClick={SubirUsuarioFetch}>Crear Usuario</button>
            <hr />
            <br />
            {selected ? (
                <>
                    <h2>¿Quieres agregar un Todo a este usuario?</h2>
                    <h3 className="text-primary">{selected}</h3>
                    <br />
                    <input type="text" placeholder="Agregar Todo" value={todo} onChange={handleOnChangeTodo} />
                    <button className="btn btn-danger mx-4" onClick={CrearTodoFetch}>Crear Todo</button>
                     </>)
                     : (
                <h2>Primero selecciona un Usuario para agregarle un Todo</h2>)}
                <hr/>
               <h2>Eliminar Todo</h2>
               <input type="text" placeholder="escribe el ID del todo" value={todoId} onChange={handleOnChangeTodoId}/>
               <button className="btn btn-warning mx-4" onClick={EliminarTodoFetch}>Eliminar Todo</button>

        </div>
    )
}
export default TodoList