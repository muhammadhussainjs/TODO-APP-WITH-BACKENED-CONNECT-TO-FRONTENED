import React from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import DrawerAppBar from '../components/navbar'
import Todo from '../pages/todo'
import Register from '../pages/register'
import Login from '../pages/login'
const App = () => {
  return (

    <BrowserRouter>
    <DrawerAppBar/>
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="todo" element={<Todo/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App