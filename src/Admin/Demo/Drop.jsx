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

    const [originalPos, setOriginalPos] = useState("")
    const [newPos, setNewPos] = useState("")

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

            <div className='drop_overflow'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate et laborum nihil, nisi repellat velit? Doloribus, eligendi. Soluta saepe labore ducimus nostrum deleniti laborum, architecto natus harum voluptas nemo eaque alias magni unde! Ipsum corporis cupiditate nisi laborum nostrum facere, non eius esse quo sint possimus. At quibusdam quidem itaque officia repudiandae impedit neque vero, est veritatis maiores esse nulla sed maxime sint. Nemo enim aut laudantium impedit consequatur repellendus a adipisci! Quas rem sapiente temporibus laudantium sit molestias deserunt placeat necessitatibus, ipsa non atque corporis esse hic rerum exercitationem praesentium. Nesciunt enim fuga vel velit ut dolorum laudantium! Porro alias commodi cupiditate laborum inventore? Voluptatum, voluptatem quis dolor similique placeat quaerat aliquid maiores voluptas perspiciatis cumque natus nesciunt suscipit tempore sint, dolore laboriosam rem porro praesentium. Inventore, expedita cupiditate officiis harum, aliquid libero ullam quae rerum pariatur perferendis dolorem numquam recusandae illum facere? Nobis accusamus excepturi officia pariatur, tempora magnam voluptatem fugit! Praesentium enim recusandae maxime aut omnis magni deserunt, amet molestias id voluptatum aperiam tempore! Nobis tenetur iusto ducimus eum, fugiat facilis modi adipisci aut repellat sed error provident incidunt quidem ipsum vitae iure mollitia aperiam impedit aliquam odit dolore illo velit! Et nihil laudantium cupiditate voluptate, vero quaerat minus, minima debitis reprehenderit deserunt delectus error veniam nesciunt illum inventore totam non! Impedit error maiores, suscipit consequuntur odit repellendus officia provident debitis laudantium facere aliquam iure libero similique ipsum nobis quaerat! Delectus veniam iure sunt doloribus cum vel at ut distinctio? Repellat ea accusantium architecto illum, alias doloribus animi voluptatem quod modi perspiciatis impedit laboriosam mollitia quis. Vitae similique ut illo fugit facilis ad, fugiat explicabo voluptatibus sed veniam maiores adipisci neque error aperiam delectus est ex voluptate? Ipsam repellat, debitis reiciendis vel beatae modi dicta quia amet reprehenderit assumenda quod eaque! Doloribus illo incidunt sed recusandae, ullam vitae ratione accusantium beatae eos minima, iusto voluptates quo perspiciatis quaerat quae fugit hic sequi nobis minus libero, laudantium repudiandae. Placeat pariatur illum id deserunt ipsam eius quisquam vel aliquid ducimus dolorum voluptate harum magnam quos, dignissimos quam dolor labore possimus reiciendis nulla non! Dicta facilis animi id veniam! Eligendi laudantium atque recusandae, pariatur harum doloribus, quas magnam ipsum doloremque consectetur, similique tempora! Tenetur nemo, blanditiis delectus dolores, voluptatibus illum iure iste quisquam odio reprehenderit officiis alias itaque perferendis doloremque, sunt in. Ipsam ad earum, sit placeat temporibus laborum deleniti doloribus ut reprehenderit eius ex soluta voluptates itaque voluptatibus voluptate? Eligendi, vero. Omnis, sit tempore! Facere quas porro odio sapiente laudantium? Perferendis magnam iste a natus, corporis ab ea aliquam impedit. Expedita incidunt blanditiis in veniam nulla dolore perferendis labore consequuntur recusandae vel cum necessitatibus rem, fugit obcaecati pariatur consectetur commodi doloribus harum? Excepturi odio cupiditate repudiandae natus voluptate necessitatibus sapiente! Dolores fugiat quasi similique voluptate facere quia modi perspiciatis earum non atque, illo sit, reiciendis voluptates repudiandae amet illum, sunt nobis ea minima explicabo necessitatibus? Similique rem amet alias ullam maiores numquam accusamus nihil voluptatum? Neque quidem fugit nemo tempore, odio blanditiis recusandae quos corporis ex excepturi dolorem doloremque perferendis deserunt, vitae laboriosam sit dignissimos sapiente hic laborum dolores culpa. Ullam, quia possimus. Consequuntur cupiditate quibusdam eos adipisci, velit natus, repellendus tempora necessitatibus pariatur in rerum fugit, sed iure aliquam sit ea cum! Vero quis aliquid non ipsa illo vel obcaecati fugiat! Veniam dignissimos libero labore nihil, optio cupiditate aut neque debitis distinctio? Possimus, accusamus. Laborum commodi qui pariatur, enim, minus laboriosam quia similique veritatis rerum delectus illo, unde aspernatur quibusdam? Eius doloremque natus saepe dolorem! Architecto est necessitatibus, ducimus ipsa enim eos deserunt id tenetur soluta, quasi voluptas facilis rerum? Impedit labore fuga sed earum unde? Non nostrum repellendus ratione dolorum illum, perferendis eaque doloribus possimus officia totam ex maiores sapiente quas obcaecati quasi! Iusto at reprehenderit ipsum fugit illo harum placeat distinctio autem, possimus quis voluptatum eos fugiat dolores dicta eum maxime porro accusantium perferendis repudiandae iure. Asperiores est sunt distinctio atque ipsum alias rerum ullam in reiciendis veritatis libero adipisci suscipit quam qui, facilis fuga officia exercitationem minima similique impedit facere laboriosam! Ad incidunt quae magnam animi delectus itaque distinctio, ea culpa nemo quaerat similique et cumque facilis. Mollitia ipsa accusamus atque voluptatum possimus sint nesciunt, perspiciatis temporibus consequuntur rerum tenetur consectetur placeat et quisquam animi molestiae libero, sapiente veritatis veniam minus doloribus? Error nobis unde perspiciatis, excepturi accusantium labore, ut obcaecati illo laboriosam expedita repellendus eius repellat earum id asperiores itaque quisquam et placeat rerum. Praesentium aliquam, laboriosam a laudantium dolor harum maxime tenetur est nesciunt sed sunt? Perspiciatis at maxime dolor sint quod dolore aliquam, explicabo quos, fugiat enim odio deleniti quidem. Corrupti perferendis sed quam magnam eveniet ab exercitationem corporis odit. Iste, dolorem? Laborum debitis dolores eaque vel voluptatum repudiandae asperiores maxime, ad voluptatibus fugit voluptate facilis, reprehenderit quaerat molestiae saepe aliquam accusamus quos a! Vitae, hic excepturi! At dolores soluta dicta molestiae voluptas cum, consequatur sit voluptatem, provident officia voluptatibus, nemo fugiat voluptate. Nostrum error quas, placeat voluptas earum inventore illum unde odit voluptatum optio ea rerum animi consequatur provident doloremque suscipit harum ad eum, debitis odio quasi magnam. Molestias inventore qui ex velit dignissimos id. Esse ipsam molestias laboriosam corrupti, est molestiae, magni veniam obcaecati maxime fugit unde aliquid nulla facilis! Distinctio, sed illo, ducimus tempora, architecto quod unde pariatur magni quas harum accusamus similique vitae dicta iusto error corporis tenetur ratione deserunt nisi! Provident perferendis eligendi ducimus a animi quos inventore velit magni suscipit quidem quam quis porro praesentium dolore minima saepe quo id itaque quisquam, earum tempora culpa voluptas. Distinctio autem esse corporis quo explicabo quis molestiae necessitatibus, repudiandae quos labore inventore obcaecati facilis, quisquam impedit. Eaque fugiat debitis exercitationem hic sit. Consequuntur doloremque in facere repellendus ipsam minus temporibus illum excepturi, aliquid, saepe ullam officiis est possimus porro facilis cupiditate quidem consequatur, eos repudiandae eius id maxime sunt voluptates. Eos aliquam hic laudantium quam eum quod repellendus unde, iusto porro eius sequi accusamus qui nihil iure voluptatum a dolore, odit inventore sapiente quibusdam vero. Ratione architecto nobis nihil, ex, voluptatem ipsa, sequi obcaecati vitae animi iure quasi aperiam.</p>
            </div>
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

    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        alert(`Delete ${id}`);
    };

    return (
        <div className='task' ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <button onClick={(e) => handleDeleteClick(e, id)}
                onPointerDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
            >Delete</button>
            {title}
        </div>
    )
}

export default Drop


