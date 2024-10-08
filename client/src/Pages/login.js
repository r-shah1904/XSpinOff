import React, {useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import "../App.css"
import * as Yup from "yup"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {authContext} from "../helpers/authContext"

function Login() {
  let navigate = useNavigate();
  const {setauthState} = useContext(authContext)
    const initialValues = {
        username:"",
        password:"",
    };
    const validationSchema = Yup.object().shape({
        username:  Yup.string().min(3).max(15).matches(/^@/, "Username must start with @").required("*required"),
        password: Yup.string().required("you must enter a password")
    })
    const handleSubmit = (data) => {
      axios.post("http://localhost:8000/auth/login", data)
        .then((response) => {
          if(response.data.error) alert(response.data);
          else{
            localStorage.setItem("accessToken", response.data.token);
            setauthState({
              username: response.data.username,
              id: response.data.id,
              status:true
            })
            navigate("/")
          }  
        })
    };
    
  return (
    <div className='createPostPage'>
      <div><h1>LOGIN</h1></div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form className='formContainer'>
            <label>Username: </label>
                  <ErrorMessage name="username" component="span"/>
                  <Field 
                  id="inputCreatePost" 
                  name="username"
                  placeholder="Enter the username"/>
            <label>Password: </label>
                  <ErrorMessage name="password" component="span"/>
                  <Field 
                  id="inputCreatePost" 
                  name="password" 
                  placeholder="Enter the password"
                  />
            <button type='submit'>Login</button>
          </Form>
        </Formik>
    </div>
  )
}

export default Login
