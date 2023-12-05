//"use client"
import Link from "next/link";
// Importar Prisma para la opcion 1
import { prisma } from "@/libs/prisma";
//importamos TaskCard
import TaskCard from "@/components/TaskCard";

async function loadTask(){
  // Obtener de la BBDD con Prisma
  // me da error import export
 const tasks = await prisma.task.findMany();
 //console.log("Estas son las tareas...")
  //console.log(tasks);
  return(tasks);


  // Haciendo una peticion HTTP a /api/tasks
// al estar el codigo antes de que llegue al navegador hay que poner la ruta completa
/*const res = await fetch('http://localhost:3002/api/tasks');
  const data = await res.json();
  console.log("data en LoadTasks")
  console.log(data);
  return data*/
}

async function HomePage() {

  const tasks = await loadTask();
  //console.log("task en homepage")
  //console.log(tasks)

  return (
    <section>
      <div className="grid grid-cols-3 gap-3">
    {tasks.map((task) => (
      <TaskCard task={task} key={task.id} />
      ))}
   </div>
   <Link href="/tasks/new">
   <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Nueva
            </button>
    </Link>        
    </section>
  
  );
}
export default HomePage