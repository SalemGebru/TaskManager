import { useEffect, useState } from "react";
import {  setStatus, editTask, setFilterPending, setFilterCompleted, fetchTasks, deleteTask, updateTask } from "../features/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faFilter, faCircleCheck, faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function Task() {
    const { tasks, filterPending, filterCompleted } = useSelector((state) => state.task);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editedTask, setEditedTask] = useState({ title: '', description: '', due: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchTasks());
    }, []);
   

    const handleStatusToggle = (task) => {
      
        dispatch(setStatus({ id: task.id, status: !task.status }));
    }
    const handleEdit=(task)=>{
        setEditTaskId(task.id);
        setEditedTask({title:task.title,description:task.description,due:task.due});
    }

    const handleSaveChanges = (task) => {
        const updatedTask={...task,...editedTask};
        dispatch(updateTask(updatedTask));
        setEditTaskId(null); 
        return;
    }

    useEffect(()=>{
        dispatch(fetchTasks());
    },[handleSaveChanges]);
    
    const handleFilterToggle = (event) => {
        const filterVal = event.target.value;

        if (filterVal === 'all') {
            dispatch(setFilterCompleted(false));
            dispatch(setFilterPending(false));
        } else if (filterVal === 'pending') {
            dispatch(setFilterCompleted(false));
            dispatch(setFilterPending(true));
        } else if (filterVal === 'completed') {
            dispatch(setFilterCompleted(true));
            dispatch(setFilterPending(false));
        }
    }

    const handleDeleteTask = (task) => {
        dispatch(deleteTask(task.id));
        
    }
    const handleLogout=()=>{
      localStorage.removeItem('jwtToken');
      navigate('/login');
      window.location.reload(); 
    }

    return (
        <div className="taskPage">
          <button id="logout" onClick={handleLogout}>Log out</button>
            <h1>PlanPal</h1>
            <h3>Tasks</h3>
            <p><FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
            <select onChange={handleFilterToggle}>
                <option value="all"></option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
            </p>
            
            {tasks.length === 0 ? 'No task available' : ''}
            <ul>
             
                {Array.isArray(tasks) && tasks.filter(task => {
                    if (filterPending && !task.status) return false;
                    if (filterCompleted && task.status) return false;
                    return true;
                }).map((task) => (
                    <li key={task.id} className="taskList">
                        <div className="taskTitle">
                            {editTaskId === task.id ? (
                                <input type="text" placeholder="Title" value={editedTask.title} onChange={(e) => setEditedTask(prev=>({...prev,title:e.target.value}))} />
                            ) : task.title}
                        </div>
                        <div className="taskDescription">
                            {editTaskId === task.id ? (
                                <input type="text" placeholder="Description" value={editedTask.description} onChange={(e) => setEditedTask(prev=>({...prev,description:e.target.value}))} />
                            ) : task.description}
                        </div>
                        <div className="taskStatus">
                            {editTaskId === task.id ? "" : task.status ? "Pending" : "Completed"}
                        </div>
                        <div className="taskDue">
                            DUE: {editTaskId === task.id ? (
                                <input type="date" value={editedTask.due} onChange={(e) => setEditedTask(prev=>({...prev,due:e.target.value}))} />
                            ) : task.due}
                            <div className="icons">
                            <button onClick={() => handleStatusToggle(task)}>
                                <FontAwesomeIcon icon={task.status ? faCircleNotch : faCircleCheck}  />
                            </button>
                            <button onClick={() => handleEdit(task)}>
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button onClick={() => handleDeleteTask(task)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            {editTaskId===task.id?<button onClick={()=>handleSaveChanges(task)}>Save Changes</button>:""}
                            
                        </div>
                        </div>
                        
                        
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/createtasks')}>Create New Task</button>
        </div>
    )
}