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
import Blog from './Pages/Blog';
import Edit from './Pages/Edit';
import Home from "./Pages/Home";
import NoPage from "./Pages/NoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='home-added' element={<HomeAdded />} />
            <Route path='home-edit/:id' element={<HomeEdit />} />
            <Route path='edit/:id' element={<Edit />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
            <Route path='users' element={<Home />} />
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
