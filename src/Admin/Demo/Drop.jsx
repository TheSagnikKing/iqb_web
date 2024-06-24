import React, { useEffect, useState } from 'react'
import "./Drop.css"
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const Drop = () => {

    const [tasks, setTasks] = useState([
        { id: 1, title: "Add test to homepage" },
        { id: 2, title: "Fix Styling in about section" },
        { id: 3, title: "How to center a div ?" }
    ])

    const addTasks = (title) => {
        setTasks((tasks) => [...tasks, {
            id: tasks.length + 1,
            title
        }])
    }

    const [ originalPos, setOriginalPos] = useState("")
    const [ newPos, setNewPos ] = useState("")

    const getTaskPos = (id) => tasks.findIndex(task => task.id === id)

    const handleDragEnd = (event) => {
        const { active, over } = event

        if (active.id === over.id) {
            return
        }

        setTasks((tasks) => {
            const originalPos = getTaskPos(active.id)
            const newPos = getTaskPos(over.id)

            // console.log("Original Pos ",originalPos)
            // console.log("New Pos ",newPos)

            setOriginalPos(originalPos)
            setNewPos(newPos)

            return arrayMove(tasks, originalPos, newPos)
        })
    }

    useEffect(() => {
        console.log(tasks)
        console.log(originalPos)
        console.log(newPos)
        //For tasks array change i will call api to save the data in the database
    }, [tasks])



    //For Mobile Devices

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor), // For Mobile
        useSensor(KeyboardSensor, { // First go to the element press enter and then ctrl hold + up/down arrow
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    return (
        <div className='drop_container'>
            <h1>My Tasks</h1>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
                <Column tasks={tasks} />
            </DndContext>
        </div>
    )
}


const Column = ({ tasks }) => {
    return (
        <div className='column'>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    <Task id={task.id} title={task.title} key={task.id} />
                ))}
            </SortableContext>
        </div>
    )
}


const Task = ({ id, title }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    return (
        <div className='task' ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <input type="checkbox" className='checkbox' />
            {title}
        </div>
    )
}

export default Drop


// const [advertisementState, setAdvertisementState] = useState([
//     {
//         "public_id": "advertisements/salon-1/rose_1719209947907_52e2ff26-db64-4bd1-8396-192f4f45a9fc",
//         "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1719209948/advertisements/salon-1/rose_1719209947907_52e2ff26-db64-4bd1-8396-192f4f45a9fc.jpg",
//         "_id": "66790fddc69b5b49cf8854df"
//     },
//     {
//         "public_id": "advertisements/salon-1/kbimage_1719209947906_19cfd58a-c53c-42e6-9f34-113aca480ca9",
//         "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1719209948/advertisements/salon-1/kbimage_1719209947906_19cfd58a-c53c-42e6-9f34-113aca480ca9.png",
//         "_id": "66790fddc69b5b49cf8854de"
//     },
//     {
//         "public_id": "advertisements/salon-1/gokukb_1719209947897_033189bd-5a2c-4da4-a404-bbadedf9b0e4",
//         "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1719209948/advertisements/salon-1/gokukb_1719209947897_033189bd-5a2c-4da4-a404-bbadedf9b0e4.jpg",
//         "_id": "66790fddc69b5b49cf8854dd"
//     }
// ]);
