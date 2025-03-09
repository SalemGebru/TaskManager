import { useEffect, useState } from "react";
import { setTasks, setTitle, setDescription, setDue, setStatus, editTask, setFilterPending, setFilterCompleted, fetchTasks, deleteTask } from "../features/taskSlice";
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

    const handleSaveChanges = (task) => {
        dispatch(editTask({ ...task, ...editedTask }));
        setEditTaskId(null); 
        alert('Changes have been saved');
        return;
    }

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
                                <input type="text" placeholder="Title" defaultValue={task.title} onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })} />
                            ) : task.title}
                        </div>
                        <div className="taskDescription">
                            {editTaskId === task.id ? (
                                <input type="text" placeholder="Description" defaultValue={task.description} onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })} />
                            ) : task.description}
                        </div>
                        <div className="taskStatus">
                            {editTaskId === task.id ? "" : task.status ? "Pending" : "Completed"}
                        </div>
                        <div className="taskDue">
                            DUE: {editTaskId === task.id ? (
                                <input type="date" defaultValue={task.due} onChange={(e) => setEditedTask({ ...editedTask, due: e.target.value })} />
                            ) : task.due}
                            <div className="icons">
                            <button>
                                <FontAwesomeIcon icon={task.status ? faCircleNotch : faCircleCheck} onClick={() => handleStatusToggle(task)} />
                            </button>
                            <button onClick={() => setEditTaskId(task.id)}>
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button onClick={() => handleDeleteTask(task)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            
                        </div>
                        </div>
                        
                        
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/createtasks')}>Create New Task</button>
        </div>
    )
}