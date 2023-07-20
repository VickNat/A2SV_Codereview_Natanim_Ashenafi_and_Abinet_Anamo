import { useState } from 'react';
import './App.css';
import Display from "./components/Display";

const App = () => {
  const [todoInput, setTodoInput] = useState("")
  const [allTasks, setAllTasks] = useState([])
  const [tasksToDisplay, setAllTasksToDisplay] = useState([])

  const handleTodoInput = (event) => {
    setTodoInput(event.target.value)
  }

  const handleNewTask = (event) => {
    event.preventDefault()

    const taskObj = {
      task: todoInput,
      checked: false
    }

    setAllTasksToDisplay(allTasks.concat(taskObj))
    setAllTasks(allTasks.concat(taskObj))
    setTodoInput('')
  }

  const handleDisplay = (event, button) => {
    event.preventDefault()

    switch(button){
      case 'button1':
        setAllTasksToDisplay(allTasks.map((task) => task))
        break
      case 'button2':
        setAllTasksToDisplay(allTasks.filter((task) => task.checked === true))
        break
      case 'button3':
        setAllTasksToDisplay(allTasks.filter((task) => task.checked === false))
        break
    }
  }

  const handleDelete = (event, index) => {
    event.preventDefault()
    const deleted = allTasks.filter((task, i) => i !== index)

    setAllTasks([...deleted])
    setAllTasksToDisplay([...deleted])
  }

  const handleEdit = (event, index) => {
    event.preventDefault()

    setTodoInput(allTasks[index].task)
    handleDelete(event, index)
  }

  console.log(allTasks)

  return (
    <div className="container" >
      <h1 className="header">Todo List App</h1>
      <form onSubmit={handleNewTask} >
        <input 
          className="input-label"
          value={todoInput}
          onChange={handleTodoInput}
        />
        <button className="button" type="submit" >Add Task</button>
      </form>

      <div className="buttons-container">
        <button className="button" onClick={(event) => handleDisplay(event, 'button1')} >All tasks</button>
        <button className="button" onClick={(event) => handleDisplay(event, 'button2')} >Complete tasks</button>
        <button className="button" onClick={(event) => handleDisplay(event, 'button3')} >Incomplete tasks</button>
      </div>

      <div className="display-container">
        <Display handleEdit={handleEdit} handleDelete={handleDelete} tasksToDisplay={tasksToDisplay} />
      </div>
    </div>
  );
}

export default App;
