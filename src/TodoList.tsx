import {Btn} from "./Btn";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";
import {ChangeEvent, useRef, useState,KeyboardEvent} from "react";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = ({title, addTask, tasks, removeTask, changeTodoListFilter}: TodoListPropsType) => {
    const [taskTitle, setTaskTitle] = useState("")

    const tasksList = tasks.length === 0 ?
        <span>Список пуст</span>
        : <ul>
            {
                tasks.map((t) => {
                    const removeTaskHandler = () => removeTask(t.id)
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Btn title="x" onClickHaandler={removeTaskHandler}/>
                        </li>
                    )
                })
            }
        </ul>
    const addNewTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle("")
    }
    const onKeyDownAddNewTaskHandler = (el: KeyboardEvent<HTMLInputElement>) => {
        if (el.key === "Enter" && isAddTaskPossible) {
            addNewTaskHandler()
        }
    }
    const setTaskTitleHandler = (ev: ChangeEvent<HTMLInputElement>) => setTaskTitle(ev.currentTarget.value)

    const changeTodoListFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => changeTodoListFilter(filter)
    }


    const maxTitleLength = 15
    const isAddTaskPossible = taskTitle.length && taskTitle.length <= maxTitleLength

    return (
        <div className="todolist">
            <TodoListHeader title={title}/>
            <div>
                <input value={taskTitle}
                       onChange={setTaskTitleHandler}
                       onKeyDown={onKeyDownAddNewTaskHandler}
                />
                <Btn title="+" onClickHaandler={addNewTaskHandler} isDisabled={!isAddTaskPossible}/>
                {!taskTitle.length &&  <div>Please, enter title</div>}
                {taskTitle.length > maxTitleLength && <div>Task title is too long</div>}
            </div>
            <ul>
                {tasksList}

            </ul>
            <div>
                <Btn title={"All"} onClickHaandler={changeTodoListFilterHandlerCreator("all")}/>
                <Btn title={"Active"} onClickHaandler={changeTodoListFilterHandlerCreator("active")}/>
                <Btn title={"Completed"} onClickHaandler={changeTodoListFilterHandlerCreator("completed")}/>
            </div>
        </div>
    )
}