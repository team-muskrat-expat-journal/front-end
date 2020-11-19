import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { editPost, deletePost } from "../actions/PostsAction";

const initialPost = {
  id: "",
  tripname: "",
  date: "",
  location: "",
  imageURL: "",
  notes: "",
  rating: "",
  role: "",
};

const PostCard = (props) => {
  console.log(props.post);
  const {
    id,
    tripname,
    date,
    location,
    imageURL,
    notes,
    rating,
    role,
  } = props.post;
  const [editing, setEditing] = useState(false);
  const [postToEdit, setPostToEdit] = useState(initialPost);
  const history = useHistory();

  const postEdit = (edit) => {
    console.log(id);
    setEditing(true);
    setPostToEdit(id);
  };

  const postDelete = (event) => {
    event.preventDefault();
    props.deletePost(id);
  };

  const save = (event) => {
    event.preventDefault();
    props.editPost(id, postToEdit);
  };

  return (
    <>
      <div>
        <div className="post card">
          <div className="image-container">
            <img src={imageURL} alt={tripname} />
          </div>
          <div className="card-info">
            <h2>{tripname}</h2>
            <p>Date: {date}</p>
            <p>Location: {location}</p>
            <p>{notes}</p>
            <p>Rating: {rating}</p>
            <p>Person, Place, or Thing: {role}</p>
            <button onClick={postEdit}>Edit</button>
            <button onClick={postDelete}>Delete</button>
            <br />
            <br />
            <br />
            <br />
            {editing && (
              <form onSubmit={save}>
                <legend>Edit Post</legend>
                <ul>
                  <label>
                    Name:&nbsp;
                    <input
                      onChange={(evt) =>
                        setPostToEdit({ ...postToEdit, tripname: evt.target.value })
                      }
                      value={postToEdit.tripname}
                    />
                  </label>
                  <label>
                    Date:&nbsp;
                    <input
                      onChange={(evt) =>
                        setPostToEdit({ ...postToEdit, date: evt.target.value })
                      }
                      value={postToEdit.date}
                    />
                  </label>
                  <label>
                    Location:&nbsp;
                    <input
                      onChange={(evt) =>
                        setPostToEdit({
                          ...postToEdit,
                          location: evt.target.value,
                        })
                      }
                      value={postToEdit.location}
                    />
                  </label>
                  <label>
                    Notes:&nbsp;
                    <input
                      onChange={(evt) =>
                        setPostToEdit({
                          ...postToEdit,
                          notes: evt.target.value,
                        })
                      }
                      value={postToEdit.notes}
                    />
                  </label>
                  <label>
                    Rating:&nbsp;
                    <input
                      onChange={(evt) =>
                        setPostToEdit({
                          ...postToEdit,
                          rating: evt.target.value,
                        })
                      }
                      value={postToEdit.rating}
                    />
                  </label>
                </ul>
                <div>
                  <button type="submit">Save</button>
                  <button onClick={() => setEditing(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps, { deletePost, editPost })(PostCard);
