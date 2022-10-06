import axios from "axios";
import React from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/users/login/",
        data
      )
      .then((res) => {
        localStorage.setItem('token', res.data.data.token)
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response?.status === 404) {
          alert("invalid credentials");
        } else {
          console.log(error.response);
        }
      });

    reset({
      email: "",
      password: "",
    });
  };
  4;
  return (
    <div className="login-App">
      <div className="formContainer">
        <h1>LOGIN</h1>
        <div className="login-test-data">
          <h3>test data</h3>
          <div className="login-test-email"><h5>EMAIL:</h5> <p>cande@gmail.com</p></div> 
          <div><h5>password:</h5> <p>cande1234</p> </div>
        </div>
        <Form
          style={{ width: "500px", textAlign: "start" }}
          onSubmit={handleSubmit(submit)}
        >
          <Form.Group className="mb-3" >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="name@example.com"
              {...register("email")}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              {...register("password")}
            />
          </Form.Group>

          <button className="login-bttn">LOGIN</button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
