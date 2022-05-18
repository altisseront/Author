import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
    BrowserRouter,
    Switch,
    Route,
    Link 
  } from "react-router-dom";


const CreateForm = () => {
    let [formInfo, setFormInfo] = useState({name:"",isBestSeller:false});
    let history = useHistory()
    let [validationMsg, setValidationMsg] = useState({});
    const changeHandler = (e)=> {
        setFormInfo({
            ...formInfo,
            [e.target.name]:e.target.value
        })}
    const toggleIsBestSeller = (e) =>{
        setFormInfo({
            ...formInfo,
            isBestSeller:e.target.checked
        })
    }
    const addAuthor = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/authors", formInfo)
            .then(response => {
                if (response.data.error) {
                    setValidationMsg(response.data.error.errors)
                    console.log(validationMsg)
                }
                else {
                    history.push('/')
                }
            })
            .catch(err => {
                console.log(err)
                
            })

    }
    
    return (
        <div className="">
        <h1 className='text-center'>Author Manager</h1>
        <p>{validationMsg.name?.message}</p>
        <form onSubmit={addAuthor}>
            <div className="d-flex form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name='name' onChange={changeHandler} value={formInfo.name}/>
            </div>
            <div className="d-flex form-group">
                <label htmlFor="isBestSeller">Best Seller?</label>
                <input type="checkbox" name='isBestSeller' onChange={toggleIsBestSeller} checked={formInfo.isBestSeller}/>
            </div>
            <input type="submit" className='btn btn-primary'/>
        </form>
        <button className='btn'><Link to={'/'}>Home</Link></button>
        </div>

    )
}
export default CreateForm