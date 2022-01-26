import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import ViewForm from './pages/ViewForm';
import GenerateForm from './pages/GenerateForm';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Reports from './pages/Reports';

function App() {
  return (
    <div className="App">
      {/* declare all route */}
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="GenerateForm" element={<GenerateForm />} />
          <Route path="ViewForm/:id" element={<ViewForm />} />
          <Route path="Reports/:formId" element={<Reports />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
