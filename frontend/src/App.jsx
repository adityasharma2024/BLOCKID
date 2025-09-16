// export { default } from './pages/Dashboard.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Create from './pages/Create';
// ...other imports...

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        {/* ...other routes... */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;