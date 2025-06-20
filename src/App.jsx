import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Blog from './Pages/Blog'


import UserLayout from './Layout/UserLayout'
import Admin from './Pages/Admin/Admin'
import Adminlayout from './Layout/Adminlayout'
import AddPost from './Pages/Admin/AddPost'
import User from './Pages/Admin/User'
import AllPost from './Pages/AllPost'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { Provider } from 'react-redux'
import { peristor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast'
import Profile from './Pages/Profile'
import ProtectedRoute from './Components/ProtectedRoute'
import { ThemeProvider } from './Context/ThemeContext'
import Contact from './Pages/Contact'
import CustomerMessage from './Pages/CustomerMessage'

export default function App() {
  return (
    
      <Provider store={store}>
        <PersistGate loading={null} persistor={peristor}>
          <ThemeProvider>
          <BrowserRouter>
            <Toaster />
          

            <Routes>

              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/contact' element={<Contact />}></Route>

              <Route path='/' element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path='blog/:postId' element={<Blog />}></Route>
                <Route path='/profile/:userId' element={<Profile />}></Route>
                <Route path='addpost' element={ <ProtectedRoute ><AddPost /> </ProtectedRoute >} />
              </Route>

              <Route path='/dashboard' element={<Adminlayout />}>
                <Route index element={<Admin />} />
                
                <Route path='users' element={<User />} />
                <Route path='allposts' element={<AllPost />} />
                
                <Route path='customer-messages' element={<CustomerMessage />} />
              </Route>

            </Routes>


          </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
   
  )
}
