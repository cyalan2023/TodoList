import {Btn} from "./Btn";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number)=> void
    changeTodoListFilter: (filter: FilterValuesType) => void
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export const Todolist = ({title, tasks, removeTask, changeTodoListFilter}: TodoListPropsType) => {

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
    return (
        <div className="todolist">
            <TodoListHeader title={title}/>
            <div>
                <input/>
                <Btn title="+"/>
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