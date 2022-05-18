import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return(
        <div>
            <h3>We're sorry, but we could not find the author you are looking for. Would you like to add this author to our database?</h3>
            <h2><Link to={"/create"}>Create an Author</Link></h2>
            <button className='btn'><Link to={'/'}>Home</Link></button>
        </div>
    )
}
export default Error;