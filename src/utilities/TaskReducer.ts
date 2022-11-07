
export interface Task {
    id: number,
    text: string,
    done: boolean
}

export const initialTasks: Task[] = [
    {id: 0, text: 'Visit Kafka Museum', done: true},
    {id: 1, text: 'Watch a puppet show', done: false},
    {id: 2, text: 'Lennon Wall pic', done: false},
  ];

type ACTIONTYPE =
  | { type: "add-task", text: string }
  | { type: "edit-task", task: Task }
  | { type: "delete-task", id: number }
  | { type: "delete-completed"}


export const taskReducer = (state: Task[], action: ACTIONTYPE) => {
    
    switch (action.type) {
        case "add-task": {
            const newTask = {
                id: state.length ? state[state.length - 1].id + 1 : 0,
                text: action.text,
                done: false
            };
            return ([...state, newTask]);
        }

        case "edit-task": {
            return state.map((task) => {
                if (task.id === action.task.id) {
                    return action.task
                } else {
                    return task
                }
            })
        }

        case "delete-task": {
            return state.filter((task) => task.id !== action.id)
        }

        case "delete-completed": {
            return state.filter((task) => !task.done)
        }

    }
}