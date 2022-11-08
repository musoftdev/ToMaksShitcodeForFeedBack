import { useState } from "react";
import { Task } from "./utilities/TaskReducer";
import { useTasks, useTasksDispatch } from "./utilities/TaskProvider";
import "./styles/TaskList.css"

export const TaskList = () => {    

    const tasks = useTasks()

    const tasksList = tasks.map((task) => {
        return (
            <TaskRow key={task.id} task={task}/>
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
}


const TaskRow = ({task} : TaskRowProps )=> {

    const [editMode, setEditMode] = useState(false)
    const dispatch = useTasksDispatch()
    return (
        <div className = "task-row">
                
                <input   
                    className="task-checker" 
                    type = "checkbox"
                    checked = {task.done} 
                    onChange = {(e) => {
                        dispatch({type: "edit-task", task: {...task, done: e.target.checked}})
                    }} />

                {editMode ? ( 
                    <TaskEditor 
                        task={task} 
                        setEditMode = {setEditMode}
                    />
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
    setEditMode: (val: boolean) => void
}

const TaskEditor = ({task, setEditMode}: TaskEditorProps) => {

    const [editedText, setEditedText] = useState(task.text)
    const dispatch = useTasksDispatch()
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
                    dispatch({type: "edit-task", task: {...task, text: editedText}})
                    setEditMode(false)
                }}>
                Save
            </button>
            
            <button 
                className = "button delete" 
                onClick = {() => dispatch({type: "delete-task", id: task.id})}>
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