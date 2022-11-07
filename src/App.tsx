import { useReducer, useState } from "react"
import { TaskList } from "./TaskList";
import { taskReducer, initialTasks, Task } from "./utilities/TaskReducer";
import "./styles/App.css"


const App = () => {

    const [tasks, dispatch] = useReducer(taskReducer, initialTasks)
    const completedTasks = tasks.filter((task) => task.done).length

    const addNew = (taskText: string) => {
        if (taskText.trim()) {
            dispatch({type: "add-task", text: taskText})
        }
    }

    const changeTask = (editedTask: Task) => {
        dispatch({type: "edit-task", task: editedTask})
    }

    const deleteTask = (taskId: number) => {
        dispatch({type: "delete-task", id: taskId})
    }

    const deleteCompletedTasks = () => {
        dispatch({type: "delete-completed"})
    } 

    return (
        <div className = "task-manager">
            
            <h1>Task manager</h1>
            
            <AddTask addNew = {addNew}/>

            <TaskList 
                tasks = {tasks}
                changeTask = {changeTask}
                deleteTask = {deleteTask}
            />

            <div className = "footer">
                <p>Completed {completedTasks} of {tasks.length}</p>
                <button className = "button delete" onClick={deleteCompletedTasks}>
                    Delete Completed
                </button>
            </div>
            

        </div>
    )
}

type AddTaskProp = {
    addNew: (taskText: string) => void
}

const AddTask = ({addNew}: AddTaskProp) => {

    const [newTask, setNewTask] = useState("")

    return (
        <div style = {{display: "flex", gap: "1rem", marginTop: "1rem"}}>
            <input
                style = {{flex: "1"}}
                placeholder = "Add new task..."
                value = {newTask}
                onChange = {(e) => setNewTask(e.target.value)} 
            />

            <button 
                className = "button primary"
                onClick={() => {
                    addNew(newTask)
                    setNewTask("")}}>
                Add
            </button>
        </div>
    )
}

export default App