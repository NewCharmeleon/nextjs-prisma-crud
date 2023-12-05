import { NextResponse } from "next/server";
// importamos la constante de conexion
import {prisma} from '@/libs/prisma'

export async function GET(){
    const tasks = await prisma.task.findMany()
    //console.log(tasks)

    // return NextResponse.json("Obteniendo Tareas...")
    return NextResponse.json(tasks)
}

export async function POST(request){
    const {title, description}= await request.json()
    //console.log(data)
    const newTask = await prisma.task.create({
        data: {
           // title: data.title, 
            //description: data.description
            title,
            description
        }
    })

    return NextResponse.json(newTask)
}