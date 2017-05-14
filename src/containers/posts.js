import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import marked from 'marked';
import { fetchPosts, fetchPost } from '../actions';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.all.map((post) => {
      if (!post.author) {
        return (
          <Link to={`/posts/${post.id}`} className="post-link" key={post.id}>
            <div className="general-post">
              <div dangerouslySetInnerHTML={{ __html: marked(`![](${post.cover_url})` || '') }} />
              <div className="title">{post.title}</div>
              <div>{post.tags}</div>
            </div>
          </Link>
        );
      } else {
        return (
          <Link to={`/posts/${post.id}`} className="post-link" key={post.id}>
            <div className="general-post">
              <div dangerouslySetInnerHTML={{ __html: marked(`![](${post.cover_url})` || '') }} />
              <div className="title">{post.title}</div>
              <div>{post.tags}</div>
              <div>By {post.author.username}</div>
            </div>
          </Link>
        );
      }
    });
  }

  render() {
    if (this.props.posts.all == null) {
      return (<div />);
    } else {
      return (
        <div id="post-display">
          {this.renderPosts()}
        </div>
      );
    }
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchPost })(Posts));
