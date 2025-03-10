import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchTasks=createAsyncThunk(
    'tasks/getTasks',
    async(_,{rejectWithValue})=>{
        try{
            const token=localStorage.getItem('jwtToken');
            const response=await axios.get('http://localhost:8000/api/tasks',{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });

            if(response.status==201){
                return response.data;
                }
            else{
                alert('Task fetching failed');
                return;
            }
        }catch(error){
            if(error.response){
                return rejectWithValue(error.response.data.message||'Registration failed');
            }
            return rejectWithValue(error.message);
        }
    }
);

export const addTask=createAsyncThunk(
    'tasks/createTask',
    async(formData,{rejectWithValue})=>{
        try{
            const csrfTokenResponse=await axios.get('http://localhost:8000/csrf-token');
            const csrfToken=csrfTokenResponse.data;

            const token=localStorage.getItem('jwtToken');
            const response=await axios.post('http://localhost:8000/api/tasks',{
                title:formData.title,
                description:formData.description,
                due:formData.due,
                status:formData.status,
                created_by:formData.created_by
            },{
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'X-CSRF-TOKEN':csrfToken,
                    'Authorization':`Bearer ${token}`
                }
            });

            if(response){
                alert('Task has been recorded');
                return;
            }
            else{
                alert('Failure recording task');
                return;
            }
        }catch(error){
            alert(error.response.data.message||error.message);
            return rejectWithValue(error.response.data.message||error.message);
        }
    }
)
export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async (formData, { rejectWithValue }) => {
      try {
        const csrfTokenResponse = await axios.get("http://localhost:8000/csrf-token");
        const csrfToken = csrfTokenResponse.data;
  
        const response = await axios.put(
          `http://localhost:8000/api/tasks/${formData.id}`, 
          {
            title: formData.title,
            description: formData.description,
            due: formData.due,
            status: formData.status,
            created_by: formData.created_by || formData.user?.id, 
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-CSRF-TOKEN": csrfToken,
            },
          }
        );
  
        if (response.status === 200 || response.status === 204) {
          alert("Updates have been recorded");
          return response.data; 
        } else {
          throw new Error("Task update failed");
        }
      } catch (error) {
        alert(error.response?.data?.message || error.message);
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id, { rejectWithValue }) => {
        try {
            const token=localStorage.getItem('jwtToken');
            const response = await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 201) { 
                alert('Delete successful');
                return id; 
            } else {
                alert('delete failed');
                return;
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
                return rejectWithValue(error.response.data.message || 'Deletion failed');
            }
            return rejectWithValue(error.message);
        }
    }
);
const taskSlice=createSlice({
    name:'tasks',
    initialState:{
        tasks:[],
        title:null,
        description:null,
        due:null,
        status:false,
        created_by:null,
        filterPending:false,
        filterCompleted:false,
        
    },
    reducers:{
        setTasks:(state,action)=>{state.tasks=action.payload;},
        setTitle:(state,action)=>{state.title=action.payload;},
        setDescription:(state,action)=>{state.description=action.payload;},
        setDue:(state,action)=>{state.due=action.payload;},
        setStatus:(state,action)=>{
            const {id,status}=action.payload
            const task=state.tasks.find(t=>t.id===id);
            if(task){
                task.status=status;
            }
        },
        setCreatedBy:(state,action)=>{state.created_by=action.payload;},
        setFilterPending:(state,action)=>{state.filterPending=action.payload;},
        setFilterCompleted:(state,action)=>{state.filterCompleted=action.payload},
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload); 
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchTasks.fulfilled,(state,action)=>{
            state.tasks=action.payload.data;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            console.error('Failed to fetch tasks:', action.error.message);
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            
            state.tasks = state.tasks.filter(task => task.id !== action.payload); 
        });

    }

});
export const {setTasks,setTitle,setDescription,setDue,setStatus,editTask,setCreatedBy,setFilterPending,setFilterCompleted}=taskSlice.actions;
export default taskSlice.reducer;