import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Upload from './pages/Upload';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/upload' element={<Upload/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
