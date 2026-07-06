import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login(){

    const navigate=useNavigate();

    const [email,setEmail]=useState("");

    const [password,setPassword]=useState("");

    const login=async(e)=>{
        e.preventDefault();

        try{

          const res = await api.post("/login", {
            email,
            password
          });

          console.log("res",res)
            if (res.data.success) {
              navigate("/home");
            } else {
            alert(res.data.message);
            }

          }

        catch{

            alert("Invalid Credentials");

        }

    }

    return(

        <>

        <form onSubmit={login} method="post">
          <h2>LOGIN</h2>
          <div>
            <input
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

        <div><button type="submit">
        Login
        </button></div>
        </form>
        <div>
          <p>if you don't have an account then </p><button  onClick={() => navigate("/register")}>Register</button>
        </div>

        </>

    )

}

export default Login;