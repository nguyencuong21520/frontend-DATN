import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { USER } from "./global/enum";
import { useGetUser } from "./utils/Hook";
// import { AuthProtect } from './components/AuthProtect';
import { Layout } from "./components/layout";
import { Cources } from "./components/Courses";
import { LayoutAuth } from "./components/LayoutAuth";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ForgotPassword } from "./components/ForgotPassword";
import { ResetPassword } from "./components/ForgotPassword/ResetPassword";
import { Home } from "./components/Home";
import { ErrorPage } from "./components/Err";
import Messenger from "./components/Messenger";
import DetailCourse from "./components/Courses/DetailCourse";
import { PracticeScorm } from "./components/PracticeScorm";
import { MangerCourses } from "./components/ManagerCoures";
import { Hello } from "./components/Hello";
import { MangerDetailCourse } from "./components/ManagerCoures/DetailCourse";
import { MyProfile } from "./components/MyProfile";
import { Setting } from "./components/Setting";
import { Dashboard } from "./components/Dashboard";
import CollectionCourse from "./components/Dashboard/CollectionCourse";
import CollectionUser from "./components/Dashboard/CollectionUser";
import "./App.scss";

function App() {
  const currentUser = useGetUser();
  const navigate = useNavigate();
  return (
    <Routes>
      {/* <Route path='/' element={<AuthProtect><Layout /></AuthProtect>}> */}
      <Route path={"/"} element={<Layout />}>
        {currentUser?.role === USER.STUDENT ? (
          <>
            <Route path="" element={<Home />} />
            <Route path="cources">
              <Route path="" element={<Cources />} />
              <Route path="detail/:id" element={<DetailCourse />} />
            </Route>
            <Route path="messenger" element={<Messenger />} />
            <Route path="practice-scorm" element={<PracticeScorm />} />
          </>
        ) : currentUser?.role === USER.TEACHER ? (
          <>
            <Route path="" element={<Hello />} />
            <Route path="messenger">
              <Route path=":id" element={<Messenger />} />
            </Route>
            <Route path="manager">
              <Route path="courses" element={<MangerCourses />} />
              <Route path=":id" element={<MangerDetailCourse />} />
            </Route>
          </>
        ) : (
          <Route path="admin">
            <Route path="" element={<Hello />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="messenger" element={<Messenger />} />
            <Route path="collection">
              <Route path="courses" element={<CollectionCourse navigate={navigate} />} />
              <Route path="course/:id" element={<MangerDetailCourse />} />
              <Route path="users" element={<CollectionUser />} />
            </Route>
          </Route>
        )}
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="setting" element={<Setting />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="account" element={<LayoutAuth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
