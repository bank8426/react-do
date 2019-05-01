import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

const App = () =>{
  const [count,setCount] = useState(0);
  const [taskList ,setTaskList] = useState([]);
  const [inputTaskText ,setInputTaskText] = useState("");
  const [inputTaskFinish ,setInputTaskFinish] = useState(false);
  const updateTaskFinish = (index,value) =>{
      setTaskList([
        ...taskList.slice(0,index),
        Object.assign({}, taskList[index], { isFinish: value }),
        ...taskList.slice(index+1)
    ]);
  }

  const increaseCount = () =>{
    setCount(count+1);
    console.log(count);
  }

  const addTask = () =>{
    setTaskList([
      ...taskList.slice(),
      Object.assign({},{text : inputTaskText,isFinish : inputTaskFinish , id :count}),
    ]);
    setInputTaskText("");
    setInputTaskFinish(false);
    increaseCount();
  }

  const removeTask = (index) =>{
    console.log(index)
    setTaskList([
      ...taskList.filter(task => task.id !== index)
    ]);
  }
  
  //useEffect(() => setTaskList(taskList => taskList), [taskList]);

  return (
    <div>
      <h1>Hello Gu Do</h1>
      <InputTask 
        inputTaskFinish = {inputTaskFinish}
        setInputTaskFinish = {setInputTaskFinish}
        inputTaskText = {inputTaskText}
        setInputTaskText = {setInputTaskText}
        addTask = {addTask}
      />
      
      <TaskList 
        taskList={taskList} 
        updateTaskFinish={updateTaskFinish} 
        removeTask={removeTask}/>
    </div>
  );
};

const InputTask = ({inputTaskFinish,setInputTaskFinish,inputTaskText,setInputTaskText,addTask}) =>{
  return (
      <label>Input your task : 
        <input type="checkbox" checked={inputTaskFinish} onChange={event => setInputTaskFinish(event.target.checked)}/>
        <input type="text" placeholder="Please add task" value={inputTaskText} onChange={event => setInputTaskText(event.target.value)}/>
        
        <button type="button" onClick={addTask}>Add</button>
      </label>
  );
}

InputTask.propTypes = {
  inputTaskText: PropTypes.string.isRequired,
  inputTaskFinish: PropTypes.bool.isRequired,
};


const TaskList = ({taskList,updateTaskFinish,removeTask}) =>{
  return (
    <div>
      <h1>Your task List : </h1>

      <ol>
        {taskList.map((task,index) => (
          <li key={index}>
            <input type="checkbox" 
              checked={task.isFinish} 
              onChange={event => updateTaskFinish(index,event.target.checked)}/> 
            {task.text}
            <button type="button" onClick={event => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

TaskList.propTypes = {
  taskList: PropTypes.array.isRequired
};

export default App;
