import React from 'react'
import Employee from './Employee'

export default function Employees({allEmpsData, deleteEmployee, startUpdate}) {
  console.log(allEmpsData);
  return (
    <div className='w-[90%] max-w-[1000px]'>
      <div className=' grid grid-cols-[1fr_1fr_1fr_1fr] p-4 text-white 
      font-bold border bg-slate-800'>
          <div className=''>Name</div>
          <div>Departments</div>
          <div>Salary</div>
          <div>Modify</div>
      </div>

      {allEmpsData.map((empData) => <Employee 
      key={empData._id} 
      empData={empData} 
      deleteEmployee={deleteEmployee}
      startUpdate={startUpdate}
      />)}
    </div>
  )
}
