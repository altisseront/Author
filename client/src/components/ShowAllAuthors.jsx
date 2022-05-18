import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

const ShowAllAuthors = () => {
    let [authorList, setAuthorList] = useState([]);
    let [deleteToggle, setDeleteToggle] = useState(false);
    function SortArray(x, y){
        return x.name.localeCompare(y.name);
    }
    let deleteAuthor =(id)=>{
        axios.delete(`http://localhost:8000/api/authors/${id}`)
            .then(response=>{
                console.log("response---->", response)
                setDeleteToggle(!deleteToggle)
            })
            .catch(err=>{
            console.log(err);
            }
            )
    }
    useEffect(()=>{
        axios.get('http://localhost:8000/api/authors')
        .then(response => {
            setAuthorList(response.data.authors.sort(SortArray));
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })   
    },[deleteToggle])
    return (
        <div>
            <h2><Link to={"/create"}>Create an Author</Link></h2>
            <h3>We have quotes by:</h3>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">Author</th>
                        <th scope="col">Best Seller?</th>
                        <th scope="col">Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authorList.map((author, idx) => {
                            if (author.isBestSeller === true){
                                return (
                                    <tr key={idx}>
                                        <td>{author.name}</td>
                                        <td>Yes!!</td>
                                        <td><button className='btn border border-secondary'><Link className='text-dark' to={`/edit/${author._id}`}>Edit</Link></button><button className='btn text-danger border border-secondary mx-2' onClick={(e)=>{deleteAuthor(author._id)}}>Delete</button></td>
                                    </tr>
                                )
                            }
                            else{
                            return (
                                <tr key={idx}>
                                    <td>{author.name}</td>
                                    <td>No </td>
                                    <td><button className='btn border border-secondary'><Link  className='text-dark ' to={`/edit/${author._id}`}>Edit</Link></button><button className='btn text-danger border border-secondary mx-2' onClick={(e)=>{deleteAuthor(author._id)}}>Delete</button></td>
                                </tr>
                            )}
                        })
                    }
                </tbody>
            </table>
        </div>
    )



}
export default ShowAllAuthors;