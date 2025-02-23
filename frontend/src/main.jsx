import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext'
import InstructorProvider from './context/InstructorContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <InstructorProvider>
      <App />
    </InstructorProvider>
  </AuthProvider>
)
