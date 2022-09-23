import { useEffect, useState } from 'react'
import Task from './Task'
import TaskForm from './TaskForm'

const TaskList = () => {
	const [tasks, setTasks] = useState([])

	const addTask = newTask => {
		const updatedTasks = [newTask, ...tasks]

		setTasks(updatedTasks)

		window.localStorage.setItem('tasks', JSON.stringify(updatedTasks))
	}

	const editTask = (id, newTask) => {
		const updatedTasks = tasks.map(task => {
			if (task.id === id) {
				task.title = newTask.title
				task.description = newTask.description
			}
			return task
		})

		setTasks(updatedTasks)

		window.localStorage.setItem('tasks', JSON.stringify(updatedTasks))
	}

	const deleteTask = id => {
		const updatedTasks = tasks.filter(task => task.id !== id)

		setTasks(updatedTasks)

		window.localStorage.setItem('tasks', JSON.stringify(updatedTasks))
	}

	const completeTask = id => {
		const updatedTasks = tasks.map(task => {
			if (task.id === id) {
				task.completed = !task.completed
			}
			return task
		})

		setTasks(updatedTasks)

		window.localStorage.setItem('tasks', JSON.stringify(updatedTasks))
	}

	useEffect(() => {
		const savedTasks = JSON.parse(window.localStorage.getItem('tasks'))

		if (savedTasks) setTasks(savedTasks)
	}, [])

	return (
		<div className="flex flex-col gap-4">
			<TaskForm addTask={addTask} />

			<div className="flex flex-col gap-2 p-4 bg-white rounded-lg">
				{tasks.length ? (
					tasks.map(task => (
						<Task
							key={task.id}
							id={task.id}
							title={task.title}
							description={task.description}
							completed={task.completed}
							editTask={editTask}
							deleteTask={deleteTask}
							completeTask={completeTask}
						/>
					))
				) : (
					<div className="border-dotted px-4 py-4 border-4">
						<p className="text-black/40 break-words leading-none font-semibold text-lg transition">
							Enter a new task
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default TaskList
