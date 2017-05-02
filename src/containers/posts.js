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


  render() {
    if (this.props.posts.all == null) {
      return (<div />);
    } else {
      return (
        <div id="post-display">
          {this.props.posts.all.map((post) => {
            return (
              <Link to={`/posts/${post.id}`} className="post-link">
                <div className="general-post">
                  <div dangerouslySetInnerHTML={{ __html: marked(`![](${post.cover_url})` || '') }} />
                  <div className="title">{post.title}</div>
                  <div>{post.tags}</div>
                </div>
              </Link>
            );
          })}
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
