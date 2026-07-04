import { useState } from "react";
import api from "../api";

function Register() {

    const [form,setForm]=useState({
        fname:"",
        lname:"",
        email:"",
        password:""
    });

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }

    const register=async(e)=>{
        e.preventDefault();

        const res=await api.post("/register",form);

        alert(res.data.message);
    }

    return(

        <form onSubmit={register}>
        <h2>REGISTER</h2>

        <div>
            <input
            name="fname"
            placeholder="First Name"
            onChange={handleChange}
            />
        </div>

        <div>
            <input
            name="lname"
            placeholder="Last Name"
            onChange={handleChange}
            />
        </div>

        <div>
            <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            />
        </div>

        <div>
            <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            />
        </div>
        <div><button type="submit">
        Register
        </button>
        </div>

        </form>

    );

}

export default Register;