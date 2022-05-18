import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const EditForm = () => {
    let [currentAuthor, setCurrentAuthor] = useState({});
    let history = useHistory()
    let { id } = useParams()
    let [validationMsg, setValidationMsg] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(response => {
                if(response.data.error){
                    history.push('/error')
                }
                else{
                console.log("response---->", response)
                setCurrentAuthor(response.data.author)
            }
            })
            .catch(err => {
                console.log("catch")
                console.log(err);
            }
            )
    }, [id])

    const changeHandler = (e) => {
        setCurrentAuthor({
            ...currentAuthor,
            [e.target.name]: e.target.value
        })
    }

    const toggleIsBestSeller = (e) => {
        setCurrentAuthor({
            ...currentAuthor,
            isBestSeller: e.target.checked
        })
    }

    const editAuthor = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/authors/${id}`, currentAuthor)
            .then(response => {
                console.log("response---->", response)
                if (response.data.error) {
                    setValidationMsg(response.data.error.errors)
                    console.log(validationMsg)
                }
                else {
                    history.push('/')
                }
            })
            .catch(err => {
                console.log(err);
            }
            )
        
    }
    return (
        <div>
            <div>
            <h1 className='text-center'>Author Manager</h1>

            <p>{validationMsg.name?.message}</p>

            <form onSubmit={editAuthor}>
                <div className="d-flex form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' onChange={changeHandler} value={currentAuthor.name} />
                </div>
                <div className="d-flex form-group">
                    <label htmlFor="isBestSeller">Best Seller?</label>
                    <input type="checkbox" name='isBestSeller' onChange={toggleIsBestSeller} checked={currentAuthor.isBestSeller} />
                </div>
                <input type="submit" className='btn btn-primary' />
            </form>
            <button className='btn'><Link to={'/'}>Home</Link></button>
            </div>
        </div>

    )
}
export default EditForm