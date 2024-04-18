import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

export default function Root() {

    const navigate = useNavigate()

    const [val, setVal] = useState(1)

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            legajo: "",
            password: ""
        }
    })

    const onSubmit = (data) => {
        fetch("http://localhost:80/index.php", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            setVal(data)   
        })

    }
    useEffect (() => {
        if(val && val !== 1) {
            navigate("/home")
        }
    }, [val])
 //        }).then(response => response.text()).then(data => console.log(data))
 //            .catch(error => console.log(error))

    return (
    <>
        <h1>Universidad Tecnológica Nacional</h1>
        <h1>Facultad Regional Avellaneda</h1>
        {val ? null : <h3>Credenciales Incorrectas</h3>}

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>Inicio de Sesion</h2>
            </div>
            <label htmlFor="legajo">Legajo</label>
            <div>
                <input 
                    type="number" 
                    id="legajo" 
                    placeholder="Ingresa tu número de legajo" 
                    {...register("legajo", {required: "No se ingresó ningún legajo"})}
                />
                <p>{errors.legajo?.message}</p>
            </div>
            <label htmlFor="password">Contraseña</label>
            <div>
                <input 
                    type="text" 
                    id="password" 
                    placeholder="Ingresa tu contraseña"
                    {...register("password", {required: "No se ingresó ninguna contraseña"})}
                />
                <p>{errors.password?.message}</p>
            </div>
            <button type="submit">Ingresar</button>
        </form>
    </>
    );
    
}
