import './App.css';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';
import Sidebar from './components/Sidebar';

function Main() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '240px', padding: '32px', flexGrow: 1 }}>
        <h1>Risk Dashboard</h1>
        <p>Welcome to the admin panel.</p>
      </main>
    </div>
  );
}

function List() {
  const { id, color } = useParams();
  return (
    <div style={{ backgroundColor: color }}>Vite-Risks List with id {id}</div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/settings" element={<Main />} />
      <Route path="/teams" element={<Main />} />
    </Routes>
  );
}

export default App;
