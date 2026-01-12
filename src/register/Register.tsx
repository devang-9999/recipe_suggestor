import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/registerSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import "./Register.css";
import Button from '@mui/material/Button';
import React from "react";

const registerUserSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Register() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(state => state.users.registeredUsers);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      
    },
  });


  const onSubmit = (formData) => {
    const userExists = users.some(
      (user) => ( user.email === formData.email && user.username=== formData.username)
    );

    if (userExists) {
      alert("User already registered with this email");
      return;
    }

    dispatch(registerUser(formData));
    reset();
    navigate("/login");
  };

  return (
    <div className="main-body">
      <form className="reg-container" onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>

       
        <TextField
          inputProps={{
        style: {
         width:"220px"
        },
      }}
          label="Username"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

       
        <TextField
          inputProps={{
        style: {
         width:"220px"
        },
      }}
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        
        <TextField
          inputProps={{
        style: {
         width:"220px"
        },
      }}
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
       

        <Button type="submit" variant="contained">Register</Button>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}
