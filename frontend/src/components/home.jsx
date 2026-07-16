import "./Home.css";
import api from "../api";
import { useState } from "react";
import { useEffect } from "react";

function Home() {

    const [employees,setEmployee] = useState({
        emp_name:"",
        department:"",
        joining_date:"",
        salary:"",
        location:""
    })
    const handleChange = (e) => {
    setEmployee({
        ...employees,
        [e.target.name]: e.target.value
        });
    };

    const addEmployee = async (e) => {

    e.preventDefault();

    console.log("Add Employee button clicked");

    const token = localStorage.getItem("token");

    console.log(employees);
    console.log("editId before save:", editId);

    try {

        if(editId){
            console.log("Updating Employee ID:", editId);
     await api.put(`/employee/${editId}`,employees,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        );
        }
        else{

            await api.post(
                "/employee",
                employees,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
                );
            }
        getEmployees();   
        setShowForm(false);     
        setEditId(null);

        setEmployee({
            emp_name: "",
            department: "",
            joining_date: "",
            salary: "",
            location: ""
        });
        if(editId){
            alert("Employee Updated Successfully");
        }
        else{
            alert("Employee Added Successfully");
        }

    } 
        catch (err) {

        console.log(err);
        alert("Error while adding employee");

        }

    };

    const [employeeList,setemployeelist] = useState([]);
    const getEmployees =async ()=>{
        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/employee", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setemployeelist(res.data);

        } catch (err) {

            console.log(err);

        }
    };


    useEffect(()=>{getEmployees()},[]);

    const [showForm,setShowForm] = useState(false)

    const [editId,setEditId] = useState(null);

    const handleEdit = (emp)=> {
        
        console.log("Editing Employee:", emp);

        setEmployee({
            emp_name:emp.emp_name,
            department:emp.department,
            joining_date: new Date(emp.joining_date).toISOString().split("T")[0],
            salary:emp.salary,
            location:emp.location
        });
        setEditId(emp.emp_id);
        console.log("Edit ID:", emp.emp_id);
        setShowForm(true);
    }


    const handleDelete = async (id) => {

    if (!window.confirm("Delete this employee?")) {
        return;
    }

    try {

        const token = localStorage.getItem("token");

        await api.delete(`/employee/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        getEmployees();

        alert("Employee Deleted Successfully");

    } catch (err) {

        console.log(err);

    }
    };



    return (
        <>
            <div className="container">
                <h1>Welcome to Homepage</h1>
            <div className="header">

            <h2>Employees Details</h2>

            <button className="add-btn"
            onClick={() => {

                setEmployee({
                    emp_name:"",
                    department:"",
                    joining_date:"",
                    salary:"",
                    location:""
                });

                setEditId(null);

                setShowForm(true);

            }}
            >
            Add Employee
            </button>
            </div>
            </div>
            {showForm && (
                <div className="overlay">
                    <div className="popup">
                <form onSubmit={addEmployee}>
                <div>
                    <label>Employee Name:</label>
                    <input 
                    type="text" 
                    name="emp_name"
                    value={employees.emp_name}
                    onChange={handleChange}  
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <input 
                    type="text"
                    name="department"
                    value={employees.department}
                    onChange={handleChange} />
                </div>
                <div>
                    <label>Joining date:</label>
                    <input 
                    type="date"
                    name="joining_date"
                    value={employees.joining_date}
                    onChange={handleChange} />
                </div>
                <div>
                    <label>salary:</label>
                    <input 
                    type="number"
                    name="salary"
                    value={employees.salary}
                    onChange={handleChange} />
                </div>
                <div>
                    <label>location:</label>
                    <input 
                    type="text"
                    name="location"
                    value={employees.location}
                    onChange={handleChange} />
                </div>
                <div className="popup-buttons">
                    <button type="submit">
                    {editId ? "Update Employee" : "Save Employee"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}>
                    Cancel
                </button>
                </div>
            </form>
            </div>
            </div>
            )}

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Joining Date</th>
                        <th>salary</th>
                        <th>Location</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {employeeList.map((emp)=>(
                        <tr key={emp.emp_id}>
                            <td>{emp.emp_id}</td>
                            <td>{emp.emp_name}</td>
                            <td>{emp.department}</td>
                            <td> {new Date(emp.joining_date).toLocaleDateString()}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.location}</td>
                            <td>
                                <button onClick={() => handleEdit(emp)}>
                                    update
                                </button>
                                <button onClick={() => handleDelete(emp.emp_id)}>
                                    delete
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )};


export default Home;