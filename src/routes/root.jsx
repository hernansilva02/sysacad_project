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
    <div>
        <h1 className="text-center text-white font-bold text-6xl pt-2">Universidad Tecnológica Nacional</h1>

        <h1 className="text-white text-center pt-6 text-3xl">Facultad Regional Avellaneda</h1>
        {val ? null : <h3>Credenciales Incorrectas</h3>}

        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-300 rounded flex items-center justify-center">
            <div>
                <h2 className="text-center mt-20 mb-10 w-full text-white">Inicio de Sesion</h2>
            </div>
                <div className="">
                <label htmlFor="legajo" className="text-left text-xl">Legajo</label>
                <input 
                    className="rounded w-56 justify-center"
                    type="number" 
                    id="legajo" 
                    placeholder="Ingresa tu número de legajo" 
                    {...register("legajo", {required: "Ingresar numero de legajo"})}
                />
                <br/>
                <p className="text-red-600 text-xl">{errors.legajo?.message}</p>
            </div>
            <label htmlFor="password">Contraseña</label>
            <div>
                <input 
                    className="rounded"
                    type="text" 
                    id="password" 
                    placeholder="Ingresa tu contraseña"
                    {...register("password", {required: "Una contraseña es requerida"})}
                />
                <p className="text-red-600 text-xl">{errors.password?.message}</p>
            </div>
            <button type="submit">Ingresar</button>
        </form>
    </div>
    );
}
