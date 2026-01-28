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


    const getTodos = (username) => {

        fetch("https://playground.4geeks.com/todo/users/" + username)
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
        getTodos(user.name);

        console.log("soy " + user.name);
    }





    return (
        <div className="container">
            <h2>Usuarios agregados 👤 </h2>
            
                {users.map(el => <div className="container border p-2 bg-secondary-subtle" key={el.id} onClick={() => SeleccionarClick(el)}>{el.name} 🟢</div>)}
            
            <div className="mb-3 border border-4 p-4 text-center">
            <h2>Agregar Usuario</h2>
            <input type="text" className="form-control text-center" value={crearUsuario} onChange={handleOnChangeCrearUsuario} 
                                id="exampleFormControlInput1" placeholder="escribe aqui el nombre del usuario nuevo"/>
            <button type="button" className="btn btn-primary mt-4" onClick={SubirUsuarioFetch}>Crear Usuario</button>
            </div>
            <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <h2> Todos de usuario {selected} 📝</h2>
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      
       
                {usersTodos.map(el =><div className="accordion-body border-bottom" key={el.id}>{el.label} <p className="text-end">id= {el.id}</p></div>)}
            
      
    </div>
  </div>
  </div>
            <div className="my-4 border border-4 p-4 text-center">
            {selected ? (
                <>
                    <h2>¿Quieres agregar un Todo a este usuario?</h2>
                    <h3 className="text-primary">{selected}</h3>
                    <br />
                    <input type="text"  className ="form-control text-center" placeholder="escribe aqui un todo nuevo" value={todo} onChange={handleOnChangeTodo} />
                    <button className="btn btn-warning mt-4" onClick={CrearTodoFetch}>Crear Todo</button>
                </>

            )
                :
                (
                    <h2>Primero selecciona un Usuario para agregarle un Todo</h2>)}
                    </div>
            
            <div className="mb-3 border border-4 p-4 text-center">
                <h2>Eliminar Todo usando su ID</h2>
            <input type="text" className="form-control text-center" placeholder="escribe el ID del todo" value={todoId} onChange={handleOnChangeTodoId} />
            <button className="btn btn-danger mt-4" onClick={EliminarTodoFetch}>Eliminar Todo</button>
            </div>
<nav className="navbar navbar-expand-lg bg-success-subtle mt-4 p-5">
  <div className="container-md">
    <a className="navbar-brand mx-auto" href="https://www.youtube.com/watch?v=l_9nVU8zg0k" target="_blank">¡Y no olvides cepillarte los dientes!</a>
  </div>
</nav>
        </div>
    )
}
export default TodoList