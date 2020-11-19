import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PostCard from "./PostCard";
import { fetchPosts } from "../actions/PostsAction";

const Dashboard = (props) => {
  console.log(props);
  const { posts } = props;

  useEffect(() => {
    props.fetchPosts(localStorage.getItem("user_id"));
  }, []);

  return (
    <div className="posts wrapper">
      <nav>
        <div className="logo">
          <h2>Team 'Skrat Expat Journal</h2>
        </div>
        <div className="links">
          <Link to="/PostForm">
            <button className="navButton" type="button">
              New Memory
            </button>
          </Link>
          <Link to="/">
            <button className="navButton" type="button">
              Log out
            </button>
          </Link>
        </div>
      </nav>
      <div>
        <Link to="/postform" className="createNewMemory">
          Create New Memory
        </Link>
      </div>
      {posts && posts.length > 0 ? (
        posts.map((item) => {
          return <PostCard post={item} key={item.id} />;
        })
      ) : (
        <p>
          Nothing to see here... <br />
          Just a man enjoying some 'skrat... <br />
          Move along...
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps, { fetchPosts })(Dashboard);
