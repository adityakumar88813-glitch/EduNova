import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Navbar from './components/common/Navbar';
import Catalog from "./pages/Catalog"
import CourseDetails from './pages/CourseDetails';
function App() {
  return (
   <div className='w-full  min-h-screen overflow-y-auto bg-richblack-900 flex flex-col font-inter'>
   <Navbar/>
       <Routes>
        <Route path="/" element={<Home/>}/>
         <Route path="catalog/:categories" element={<Catalog/>}/>
          <Route path="courses/:coursesId" element={<CourseDetails/>}/>
       </Routes>       
   </div>
  );
}

export default App;

//...