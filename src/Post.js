import React from "react";
import { useParams, useRouteMatch, Route } from "react-router-dom";
import PostDetails from "./PostCard";

export default function Post(props) {
  const { posts } = props;
  const { url, path } = useRouteMatch();

  const { postID } = useParams();
  const post =
    posts.find((post) => {
      return post.id == postID;
    }) || {};

  return (
    <div className="post-wrapper">
      <div className="post-header">
        <div className="post-image">
          <img src={post.imageURL} alt={post.imageURL} />
        </div>
        <div className="title container">
          <h3>{post.name}</h3>
        </div>
      </div>
      <Route path={`${path}/${postID}`}>
        <PostDetails details={post} />
      </Route>
    </div>
  );
}
