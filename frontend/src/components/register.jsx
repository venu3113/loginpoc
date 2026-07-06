import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
    const navigate = {useNavigate}
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

        if (
        !form.fname.trim() ||
        !form.lname.trim() ||
        !form.email.trim() ||
        !form.password.trim()
    ) {
        alert("All fields are required.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email)) {
        alert("Enter a valid email.");
        return;
    }

    try {

        const res = await api.post("/register", form);

        alert(res.data.message);

    } catch {

        alert("Registration Failed");

    }
        e.preventDefault();
    }

    return(
        <>
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

            <div>
            <p>if you have an account then </p><button  onClick={() => navigate("/Login")}>Login</button>
            </div>
        </>

    );

}

export default Register;