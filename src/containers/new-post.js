import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../actions';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      tags: '',
      cover_url: '',
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onSubmitClicked = this.onSubmitClicked.bind(this);
    this.cancelClicked = this.cancelClicked.bind(this);
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  onContentChange(event) {
    this.setState({ content: event.target.value });
  }

  onTagsChange(event) {
    this.setState({ tags: event.target.value });
  }

  onUrlChange(event) {
    this.setState({ cover_url: event.target.value });
  }

  onSubmitClicked(event) {
    if (this.state.title === '' || this.state.content === '' || this.state.tags === '' || this.state.cover_url === '') {
      const redShadow = '2px 2px 10px 0 rgb(182, 0, 0)';
      const blackShadow = '2px 2px 10px 0 black';
      // Input validation: check if user left any of the fields blank, and make them have a red shadow if they did.
      document.getElementById('title').style.boxShadow = (this.state.title === '') ? redShadow : blackShadow;
      document.getElementById('content').style.boxShadow = (this.state.content === '') ? redShadow : blackShadow;
      document.getElementById('tags').style.boxShadow = (this.state.tags === '') ? redShadow : blackShadow;
      document.getElementById('cover_url').style.boxShadow = (this.state.cover_url === '') ? redShadow : blackShadow;
      // Input validation: change the button to an obnoxious red color, displaying the error that all fields are required.
      const button = event.target;
      button.innerHTML = 'YOU MUST CONSTRUCT ADDITIONAL PYLONS';
      button.style.backgroundColor = 'rgb(182, 0, 0)';
      setTimeout(() => {
        button.innerHTML = 'Submit';
        button.style.backgroundColor = 'rgb(105, 196, 3)';
      }, 2000);
    } else {
      this.props.createPost({
        title: this.state.title,
        content: this.state.content,
        tags: this.state.tags,
        cover_url: this.state.cover_url,
      }, this.props.history);
    }
  }

  cancelClicked(event) {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="new-post">
        <h1>Create a new post:</h1>
        <div className="inputs">
          <input id="title" type="text" placeholder="title" onChange={this.onTitleChange} />
          <input id="content" type="text" placeholder="content" onChange={this.onContentChange} />
          <input id="tags" type="text" placeholder="tags" onChange={this.onTagsChange} />
          <div className="add-a-gif">
            <input id="cover_url" type="text" placeholder="cover url" onChange={this.onUrlChange} />
            <a href="https://giphy.com" target="_blank" rel="noopener noreferrer"><button className="giphy-link">Need a Gif?</button></a>
          </div>
          <div>
            <button className="done" onClick={this.onSubmitClicked}>Submit</button>
            <button className="delete" onClick={this.cancelClicked}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { createPost })(Posts));
