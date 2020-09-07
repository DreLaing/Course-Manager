import React from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import UserDashboard from './components/user/UserDashboard'
import AdminDashboard from './components/admin/AdminDashboard'
import Navbar from './components/Navbar'
import CourseContent from './components/user/CourseContent'
import SearchResult from './components/SearchResult'
import CourseForm from './components/admin/CourseForm'
import AdminCourseContent from './components/admin/AdminCourseContent'
import AllCourses from './components/user/AllCourses'
import CreateUser from './components/admin/CreateUser'
import CompletedCourses from './components/user/CompletedCourses'
import Unauthorized from './components/Unauthorized'
import Departments from './components/admin/Departments'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path='/user/search/:searchValue' exact={true}>
            {/* <Navbar /> */}
            <SearchResult />
          </Route>
          <Route path='/user/:id/completed-courses'>
            <CompletedCourses />
          </Route>
          <Route path='/user/all-courses/:id' exact={true}>
            <AllCourses />
          </Route>
          <Route path='/user/:id/:course' exact={true}>
            <CourseContent />
          </Route>
          <Route path='/user/:id' exact={true}>
            {/* <Navbar /> */}
            <UserDashboard />
          </Route>
          <Route path='/admin' exact={true}>
            <AdminDashboard />
          </Route>
          <Route path='/admin/new-user' exact={true}>
            <CreateUser />
          </Route>
          <Route path='/admin/new-course' exact={true}>
            <CourseForm />
          </Route>
          <Route path='/admin/departments' exact={true}>
            <Departments />
          </Route>
          <Route path='/admin/:course' exact={true}>
            <AdminCourseContent />
          </Route>
          <Route path='/' exact={true}>
            <Login />
          </Route>          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
