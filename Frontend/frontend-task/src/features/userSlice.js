import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

export const signUp=createAsyncThunk(
    'user/registerUser',
    async(formData,{rejectWithValue})=>{
        try{
            console.log('trying...');
            const csrfTokenResponse=await axios.get('http://localhost:8000/csrf-token');
            const csrfToken=csrfTokenResponse.data;
            
            console.log(csrfToken);

            const response=await axios.post('http://localhost:8000/api/register',{
                name:formData.username,
                email:formData.email,
                password:formData.password
            },{
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'X-CSRF-TOKEN':csrfToken
                }
            });
            if(response.status==201){
            const token=response.data.token;
            localStorage.setItem('jwtToken',token);
                console.log('succeed');
                alert('You have been registered');
                return response.data;
            }
            else{
                console.log('fail');
                alert('Registration failed');
                return rejectWithValue('Registration failed');
            }
        }catch(error){

                if(error.response){
                    console.log(error.response.data.message);
                    alert(error.response.data.message||'Registration failed');
                    return rejectWithValue(error.response.data.message||'Registration failed');
                }
                return rejectWithValue(error.message);
        }
    }
);

export const login=createAsyncThunk(
    'user/loginUser',
    async(formData,{rejectWithValue})=>{
        try{
            console.log('trying');
            const csrfTokenResponse=await axios.get('http://localhost:8000/csrf-token');
            const csrfToken=csrfTokenResponse.data;
            
            console.log(csrfToken);

            const response=await axios.post('http://localhost:8000/api/login',{
                name:formData.username,
                password:formData.password
            },
            {headers:
                {
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'X-CSRF-TOKEN':csrfToken
                }

            });
            const token=response.data.token;
            localStorage.setItem('jwtToken',token);
            if(response.status==201){
                alert('You are logged in');
                 return response.data;
            }
            else{
                console.log(response.data.message);
                console.log('Login failed');
                alert(response.data.message);
                return rejectWithValue('Login failed');
            }
            
        }catch(error){
            if(error.response){
                console.log(error.response.data.message||'Login failure');
                alert(error.response.data.message||'Login failure');
                rejectWithValue(error.response.data.message||'Login failure');
            }
            else{
                console.log(error.message);
                alert(error.message);
                rejectWithValue(error.message);
            }
        }
    }
);

const userSlice=createSlice({
    name:'user',
    initialState:{
        id:null,
        username:'',
        email: '',
        password: '',
        confPassword: '',
        validUsername: false,
        validEmail: false,
        validPassword: false,
        validConfPassword: false,
        usernameFocus:false,
        emailFocus:false,
        passwordFocus:false,
        confPasswordFocus:false,
        loading: false,
        error: null,
        registered: false,
        logged:false,
    },
    reducers:{
        setUsername:(state,action)=>{state.username=action.payload;},
        setEmail:(state,action)=>{state.email=action.payload;},
        setPassword:(state,action)=>{state.password=action.payload;},
        setConfPassword:(state,action)=>{state.confPassword=action.payload;},
        setValidUsername:(state,action)=>{state.validUsername=action.payload;},
        setValidEmail:(state,action)=>{state.validEmail=action.payload;},
        setValidPassword:(state,action)=>{state.validPassword=action.payload;},
        setValidConfPassword:(state,action)=>{state.validConfPassword=action.payload;},
        setUsernameFocus:(state,action)=>{state.usernameFocus=action.payload;},
        setEmailFocus:(state,action)=>{state.emailFocus=action.payload;},
        setPasswordFocus:(state,action)=>{state.passwordFocus=action.payload;},
        setConfPasswordFocus:(state,action)=>{state.confPasswordFocus=action.payload;},
        setTasks:(state,action)=>{state.tasks=action.payload;}

    },
    extraReducers:(builder)=>{
        builder
        .addCase(signUp.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            state.loading=false;
            state.registered=true;
            state.id = action.payload.user?.id ?? null;
        })
        .addCase(signUp.rejected,(state,action)=>{
            state.loading=false;
            state.registered=false;
            state.error=action.payload;
        })
        .addCase(login.pending,(state)=>{
            state.loading=true;
            state.logged=false;
            state.error=null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.logged=true
            state.loading=false;
            state.id = action.payload.user?.id ?? null;
            
            
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.logged=false;
            state.error=action.payload;
        })
        ;
    }
});




export const {setUsername,setEmail,setPassword,setConfPassword,setValidUsername,setValidEmail,setValidPassword,setValidConfPassword,setUsernameFocus,setEmailFocus,setPasswordFocus,setConfPasswordFocus}=userSlice.actions;


export default userSlice.reducer;

