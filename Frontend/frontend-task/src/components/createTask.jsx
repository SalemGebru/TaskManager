import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {setTasks,setTitle,setDescription,setDue,setStatus,setCreatedBy,addTask} from '../features/taskSlice';
export default function CreateTaskPage(){
    const {tasks,title,description,due,status,created_by}=useSelector((state)=>state.task);
    const currentUser=useSelector((state) => state.user.id);
    const dispatch=useDispatch();


    
    const handleAddTask=(e)=>{
        e.preventDefault();
        console.log('clicked');
        const newTask={
            title:title,description:description,status:true,due:due,created_by:10
        }
        console.log(newTask);
        dispatch(addTask(newTask));    
    }
    return(
        <div className="createTask">
            <form onSubmit={handleAddTask} >
                <h1>Add Task</h1>
            <input type="text" id="title" placeholder="title" onChange={(e) => dispatch(setTitle(e.target.value))}></input>
            <input type="text" id="description" placeholder="description" onChange={(e) => dispatch(setDescription(e.target.value))}></input>
            <input type="date" id="due" placeholder="Due" onChange={(e) => dispatch(setDue(e.target.value))}></input>
            <button type="submit">Add task</button>
            </form>
            
        </div>
    )
}