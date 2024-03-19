import React, {useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './TodoList'
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListTitle = "What to learn"


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS & TS", isDone: true},
        {id: v1(), title: "React & Redux", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskId: string) => {
        const updatedState = tasks.filter(t => t.id !== taskId)
        setTasks(updatedState)
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const updatedState = [newTask, ...tasks]
        setTasks(updatedState)
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean ) => {
        // const task = tasks.find(t => t.id === taskId)
        // if(task){
        //     task.isDone = !task.isDone
        //     setTasks([...tasks])
        // }
        const updatedState = tasks.map(t => t.id === taskId ? {...t,isDone: newIsDoneValue} : t)
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
            <Todolist filter={filter} title={todoListTitle} tasks={filteredTasks} addTask={addTask} removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter} changeTaskStatus={changeTaskStatus}/>
        </div>
    )
}

export default App