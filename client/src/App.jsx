import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import Dashboard from './pages/Dashboard/Dashboard'
import Protected from './components/Protected/Protected'
import { useContext } from 'react'
import AppContext from './AppContext'

function App() {

  const { isAuth, setAuth } = useContext(AppContext);


  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard/*' element={
          <Protected
            page={< Dashboard />}
          />
        } />
      </Routes>

    </>
  )
}

export default App
