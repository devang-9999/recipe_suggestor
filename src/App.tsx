import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './register/Register';
import Login from './login/Login';
import RecipyDashboard from './recipy_dashboard/RecipyDashboard';
import RecipeDetails from "./recipeDetails/RecipeDetails"
import Cuisine from './cuisine/Cuisine';
import ProtectedRoute from "./ProtectedRoute";

function App() {

  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Login/>}/>
         <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
          path="/recipe-dashboard"
          element={
            <ProtectedRoute>
              <RecipyDashboard />
            </ProtectedRoute>
          }/>
           <Route
          path="/recipe/:id"
          element={
            <ProtectedRoute>
              <RecipeDetails />
            </ProtectedRoute>
          }
        />
          <Route path="/cuisine/:type" element={<Cuisine />} />
          <Route path="/recipe-dashboard" element={<RecipyDashboard/>}/>
      </Routes>  
  </BrowserRouter>
  )
}

export default App
