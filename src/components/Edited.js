import React from 'react';
import { Link } from 'react-router-dom';

const Edited = () => {
    return (
        <div>
            <h1>Your Post <br />Has Been <br />Edited!!!</h1>
            <Link to='/dashboard'>Back</Link>
        </div>
    )
}

export default Edited;