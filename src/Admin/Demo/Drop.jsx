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