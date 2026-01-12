import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginUser } from "../redux/registerSlice"; 


const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const registeredUsers = useSelector(state => state.users.registeredUsers);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  });

  const onSubmit = (formData) => {
    const user = registeredUsers.find(
      (user) =>
        user.username === formData.username &&
        user.password === formData.password
    );

    if (!user) {
      alert("Invalid username or password");
      return;
    }
    else{
      navigate('/recipe-dashboard')
    }
  };

  return (
    <div className="main-body">
      <form className="reg-container" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>

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
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />


        <Button type="submit" variant="contained">
          Login
        </Button>

        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}
