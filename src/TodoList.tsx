import {FilterValuesType, TaskType} from "./App";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from "@mui/material/Checkbox";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonContainerSX, getListItemSX} from "./Todolist.styles";


type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolistTitle: (todolistId: string, newTitle: string) => void
}




export const Todolist = (props: PropsType) => {
    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        todolistId,
        removeTodolist,
        updateTaskTitle,
        updateTodolistTitle
    } = props


    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, props.todolistId)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const addTaskHandler = (title: string) => {
        addTask(title, props.todolistId)
    }

    const updateTodolistTitleHandler = (newTitle: string) => {
        updateTodolistTitle(props.todolistId, newTitle)
    }


    const updateTaskTitleHandler = (taskID:string,newTitle: string) => {
        updateTaskTitle(props.todolistId, taskID, newTitle)
    }

    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3>
                    {/*{title}*/}
                    <EditableSpan oldTitle={title} updateTitle={updateTodolistTitleHandler}/>
                </h3>
                {/*<Button title={'x'} onClick={removeTodolistHandler}/>*/}
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskHandler}/>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasks.map((task) => {
                            const removeTaskHandler = () => {
                                removeTask(task.id, todolistId)
                            }
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue, todolistId)
                            }

                            // const updateTaskTitleHandler = (newTitle: string) => {
                            //     updateTaskTitle(props.todolistId, task.id, newTitle)
                            // }

                            return <ListItem key={task.id} sx={getListItemSX(task.isDone)} >
                                {/*<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>*/}
                                {/*<span>{task.title}</span>*/}
                                <div>
                                    <Checkbox  checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan oldTitle={task.title} updateTitle={(newTitle:string)=>updateTaskTitleHandler(task.id,newTitle)}/>
                                </div>
                                {/*<Button onClick={removeTaskHandler} title={'x'}/>*/}
                                <IconButton aria-label="delete" onClick={removeTaskHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        })}
                    </List>
            }
            <Box sx={filterButtonContainerSX}>
                <Button color={"secondary"} variant={filter === 'all' ? 'outlined' : "contained"}  onClick={() => changeFilterTasksHandler('all')}>All</Button>
                <Button color={"error"} variant={filter === 'active' ? 'outlined' : "contained"}  onClick={() => changeFilterTasksHandler('active')}>Active</Button>
                <Button color={"primary"} variant={filter === 'completed' ? 'outlined' : "contained"}  onClick={() => changeFilterTasksHandler('completed')}>Completed</Button>
                {/*<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}*/}
                {/*        onClick={() => changeFilterTasksHandler('all')}/>*/}
                {/*<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}*/}
                {/*        onClick={() => changeFilterTasksHandler('active')}/>*/}
                {/*<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}*/}
                {/*        onClick={() => changeFilterTasksHandler('completed')}/>*/}
            </Box>
        </div>
    )
}
