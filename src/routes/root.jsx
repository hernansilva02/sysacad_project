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
            <div className="flex justify-center h-full">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-gradient-to-b from-white to-slate-100 rounded-lg flex flex-col w-fit h-fit p-10 mx-auto shadow-xl items-start mt-10">
                    <h2 className="text-4xl mb-6 pt-2 text-black text-left">Inicio de Sesion</h2>
                    {val ? null : <h3 className="text-red-600 font-bold uppercase text-center">Credenciales Incorrectas</h3>}
                    <div className="flex items-center flex-col mb-2 h-full">
                        <label htmlFor="legajo" className="text-lg w-96 text-left">Legajo</label>
                        <input 
                            className="flex rounded-md w-96 bg-transparent border-2 border-gray-800 p-2 hover:border-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-700"
                            type="number" 
                            id="legajo" 
                            placeholder="Ingresa tu número de legajo" 
                            {...register("legajo", {required: "Ingresar numero de legajo"})}
                        />
                        <p className="text-red-600 text-xl">{errors.legajo?.message}</p>
                    </div>
                    <div className="flex flex-col items-center mb-10 h-full">
                        <label className="text-lg w-96 text-left" htmlFor="password">Contraseña</label>
                        <input 
                            className="flex rounded-md w-96 bg-transparent border-2 border-gray-800 p-2 hover:border-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-700"
                            type="text" 
                            id="password" 
                            placeholder="Ingresa tu contraseña"
                            {...register("password", {required: "Una contraseña es requerida"})}
                        />
                        <p className="text-red-600 text-xl flex items-center">{errors.password?.message}</p>
                    </div>
                    <button className="w-full text-center text-2xl p-1 border-2 border-sky-700 rounded-full hover:bg-sky-700 hover:text-white transition-colors" type="submit">Ingresar</button>
                </form>

            </div>
        </>
    );
}
