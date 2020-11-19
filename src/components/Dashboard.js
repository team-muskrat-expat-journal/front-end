import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PostCard from './PostCard';
import { fetchPosts } from '../actions/PostsAction';

const Dashboard = (props) => {
  console.log(props)
  const { posts } = props;

  useEffect(() => {
    props.fetchPosts(localStorage.getItem('user_id'));
  }, []);

  return (
    <div className="posts wrapper">
      <h1>Feed</h1>
      {posts && posts.length > 0 ? (
        posts.map((item) => {
          return <PostCard post={item} key={item.id} />;
        })
      ) : (
        <p>Nothing to see here... <br />Just a man enjoying some 'skrat... <br />Move along...</p>
      )}

      <Link to='/postform'>
        Create New Memory
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps, { fetchPosts })(Dashboard);