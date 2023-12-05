"use client"
// como no redireccionamos con Link usaremos Router
import { useRouter } from "next/navigation"
import { useEffect } from "react";
// como no podemos usar variables podemos usar el usestate
import { useState } from "react";

//usaremos los params para ver la ruta del form new o edit
function NewPage({ params}) {
    //console.log(params)
    //Instanciamos router
    const router = useRouter();
    // instanciamos las variables y seteamos el valor con el state
// le pongo un string vacio por default    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

// accedemos a los params
useEffect(()=>{
   if (params.id){
     //console.log(params)
     fetch(`/api/tasks/${params.id}`)
     .then((res) => res.json())
     .then((data) => {
         //console.log(data)
         setTitle(data.title)
         setDescription(data.description)
     });
   }
}, [])


//creamos la constante onSubmit del Form
// primero captamos el evento
const onSubmit = async (e) => {
    //evito que refresque la pagina
    e.preventDefault();
    //me trae todo el componente Form
    //console.log(e)
    //capturo el title y el description por separado en constantes P.D.: se puede hacer por estado
    // al usar useState no necesito capturar los datos
    /*
    const title = e.target.title.value;
    const description = e.target.description.value;
    //console.log(title, description);
*/
   if (params.id) {
     //envio los datos, como se sirve por el mismo Server no hace falta la url antes
    const res = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({title, description}),
        headers: {
            'Content-Type': 'application/json'
   },})
   const data = await res.json();
   //console.log(data)
} else {
     //envio los datos, como se sirve por el mismo Server no hace falta la url antes
    const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({title, description}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
   }
    
   //console.log(data);
   //metodo para refrescar con los datos en memoria
   router.refresh();
    //Pusheamos a la pagina inicial
   router.push("/tasks");
}


  return (
    <div className="h-screen flex justify-center items-center">
        <form className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2"
        onSubmit={onSubmit}>
            <label htmlFor="title"
                 className="font-bold text-sm">
                Título de la tarea
            </label>
            <input type="text"
            id="title"
            className="border border-gray-400 p-2 mb-4 w-full text-black"
            placeholder="Título" 
onChange={(e) => setTitle(e.target.value)}
value={title}
            />

            <label htmlFor="description"
                className="font-bold text-sm">
                Descripción de la tarea
            </label>
            <textarea rows="3"
                id="description"
                className="border border-gray-400 p-2 mb-4 w-full text-black"
                placeholder="Describe tu tarea..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            ></textarea>
            <div className="flex justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Crear
            </button>
            {
                params.id && (
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4" type="button"
                    onClick={async ()=> {
                       const res = await fetch(`/api/tasks/${params.id}`, {
                            method: 'DELETE',
                        })
                        const data = await res.json();
                        //console.log(data);
                        router.refresh();
                        router.push("/tasks")
                    }}>{/* se le agrega el type para que no use la logica onClick del Form */}
                        Eliminar
                    </button>
                )
            }
            </div>
           
        </form>
    </div>
  );
}
export default NewPage