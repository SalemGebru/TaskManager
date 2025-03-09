import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter ,Router,Routes,Route} from 'react-router'
import store from './store.js'
import {Provider} from 'react-redux';

import './index.css'
import App from './App.jsx'

import Login from './components/login.jsx';
import Task from './components/task.jsx'
import CreateTaskPage from './components/createTask.jsx';
import NotFound from './components/notfound.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/tasks" element={<Task/>}/>
      <Route path="/createtasks" element={<CreateTaskPage/>}/>
      <Route path="*" element={<NotFound/>}/>

    </Routes>
  </BrowserRouter>
  </Provider>
  ,
)
