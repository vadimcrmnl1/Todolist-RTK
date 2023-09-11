import React from "react";
import {TodolistDomainType} from "features/todolists-list/todolists/model/todolists.reducer";
import {TaskType} from "features/todolists-list/tasks/api/tasks.api.types";
import {Task} from "features/todolists-list/tasks/ui/Tasks/Task/Task";
import {TaskStatuses} from "common/enums";
type TasksProps = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

export const Tasks: React.FC<TasksProps> = ({todolist, tasks}) => {
    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return (
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}
                />)
            }
        </div>
    )
}