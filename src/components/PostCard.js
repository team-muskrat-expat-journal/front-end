import React, { useState } from "react";
import { connect } from 'react-redux';

import { editPost, deletePost } from '../actions/PostsAction';

const initialPost = {
  name: "",
  date: "",
  location: "",
  imageURL: "",
  notes: "",
  rating: "",
  role: "",
}

const PostCard = (props) => {
  const { id, title, image } = props.post;
  const [editing, setEditing] = useState(false);
  const [editPost, setEditPost] = useState(initialPost);

  const deleteEntry = event => {
    event.preventDefault();
    props.deletePost(id);
  };

  const editEntry = () => {
    setEditing(true);
    setEditPost(props.post);
  }

  const onSubmit = event => {
    event.preventDefault();
    props.editPost(id, editPost);
  }

  return (
    <div className="post-card">
      <img src={image} alt={title} />
      <p>{title}</p>
      <button onClick={deleteEntry}>Delete Post</button>
      <button onClick={editEntry}>Edit Post</button>
      <br />
      {editing && (
        <form onSubmit={onSubmit}>

          <div>
            <button type='submit'>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps, { deletePost, editPost })(PostCard);