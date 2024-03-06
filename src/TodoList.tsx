import {Btn} from "./Btn";
import {TodoListHeader} from "./TodoListHeader";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number)=> void
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export const Todolist = ({title, tasks, removeTask}: TodoListPropsType) => {

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
                <Btn title={"All"}/>
                <Btn title={"Active"}/>
                <Btn title={"Completed"}/>
            </div>
        </div>
    )
}