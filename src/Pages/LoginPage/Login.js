import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AlertComp from "../../Components/Alert.js";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const Signup = ({ setAlert, setValue }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  const handleChange = (e) => {
    // console.log("name",e.target.name);
    // console.log("value",e.target.value);
    let name = e.target.name;
    let value = e.target.value;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else {
      setPass(value);
    }
  };

  const handleSubmit = (e) => {
    let res = axios.get(
      "http://localhost:9090/setuser?name=" +
        name +
        "&password=" +
        pass +
        "&email=" +
        email
    );
    if (res) {
      setAlert({ type: "success", message: "User successfully registered" });
      setTimeout(() => {
        setValue("two");
      }, 2000);
    } else {
      setAlert({ type: "error", message: "User not registered" });
    }
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={pass}
          onChange={handleChange}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Signup
        </button>
      </div>
    </form>
  );
};
const Signin = ({setAlert}) => {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log("name",e.target.name);
    // console.log("value",e.target.value);
    let name = e.target.name;
    let value = e.target.value;
    if (name === "email") {
      setEmail(value);
    } else {
      setPass(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await axios.get(
      "http://localhost:9090/signinuser?email=" + email + "&password=" + pass
    );
    if (res.data === "admin") {
      setAlert({ type: "success", message: "Admin Signin Successful" });
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } else if (res.data === "user") {
      setAlert({ type: "success", message: "User Signin Successful" });
      setTimeout(() => {
        navigate("/user");
      }, 2000);
    } else {
      setAlert({ type: "error", message: "Invalid credentials" });
    }
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={pass}
          onChange={handleChange}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Signin
        </button>
      </div>
    </form>
  );
};

const Login = () => {
  const [value, setValue] = React.useState("one");
  const [alert, setAlert] = React.useState({
    type: "",
    message: "",
  });

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container mt-5">
      <Card sx={{ maxWidth: 500 }} className="mx-auto">
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="text-center"
          >
            StockPro
          </Typography>
          {alert.message && (
            <AlertComp
              type={alert.type}
              message={alert.message}
              setAlert={setAlert}
            />
          )}
          <Box sx={{ width: "100%" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab value="one" label="Signup" />
              <Tab value="two" label="Signin" />
            </Tabs>
            <br />
            {value === "one" && (
              <Signup setAlert={setAlert} setValue={setValue} />
            )}
            {value === "two" && <Signin setAlert={setAlert} />}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
