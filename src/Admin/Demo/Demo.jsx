// import React, { useEffect, useState } from 'react';
// import './Demo.css';
// import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
// import { SortableContext, horizontalListSortingStrategy, useSortable, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// const Demo = () => {
//     const [tasks, setTasks] = useState([
//         { _id: 1, title: "Add test to homepage" },
//         { _id: 2, title: "Fix Styling in about section" },
//         { _id: 3, title: "How to center a div ?" },
//         { _id: 4, title: "What is html5 ?" },
//         { _id: 5, title: "Define map function" },
//         { _id: 6, title: "How to use a flexbox ?" },
//         { _id: 7, title: "Add test to homepage" },
//         { _id: 8, title: "Fix Styling in about section" },
//         { _id: 9, title: "How to center a div ?" },
//         { _id: 10, title: "What is html5 ?" },
//         { _id: 11, title: "Define map function" },
//         { _id: 12, title: "How to use a flexbox ?" }
//     ]);

//     const addTasks = (title) => {
//         setTasks((tasks) => [...tasks, {
//             _id: tasks.length + 1,
//             title
//         }]);
//     };

//     const getTaskPos = (id) => tasks.findIndex(task => task._id === id);

//     const handleDragEnd = (event) => {
//         const { active, over } = event;

//         if (!over || active.id === over.id) {
//             return;
//         }

//         setTasks((tasks) => {
//             const originalPos = getTaskPos(active.id);
//             const newPos = getTaskPos(over.id);

//             return arrayMove(tasks, originalPos, newPos);
//         });
//     };

//     useEffect(() => {
//         console.log(tasks);
//         // For tasks array change I will call an API to save the data in the database
//     }, [tasks]);

//     const sensors = useSensors(
//         useSensor(PointerSensor),
//         useSensor(TouchSensor), // For Mobile
//         useSensor(KeyboardSensor, { // First go to the element press enter and then ctrl hold + up/down arrow
//             coordinateGetter: sortableKeyboardCoordinates
//         })
//     );


//     return (
//         <div className='demo_container'>
//             <div className='demo_header'>Header</div>
//             <div className='demo_adv_list_container'>
//                 <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
//                     <div className='demo_column'>
//                         <SortableContext items={tasks.map(task => task._id)} strategy={horizontalListSortingStrategy}>
//                             {tasks.map((task) => (
//                                 <Task key={task._id} id={task._id} title={task.title} />
//                             ))}
//                         </SortableContext>
//                     </div>
//                 </DndContext>
//             </div>
//         </div>
//     );
// };

// export default Demo;

// const Task = ({ id, title }) => {
//     const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

//     const style = {
//         transition,
//         transform: CSS.Transform.toString(transform)
//     };

//     return (
//         <div className='demo_task' ref={setNodeRef} {...attributes} {...listeners} style={style}>
//             <img src="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80" alt="" />
//         </div>
//     );
// };

import React, { useEffect, useState } from 'react';
import './Demo.css';
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, useSortable, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Demo = () => {
    const [advState, setAdvState] = useState([
        {
            "public_id": "advertisements/salon-1/rose_1719209947907_52e2ff26-db64-4bd1-8396-192f4f45a9fc",
            "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1719209948/advertisements/salon-1/rose_1719209947907_52e2ff26-db64-4bd1-8396-192f4f45a9fc.jpg",
            "_id": "66790fddc69b5b49cf8854df"
        },
        {
            "public_id": "advertisements/salon-1/kbimage_1719209947906_19cfd58a-c53c-42e6-9f34-113aca480ca9",
            "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1719209948/advertisements/salon-1/kbimage_1719209947906_19cfd58a-c53c-42e6-9f34-113aca480ca9.png",
            "_id": "66790fddc69b5b49cf8854de"
        },
        {
            "public_id": "advertisements/salon-1/gokukb_1719209947897_033189bd-5a2c-4da4-a404-bbadedf9b0e4",
            "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1719209948/advertisements/salon-1/gokukb_1719209947897_033189bd-5a2c-4da4-a404-bbadedf9b0e4.jpg",
            "_id": "66790fddc69b5b49cf8854dd"
        }
    ]);

    // const addTasks = (title) => {
    //     setTasks((tasks) => [...tasks, {
    //         _id: tasks.length + 1,
    //         title
    //     }]);
    // };

    const getAdvPos = (id) => advState.findIndex(adv => adv._id === id);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        setAdvState((advs) => {
            const originalPos = getAdvPos(active.id);
            const newPos = getAdvPos(over.id);

            return arrayMove(advs, originalPos, newPos);
        });
    };

    useEffect(() => {
        console.log(advState);
        // For tasks array change I will call an API to save the data in the database
    }, [advState]);

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
                        <SortableContext items={advState.map(adv => adv._id)} strategy={horizontalListSortingStrategy}>
                            {advState.map((adv) => (
                                <Adv key={adv._id} id={adv._id} url={adv.url} />
                            ))}
                        </SortableContext>
                    </div>
                </DndContext>
            </div>
        </div>
    );
};

export default Demo;

const Adv = ({ id, url }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    return (
        <div className='demo_task' ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <img src={url} alt="" />
        </div>
    );
};
