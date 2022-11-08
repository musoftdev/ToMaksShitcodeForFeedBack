import { createContext, useReducer, ReactNode } from "react";
import { Task, TasksActionType, initialTasks, taskReducer } from "./TaskReducer";

export const TaskContext = createContext<Task[] | null>(null)
export const TaskDispatchContext = createContext<((value: TasksActionType) => void) | null>(null)

type TaskProviderProps = {
    children: ReactNode
}

export const TasksProvider = ({children}: TaskProviderProps) => {

    const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

    return (
        <TaskContext.Provider value={tasks}>
            <TaskDispatchContext.Provider value={dispatch}>
                {children}
            </TaskDispatchContext.Provider>
        </TaskContext.Provider>
    )
}
