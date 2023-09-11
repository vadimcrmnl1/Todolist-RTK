import React, {ChangeEvent} from 'react'
import {Checkbox, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {EditableSpan} from 'common/components'
import {TaskStatuses} from 'common/enums';
import {useActions} from "common/hooks/useActions";
import {tasksThunks} from "features/todolists-list/tasks/model/tasks.reducer";
import {TaskType} from "features/todolists-list/tasks/api/tasks.api.types";
import s from 'features/todolists-list/tasks/ui/Tasks/Task/Task.module.css'

type TaskPropsType = {
	task: TaskType
	todolistId: string
}

export const Task: React.FC<TaskPropsType> = React.memo(({task, todolistId}) => {
	const {removeTask, updateTask} = useActions(tasksThunks)
	const handleRemoveTask = () => removeTask({taskId: task.id, todolistId: todolistId})
	const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		updateTask({taskId: task.id, domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New}, todolistId: todolistId})
	}
	const handleChangeTitle = (newValue: string) => {
		updateTask({taskId: task.id, domainModel: {title: newValue}, todolistId: todolistId})
	}

	return <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ''}>
		<Checkbox
			checked={task.status === TaskStatuses.Completed}
			color="primary"
			onChange={handleChangeStatus}
		/>

		<EditableSpan value={task.title} onChange={handleChangeTitle}/>
		<IconButton onClick={handleRemoveTask}>
			<Delete/>
		</IconButton>
	</div>
})
