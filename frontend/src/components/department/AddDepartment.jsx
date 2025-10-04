import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const [department,setDepartment]=useState({
        deptName:"",
        deptDesc:"",
    });

    const navigate=useNavigate();


    const handleChange=(e)=>{
        const {name,value}=e.target;
        setDepartment({...department,[name]:value});
    }


    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
           const response=await axios.post('http://localhost:5000/api/department/add',department,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
           }
        });

        if(response.data.success)
        {
          navigate('/admin-dashboard/department');
        }

        }
        catch(error)
        {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error);
            }
        }

        
    }

  return (
    <div className="mt-5 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
       <div className="max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Add Department</h3>
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-900/40 to-blue-900/40 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8">
            <div className="mb-6">
                <label htmlFor="deptName" className="block text-cyan-300 font-semibold mb-3 text-sm uppercase tracking-wider">Department Name</label>
                <input 
                  type="text" 
                  id="deptName" 
                  name="deptName" 
                  placeholder="Enter Department Name" 
                  className="w-full bg-gray-900/60 backdrop-blur-lg border-2 border-cyan-500/30 rounded-xl py-4 px-4 text-white placeholder-cyan-300/40 font-medium transition-all duration-300 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 focus:bg-gray-900/80 focus:scale-105 outline-none"
                  onChange={handleChange}
                  required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="deptDesc" className="block text-cyan-300 font-semibold mb-3 text-sm uppercase tracking-wider">Department Description</label>
                <textarea 
                  id="deptDesc" 
                  name="deptDesc" 
                  placeholder="Enter Department Description" 
                  className="w-full bg-gray-900/60 backdrop-blur-lg border-2 border-cyan-500/30 rounded-xl py-4 px-4 text-white placeholder-cyan-300/40 font-medium transition-all duration-300 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 focus:bg-gray-900/80 focus:scale-105 outline-none resize-none h-32"
                  onChange={handleChange}
                  required
                ></textarea>
            </div>
            <div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 border-2 border-cyan-400/30"
                >
                  Add Department
                </button>
            </div>
        </form>
       </div>
    </div>
  )
}

export default AddDepartment