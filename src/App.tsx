import { useContext, useState } from "react";
import { TaskList } from "./TaskList";
import { TasksProvider, useTasks, useTasksDispatch } from "./utilities/TaskProvider";
import "./styles/App.css";


const App = () => {

    return (
        <div className = "task-manager">
            
            <h1>Task manager v1</h1>
            
            <TasksProvider>
                <AddTask />
                <TaskList />
                <TaskFooter />
            </TasksProvider>
                    
        </div>
    )
}


const AddTask = () => {

    const [newTask, setNewTask] = useState("")
    const dispatch = useTasksDispatch()

    return (
        <div className="add-task-header">
            <input
                className="add-task-input"
                placeholder = "Add new task..."
                value = {newTask}
                onChange = {(e) => setNewTask(e.target.value)} 
            />

            <button 
                className = "button primary"
                onClick={() => {
                    if (newTask.trim()) {
                        dispatch({type: "add-task", text: newTask})
                    }
                    setNewTask("")}}>
                Add
            </button>
        </div>
    )
}

const TaskFooter = () => {

    const tasks = useTasks()
    const dispatch = useTasksDispatch()

    const completedTasks = tasks.filter((task) => task.done).length

    return (
        <div className = "footer">
            <p>Completed {completedTasks} of {tasks.length}</p>
            <button className = "button delete" onClick={() => dispatch({type: "delete-completed"})}>
                Delete Completed
            </button>
        </div>
    )
}

export default App