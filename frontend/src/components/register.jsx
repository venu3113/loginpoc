import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Register() {

    const navigate = useNavigate()
    const [form,setForm]=useState({
        fname:"",
        lname:"",
        email:"",
        password:""
    });
    const fnameRef = useRef(null)
    const lnameRef = useRef(null)
    const emailRef= useRef(null)
    const passwordRef = useRef(null)

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }

    const register=async(e)=>{

        e.preventDefault();
        console.log(form);
        if (
        !form.fname.trim() ||
        !form.lname.trim() ||
        !form.email.trim() ||
        !form.password.trim()
        ) 
        {
        alert("All fields are required.");
        return;
        }
    
        if (!form.fname.trim()) {
            alert("First Name is required");
            fnameRef.current.focus();
            return;
            }

        if (!form.lname.trim()) {
            alert("Last Name is required");
            lnameRef.current.focus();
            return;
        }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(form.email)) {
            alert("Enter a valid email.");
            setForm({...form,email:""})
            emailRef.current.focus()
            return;
        }

    console.log(form.password);

    // const passwordPattern = /^(?=.*[a-b])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*]).{8,}$/ #mistake
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


    console.log(passwordPattern.test(form.password));

    if (!passwordPattern.test(form.password)){
        alert("enter valid password");

        setForm({
            ...form,password:""
        })
        passwordRef.current.focus()
        return;
    }

    try {

        const res = await api.post("/register", form);

        alert(res.data.message);

    } catch {

        alert("Registration Failed");

    }
    }

    return(
        <>
            <form onSubmit={register}>
            <h2>REGISTER</h2>

            <div>
                <input
                ref= {fnameRef}
                name="fname"
                placeholder="First Name"
                onChange={handleChange}
                />
            </div>

            <div>
                <input
                ref={lnameRef}
                name="lname"
                placeholder="Last Name"
                onChange={handleChange}
                />
            </div>

            <div>
                <input
                ref={emailRef}
                name="email"
                placeholder="Email"
                onChange={handleChange}
                />
            </div>

            <div>
                <input
                ref={passwordRef}
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
            <p>if you have an account then </p><button  onClick={() => navigate("/")}>Login</button>
            </div>
        </>

    );

}

export default Register;