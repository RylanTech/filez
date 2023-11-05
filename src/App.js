import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Upload from './pages/Upload';
import Loginpage from './pages/Loginpage';
import Indexing from './pages/IndexingPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/upload' element={<Upload/>}/>
          <Route path='/login' element={<Loginpage/>}/>
          <Route path='/indexing' element={<Indexing/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
