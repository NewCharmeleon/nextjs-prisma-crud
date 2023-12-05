import { NextResponse } from "next/server";
// importamos la constante de conexion
import {prisma} from '@/libs/prisma'

export async function GET(request, {params}){
    console.log(params.id)
    const task = await prisma.task.findUnique({
        where: {
            id: Number(params.id)
        }
    })
    console.log(task)

    return NextResponse.json(task)
}

export async function PUT(request, {params}){
   const data = await request.json()
   
   const taskUpdated = await prisma.task.update({
    where: {
        id: Number(params.id)
    },
    /*forma tradicional si pasan todos los datos
    data: {
        title: data.title,
        description: data.description,
    }*/
    //pasa solo lo que tenga data flexible
    data:data
   })
   
    //return NextResponse.json("Actualizando Tarea "+ params.id)
    return NextResponse.json(taskUpdated)
}

export async function DELETE(request, {params}){
try {

    const taskRemoved = await prisma.task.delete({
        where: {
            id: Number(params.id)
        },
    });
    console.log(taskRemoved)
    return NextResponse.json(taskRemoved);
} catch (error){
    return NextResponse.json(error.message);
}
}