import React from 'react'
import {Link} from 'react-router-dom'

export default function Posts(props){
    const {posts} = props;

    return(
        <div className='posts wrapper'>
            {posts.map((post) = >(
                <div className='post-card' key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        <h3 className='post-name'>{post.name}</h3>
                        <img className='posts image' src={post.imageURL} alt={}/>
                    </Link>
                </div>
            ))}
        </div>
    );
}