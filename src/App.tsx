import React, {useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './TodoList'

function App() {

    const todoListTitle = "What to learn"


    const [tasks, setTasks]= useState([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & TS", isDone: true},
        {id: 3, title: "React & Redux", isDone: false},
    ])
const removeTask = (taskId: number) => {
       const updatedState = tasks.filter(t => t.id !== taskId)
    setTasks(updatedState)
}

    return (
        <div className="App">
            <Todolist title={todoListTitle} tasks={tasks} removeTask={removeTask}/>
        </div>
    )
}

export default App