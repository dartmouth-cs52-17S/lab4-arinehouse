import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../actions';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      contents: '',
      tags: '',
      cover_url: '',
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentsChange = this.onContentsChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onSubmitClicked = this.onSubmitClicked.bind(this);
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  onContentsChange(event) {
    this.setState({ contents: event.target.value });
  }

  onTagsChange(event) {
    this.setState({ tags: event.target.value });
  }

  onUrlChange(event) {
    this.setState({ cover_url: event.target.value });
  }

  onSubmitClicked(event) {
    this.props.createPost({
      title: this.state.title,
      contents: this.state.contents,
      tags: this.state.tags,
      cover_url: this.state.cover_url,
    }, this.props.history);
  }

  render() {
    return (
      <div className="new-post">
        <h1>Create a new post:</h1>
        <div className="inputs">
          <input type="text" placeholder="title" onChange={this.onTitleChange} />
          <input type="text" placeholder="contents" onChange={this.onContentsChange} />
          <input type="text" placeholder="tags" onChange={this.onTagsChange} />
          <input type="text" placeholder="cover url" onChange={this.onUrlChange} />
          <div>
            <button className="done" onClick={this.onSubmitClicked}>Submit</button>
            <button className="delete" onClick={this.cancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { createPost })(Posts));
