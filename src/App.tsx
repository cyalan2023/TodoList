import React, {useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './TodoList'

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListTitle = "What to learn"


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & TS", isDone: true},
        {id: 3, title: "React & Redux", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskId: number) => {
        const updatedState = tasks.filter(t => t.id !== taskId)
        setTasks(updatedState)
    }

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
//ui
    const getFilteredTasks = (allTasks: Array<TaskType>, currentFilter: FilterValuesType): Array<TaskType> => {
        switch (currentFilter) {
            case "active":
                return allTasks.filter(t => t.isDone === false)
            case "completed":
                return allTasks.filter(t => t.isDone === true)
            default:
                return allTasks;
        }
    }
    const filteredTasks = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            <Todolist title={todoListTitle} tasks={filteredTasks} removeTask={removeTask} changeTodoListFilter={changeTodoListFilter}/>
        </div>
    )
}

export default App