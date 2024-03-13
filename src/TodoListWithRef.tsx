import {Btn} from "./Btn";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";
import {useRef} from "react";

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
    const taskTitleInput = useRef<HTMLInputElement>(null)

    const tasksList = tasks.length === 0 ?
        <span>Список пуст</span>
        : <ul>
            {
                tasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Btn title="x" onClickHaandler={() => removeTask(t.id)}/>
                        </li>
                    )
                })
            }
        </ul>
    const addNewTask = () => {
        if (taskTitleInput.current)
        {
            addTask(taskTitleInput.current.value)
            taskTitleInput.current.value = ""
        }
    }

    return (
        <div className="todolist">
            <TodoListHeader title={title}/>
            <div>
                <input ref={taskTitleInput}/>
                <Btn title="+" onClickHaandler={addNewTask}/>
            </div>
            <ul>
                {tasksList}

            </ul>
            <div>
                <Btn title={"All"} onClickHaandler={() => changeTodoListFilter("all")}/>
                <Btn title={"Active"} onClickHaandler={() => changeTodoListFilter("active")}/>
                <Btn title={"Completed"} onClickHaandler={() => changeTodoListFilter("completed")}/>
            </div>
        </div>
    )
}