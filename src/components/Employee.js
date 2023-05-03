import React from 'react'

export default function Employee({empData, deleteEmployee, startUpdate}) {
    const empId = empData._id;
  return (
    <div className='grid grid-cols-[1fr_1fr_1fr_1fr] p-4 text-white border'>
        <div>{empData.name}</div>
        <div>{empData.departments}</div>
        <div>{empData.salary}</div>

        <div className='flex gap-4'>
            <button className='rounded-md bg-blue-600 py-2 px-3 hover:bg-blue-800 transition-all'
            onClick={() => {startUpdate(empData)}}
            >Edit</button>

            <button className='rounded-md bg-red-600 py-2 px-3 hover:bg-red-800 transition-all'
            onClick={() => {
                    const deleteEmp = window.confirm(`Do you want to delete this Employee - ${empData.name}`);
                    if(deleteEmp) deleteEmployee(empId);
                }
            }>Delete</button>
        </div>
    </div>
  )
}
