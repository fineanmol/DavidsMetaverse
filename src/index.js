import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import './styles.css'
import { App } from './App'
import { ResponsiveAppBar } from './Navbar'
import { Overlay } from './Overlay'

createRoot(document.getElementById('root')).render(

<>
    <App />
    {/* 
    <ResponsiveAppBar/> */}
</>


)
