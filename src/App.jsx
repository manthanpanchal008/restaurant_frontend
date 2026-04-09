import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'sonner'


function App() {
  return (<>
    <Toaster position="bottom-right" toastOptions={{
        style: { background: "#d4a762", color: "white" }}} />
    <BrowserRouter>
     <AppRoutes/>
    </BrowserRouter>
    </>
  )
}

export default App
