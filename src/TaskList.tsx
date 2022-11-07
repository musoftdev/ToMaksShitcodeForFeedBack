import { useState } from "react"
import { Task } from "./utilities/TaskReducer";
import "./styles/TaskList.css"

type TaskListProps = {
    tasks: Task[],
    changeTask: (task: Task) => void,
    deleteTask: (id: number) => void
}


export const TaskList = ({tasks, changeTask, deleteTask} : TaskListProps) => {    

    const tasksList = tasks?.map((task) => {
        return (
            <TaskRow
                key = {task.id} 
                task = {task}
                changeTask = {changeTask}
                deleteTask = {deleteTask}
            />
        )
    })

    return (
        <div className = "task-list">
            {tasksList.length ? tasksList : <p>List is empty</p>}
        </div>
    )
}


type TaskRowProps = {
    task: Task,
    changeTask: (task: Task) => void,
    deleteTask: (id: number) => void
}


const TaskRow = ({task, changeTask, deleteTask} : TaskRowProps )=> {

    const [editMode, setEditMode] = useState(false)

    return (
        <div className = "task-row">
                
                <input   
                    className="task-checker" 
                    type = "checkbox"
                    checked = {task.done} 
                    onChange = {(e) => {
                        changeTask({...task, done: e.target.checked})}}/>

                {editMode ? ( 
                    <TaskEditor 
                        task={task} 
                        setEditMode = {setEditMode} 
                        changeTask = {changeTask}
                        deleteTask = {deleteTask}/> 
                ) : (
                    <div className="task-row-elements">
                        <span>{task.text}</span> 
                        <button className = "button primary" onClick = {() => setEditMode(true)}>
                            Edit
                        </button>
                    </div>
                )}
                
            </div>
    )
}

type TaskEditorProps = {
    task: Task,
    changeTask: (task: Task) => void,
    setEditMode: (val: boolean) => void
    deleteTask: (id: number) => void
}

const TaskEditor = ({task, setEditMode, changeTask, deleteTask}: TaskEditorProps) => {

    const [editedText, setEditedText] = useState(task.text)

    return (
        <div className="task-row-elements">
            <input
                type = "text" 
                value = {editedText}
                onChange = {(e) => setEditedText(e.target.value)}
            />

            <button
                className = "button primary" 
                onClick={() =>  {
                    changeTask({...task, text: editedText})
                    setEditMode(false)
                }}>
                Save
            </button>
            
            <button 
                className = "button delete" 
                onClick = {() => deleteTask(task.id)}>
                Delete
            </button>

            <button 
                className = "button primary"
                onClick={() => {
                    setEditedText(task.text)
                    setEditMode(false)
                }}>
                Cancel
            </button>
        </div>

    )
}