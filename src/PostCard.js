import React, { useState } from "react";
import { deletePost, editPost } from "./actions/PostsAction";

const initialPost = {
  id: "",
  name: "",
  date: "",
  location: "",
  imageURL: "",
  notes: "",
  rating: "",
  role: "",
};

export default function PostCard(props) {
  const { id, name, date, location, imageURL, notes, rating, role } = props;
  const [editing, setEditing] = useState(false);
  const [postToEdit, setPostToEdit] = useState(initialPost);

  const postEdit = (edit) => {
    setEditing(true);
    setPostToEdit(id);
  };

  const postDelete = (evt) => {
    evt.preventDefault();
    props.deletePost(id);
  };

  const save = (evt) => {
    evt.preventDefault();
    props.postEdit(props.post);
  };
  return (
    <div className="post card">
      <div className="image-container">
        <img src={imageURL} alt={imageURL} />
      </div>
      <div className="card-info">
        <h2>{name}</h2>
        <p>{date}</p>
        <p>{location}</p>
        <p>{notes}</p>
        <p>{rating}</p>
        <p>{role}</p>
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
                    setPostToEdit({ ...postToEdit, name: evt.target.value })
                  }
                />
              </label>
              <label>
                Date:&nbsp;
                <input
                  onChange={(evt) =>
                    setPostToEdit({ ...postToEdit, date: evt.target.value })
                  }
                />
              </label>
              <label>
                Location:&nbsp;
                <input
                  onChange={(evt) =>
                    setPostToEdit({ ...postToEdit, location: evt.target.value })
                  }
                />
              </label>
              <label>
                Notes:&nbsp;
                <input
                  onChange={(evt) =>
                    setPostToEdit({ ...postToEdit, notes: evt.target.value })
                  }
                />
              </label>
              <label>
                Rating:&nbsp;
                <input
                  onChange={(evt) =>
                    setPostToEdit({ ...postToEdit, rating: evt.target.value })
                  }
                />
              </label>
            </ul>
            <div>
              <button type="submit">save</button>
              <button onClick={() => setEditing(false)}>cancle</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
