

export default function AddEmpForm({createEmployee, formData, setFormData, mode}) {

    // input handler
    const inputChangeHandler = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    // form submit handler
    function submitHandler(event){
        event.preventDefault();
        console.log(formData, mode);

        // adding employee to database
        createEmployee(formData);
        
        setFormData({
            name : "",
            departments : "",
            salary: "",
            id: ""
        });
    }

  return (
    <div className='max-w-[450px] w-[90%]'>
        <h2 className='text-white text-3xl text-center'>Add Employee</h2>

        <form className='flex flex-col gap-2 my-8' onSubmit={submitHandler}>
            <label htmlFor="name" className='text-white'>Name</label>
            <input 
                type='text'
                placeholder='Himanshu' 
                id='name'
                name='name'
                onChange={inputChangeHandler}
                value={formData.name}
                className='rounded-md p-2 mb-3'
                required
            />

            <label htmlFor="departments" className='text-white'>Departments</label>
            <textarea 
            name="departments" 
            id="departments" 
            placeholder='Development'
            onChange={inputChangeHandler}
            value={formData.departments}
            className='rounded-md p-2 mb-3'
            required></textarea>

            <label htmlFor="salary" className='text-white'>Salary</label>
            <input 
                type='text'
                placeholder='69000' 
                id='salary'
                name='salary'
                onChange={inputChangeHandler}
                value={formData.salary}
                className='rounded-md p-2 mb-3'
                required
            />

            <input 
            type="submit" 
            value={mode === 'create' ? 'Add' : 'Update'}
            className='bg-slate-800 text-white rounded-md p-2
            text-md font-bold hover:bg-slate-900 transition-all'
            />
        </form>
    </div>
  )
}
