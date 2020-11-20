import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Style/signUpStyles.css";
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
    history.push("/deleted");
  };

  const save = (event) => {
    event.preventDefault();
    props.editPost(id, postToEdit);
    history.push("/edited");
  };

  return (
    <>
      <div>
        <div className="postCard">
          <div className="post card">
            <div className="image-container">
              <div className="post-image">
                <img src={imageURL} alt={tripname} />
              </div>
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
              {/* EDITING */}
              {editing && (
                <form onSubmit={save}>
                  <h2>Edit Post</h2>
                  <div className="edit">
                    <label>
                      Name:
                      <input
                        className="form-control"
                        placeholder="Name"
                        onChange={(evt) =>
                          setPostToEdit({
                            ...postToEdit,
                            tripname: evt.target.value,
                          })
                        }
                        value={postToEdit.tripname}
                      />
                    </label>
                    &nbsp;
                    <br></br>
                    <label>
                      Date:
                      <input
                        className="form-control"
                        placeholder="Date"
                        onChange={(evt) =>
                          setPostToEdit({
                            ...postToEdit,
                            date: evt.target.value,
                          })
                        }
                        value={postToEdit.date}
                      />
                    </label>
                    &nbsp;
                    <br></br>
                    <label>
                      Location:
                      <input
                        className="form-control"
                        placeholder="Location"
                        onChange={(evt) =>
                          setPostToEdit({
                            ...postToEdit,
                            location: evt.target.value,
                          })
                        }
                        value={postToEdit.location}
                      />
                    </label>
                    &nbsp;
                    <br></br>
                    <label>
                      Notes:
                      <input
                        className="form-control"
                        placeholder="Notes"
                        onChange={(evt) =>
                          setPostToEdit({
                            ...postToEdit,
                            notes: evt.target.value,
                          })
                        }
                        value={postToEdit.notes}
                      />
                    </label>
                    &nbsp;
                    <br></br>
                    <label>
                      Rating:
                      <input
                        className="form-control"
                        placeholder="Rating"
                        onChange={(evt) =>
                          setPostToEdit({
                            ...postToEdit,
                            rating: evt.target.value,
                          })
                        }
                        value={postToEdit.rating}
                      />
                    </label>
                    <div></div>
                  </div>
                  <br></br>
                  <button className="edit-button-card" type="submit">
                    Save
                  </button>
                  <br></br>
                  <button
                    className="edit-button-card"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
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
