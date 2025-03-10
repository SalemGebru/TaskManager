
import { useSelector,useDispatch } from "react-redux";
import {setTitle,setDescription,setDue,addTask} from '../features/taskSlice';
export default function CreateTaskPage(){
    const {title,description,due}=useSelector((state)=>state.task);
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