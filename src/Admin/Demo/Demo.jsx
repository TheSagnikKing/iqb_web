// import React, { useEffect, useState } from 'react'
// import "./Demo.css"
// import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
// import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove, sortableKeyboardCoordinates, horizontalListSortingStrategy } from "@dnd-kit/sortable"
// import { CSS } from "@dnd-kit/utilities"

// const Demo = () => {

//     const [tasks, setTasks] = useState([
//         { id: 1, title: "Add test to homepage" },
//         { id: 2, title: "Fix Styling in about section" },
//         { id: 3, title: "How to center a div ?" },
//         { id: 4, title: "What is html5 ? " },
//         { id: 5, title: "Define map function" },
//         { id: 6, title: "How to use a flexbox ?" }
//     ])

//     const addTasks = (title) => {
//         setTasks((tasks) => [...tasks, {
//             id: tasks.length + 1,
//             title
//         }])
//     }

//     const [originalPos, setOriginalPos] = useState("")
//     const [newPos, setNewPos] = useState("")

//     const getTaskPos = (id) => tasks.findIndex(task => task.id === id)

//     const handleDragEnd = (event) => {
//         const { active, over } = event

//         if (active.id === over.id) {
//             return
//         }

//         setTasks((tasks) => {
//             const originalPos = getTaskPos(active.id)
//             const newPos = getTaskPos(over.id)

//             // console.log("Original Pos ",originalPos)
//             // console.log("New Pos ",newPos)

//             setOriginalPos(originalPos)
//             setNewPos(newPos)

//             return arrayMove(tasks, originalPos, newPos)
//         })
//     }

//     useEffect(() => {
//         console.log(tasks)
//         console.log(originalPos)
//         console.log(newPos)
//         //For tasks array change i will call api to save the data in the database
//     }, [tasks])



//     //For Mobile Devices

//     const sensors = useSensors(
//         useSensor(PointerSensor),
//         useSensor(TouchSensor), // For Mobile
//         useSensor(KeyboardSensor, { // First go to the element press enter and then ctrl hold + up/down arrow
//             coordinateGetter: sortableKeyboardCoordinates
//         })
//     )


//     return (
//         <div className='demo_container'>
//             <div className='demo_header'>Header</div>
//             <div className='demo_adv_list_container'>
//                 <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
//                     <div className='demo_column'>
//                         <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
//                             {tasks.map((task) => (
//                                 <Task id={task.id} title={task.title} key={task.id} />
//                             ))}
//                         </SortableContext>
//                     </div>
//                 </DndContext>
//             </div>
//         </div>
//     )
// }

// export default Demo


// const Task = ({ id, title }) => {
//     const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

//     const style = {
//         transition,
//         transform: CSS.Transform.toString(transform)
//     }
//     return (
//         <div className='demo_task' ref={setNodeRef} {...attributes} {...listeners} style={style}>
//             <input type="checkbox" className='demo_checkbox' />
//             {title}
//         </div>
//     )
// }


import React, { useEffect, useState } from 'react';
import './Demo.css';
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, useSortable, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Demo = () => {
    const [tasks, setTasks] = useState([
        { _id: 1, title: "Add test to homepage" },
        { _id: 2, title: "Fix Styling in about section" },
        { _id: 3, title: "How to center a div ?" },
        { _id: 4, title: "What is html5 ?" },
        { _id: 5, title: "Define map function" },
        { _id: 6, title: "How to use a flexbox ?" },
        { _id: 7, title: "Add test to homepage" },
        { _id: 8, title: "Fix Styling in about section" },
        { _id: 9, title: "How to center a div ?" },
        { _id: 10, title: "What is html5 ?" },
        { _id: 11, title: "Define map function" },
        { _id: 12, title: "How to use a flexbox ?" }
    ]);

    const addTasks = (title) => {
        setTasks((tasks) => [...tasks, {
            _id: tasks.length + 1,
            title
        }]);
    };

    const getTaskPos = (id) => tasks.findIndex(task => task._id === id);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        setTasks((tasks) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);

            return arrayMove(tasks, originalPos, newPos);
        });
    };

    useEffect(() => {
        console.log(tasks);
        // For tasks array change I will call an API to save the data in the database
    }, [tasks]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor), // For Mobile
        useSensor(KeyboardSensor, { // First go to the element press enter and then ctrl hold + up/down arrow
            coordinateGetter: sortableKeyboardCoordinates
        })
    );
    

    return (
        <div className='demo_container'>
            <div className='demo_header'>Header</div>
            <div className='demo_adv_list_container'>
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
                    <div className='demo_column'>
                        <SortableContext items={tasks.map(task => task._id)} strategy={horizontalListSortingStrategy}>
                            {tasks.map((task) => (
                                <Task key={task._id} id={task._id} title={task.title} />
                            ))}
                        </SortableContext>
                    </div>
                </DndContext>
            </div>
        </div>
    );
};

export default Demo;

const Task = ({ id, title }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    return (
        <div className='demo_task' ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <img src="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80" alt="" />
        </div>
    );
};
