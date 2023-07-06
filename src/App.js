import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeAdded from './Components/Home/HomeAdded';
import HomeEdit from './Components/Home/HomeEdit';
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import CreateBlog from './Components/blog/CreateBlog';
import EditBlog from './Components/blog/EditBlog';
import CreateCareer from './Components/career/CreateCareer';
import EditCareer from './Components/career/EditCareer';
import AddPeople from './Components/people/AddPeople';
import EditPeople from './Components/people/EditPeople';
import Edit from './Components/users/Edit';
import WorkAdded from './Components/work/WorkAdded';
import Blog from './Pages/Blog';
import Career from './Pages/Career';
import Home from "./Pages/Home";
import NoPage from "./Pages/NoPage";
import People from './Pages/People';
import Users from './Pages/Users';
import Work from './Pages/Work';
import WorkEdit from './Components/work/WorkEdit';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='home-added' element={<HomeAdded />} />
            <Route path='home-edit/:id' element={<HomeEdit />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work-added" element={<WorkAdded />} />
            <Route path="/work-edit/:id" element={<WorkEdit />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
            <Route path='users' element={<Users />} />
            <Route path='users-edit/:id' element={<Edit />} />
            <Route path='people' element={<People />} />
            <Route path='add-people' element={<AddPeople />} />
            <Route path='edit-people/:id' element={<EditPeople />} />
            <Route path='career' element={<Career />} />
            <Route path='create-career' element={<CreateCareer />} />
            <Route path='edit-career/:id' element={<EditCareer />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
