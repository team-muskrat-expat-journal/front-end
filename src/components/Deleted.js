import React from 'react';
import { Link } from 'react-router-dom';

const Deleted = () => {
    return (
        <div>
            <h1>Your Post <br />Has Been <br />Deleted!!!</h1>
            <Link to='/dashboard'>Back</Link>
        </div>
    )
}

export default Deleted;