import {Btn} from "./Btn";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";
import {ChangeEvent, useRef, useState, KeyboardEvent} from "react";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = ({
                             title,
                             addTask,
                             tasks,
                             removeTask,
                             filter,
                             changeTodoListFilter,
                             changeTaskStatus
                         }: TodoListPropsType) => {
    const [taskTitle, setTaskTitle] = useState("")
    const [inputError, setImputError] = useState<boolean>(false)

    const tasksList = tasks.length === 0 ?
        <span>Список пуст</span>
        : <ul>
            {
                tasks.map((t) => {
                    const removeTaskHandler = () => removeTask(t.id)
                    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)
                    return (
                        <li key={t.id} className={t.isDone ? "task-done" : ""}>
                            <input type="checkbox" checked={t.isDone} onChange={changeStatusHandler}/>
                            <span>{t.title}</span>
                            <Btn title="x" onClickHaandler={removeTaskHandler}/>
                        </li>
                    )
                })
            }
        </ul>
    const addNewTaskHandler = () => {
        const trimedTaskTitle = taskTitle.trim()
        if (trimedTaskTitle) {
            addTask(taskTitle)
        } else {
            setImputError(true)
        }
        setTaskTitle("")
    }
    const onKeyDownAddNewTaskHandler = (el: KeyboardEvent<HTMLInputElement>) => {
        if (el.key === "Enter" && isAddTaskPossible) {
            addNewTaskHandler()
        }
    }
    const setTaskTitleHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        inputError && setImputError(false)
        setTaskTitle(ev.currentTarget.value)
    }

    const changeTodoListFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => changeTodoListFilter(filter)
    }


    const maxTitleLength = 15
    const isAddTaskPossible = taskTitle.length && taskTitle.length <= maxTitleLength

    return (
        <div className="todolist">
            <TodoListHeader title={title}/>
            <div>
                <input
                    className={inputError ? "input-error" : ""}
                    value={taskTitle}
                    onChange={setTaskTitleHandler}
                    onKeyDown={onKeyDownAddNewTaskHandler}
                />
                <Btn title="+" onClickHaandler={addNewTaskHandler} isDisabled={!isAddTaskPossible}/>
                {!taskTitle.length && <div style={{color: inputError ? "red" : "black"}}>Please, enter title</div>}
                {taskTitle.length > maxTitleLength && <div>Task title is too long</div>}
            </div>
            <ul>
                {tasksList}

            </ul>
            <div>
                <Btn classes={filter === "all" ? "btn-active" : ""} title={"All"}
                     onClickHaandler={changeTodoListFilterHandlerCreator("all")}/>
                <Btn classes={filter === "active" ? "btn-active" : ""} title={"Active"}
                     onClickHaandler={changeTodoListFilterHandlerCreator("active")}/>
                <Btn classes={filter === "completed" ? "btn-active" : ""} title={"Completed"}
                     onClickHaandler={changeTodoListFilterHandlerCreator("completed")}/>
            </div>
        </div>
    )
}