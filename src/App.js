import './App.css';
import Main from './pages/Main.jsx'
import AddList from './pages/AddList';
import { Routes, Route, Link } from 'react-router-dom'



function App() {
  return (
    
    <div className="App">
      
    <Routes>
      <Route path="/" element={ <AddList/> } />
      <Route path="/showtodo" element={ <Main/>} />
      {/* <Route path="/showtodo/:id" element={<Main/>} /> */}
      <Route path='*' element={<div>없는페이지입니다 홈으로 돌아가주세요<Link to={'/'}>home</Link></div> }></Route>
    </Routes>
      
    </div>
    
  );
}

export default App;
