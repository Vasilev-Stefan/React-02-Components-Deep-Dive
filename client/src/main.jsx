import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../src/index.css'

createRoot(document.getElementById('root')).render(
    <div>
        <App />
        <App />
    </div>
)
