import "./App.css";
import { useEffect, useState } from "react";
import AddEmpForm from "./components/AddEmpForm";
import Employees from "./components/Employees";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [allEmpsData, setAllEmpsData] = useState([]);

  const [mode, setMode] = useState("create");

  // formData
  const [formData, setFormData] = useState({
    name: "",
    departments: "",
    salary: "",
    id: "",
  });

  // create Employee in Database
  const createEmployee = async (formData) => {
    if (mode === "create") {
      try {
        const response = await fetch("http://localhost:4000/api/v1/addEmp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data);

        // fetch all employees after creating a new one
        fetchEmployees();
        toast.success(data.message);
      } catch (e) {
        console.log("Received Error", e.message);
      }
    }
    else if(mode === 'update'){
      try {
        const response = await fetch(`http://localhost:4000/api/v1/updateEmp/${formData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        console.log(data);
  
        // fetch all employees after updating an existing employee
        fetchEmployees();
        toast.success(data.message);
        setMode('create');
      } catch (e) {
        console.log("Received Error", e.message);
      }
    }
  };

  //delete employee from database
  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/deleteEmp/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      // fetch all employees after deleting an employee
      fetchEmployees();
      toast.error(data.message);
    } catch (e) {
      console.log("Received Error", e.message);
    }
  };

  // fill the selected employee details in form
  const startUpdate = async (empData) => {
    setFormData({
      name: empData.name,
      departments: empData.departments,
      salary: empData.salary,
      id: empData._id,
    });

    setMode("update");
  };

  // fetch all employees from database
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/getEmps");
      const { data } = await response.json();
      console.log(data);
      setAllEmpsData(data);
    } catch (e) {
      console.log("error", e.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-slate-700 flex flex-col items-center py-16 gap-5">
      <AddEmpForm
        createEmployee={createEmployee}
        formData={formData}
        setFormData={setFormData}
        mode={mode}
      />
      <Employees
        allEmpsData={allEmpsData}
        deleteEmployee={deleteEmployee}
        startUpdate={startUpdate}
      />
      <Toaster />
    </div>
  );
}

export default App;
