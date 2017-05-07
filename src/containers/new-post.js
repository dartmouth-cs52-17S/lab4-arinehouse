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
      title_red_shadow: false,
      content_red_shadow: false,
      tags_red_shadow: false,
      cover_url_red_shadow: false,
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onCoverUrlChange = this.onCoverUrlChange.bind(this);
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

  onCoverUrlChange(event) {
    this.setState({ cover_url: event.target.value });
  }

  onSubmitClicked(event) {
    if (this.state.title === '' || this.state.content === '' || this.state.tags === '' || this.state.cover_url === '') {
      // Input validation: check if user left any of the fields blank, and make them have a red shadow if they did.
      if (this.state.title === '') {
        this.setState({ title_red_shadow: true });
      } else {
        this.setState({ title_red_shadow: false });
      }

      if (this.state.content === '') {
        this.setState({ content_red_shadow: true });
      } else {
        this.setState({ content_red_shadow: false });
      }

      if (this.state.tags === '') {
        this.setState({ tags_red_shadow: true });
      } else {
        this.setState({ tags_red_shadow: false });
      }

      if (this.state.cover_url === '') {
        this.setState({ cover_url_red_shadow: true });
      } else {
        this.setState({ cover_url_red_shadow: false });
      }

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

  renderTitleBar() {
    if (this.state.title_red_shadow) {
      return (<input id="title" className="red-box" type="text" placeholder="title" onChange={this.onTitleChange} />);
    } else {
      return (<input id="title" className="black-box" type="text" placeholder="title" onChange={this.onTitleChange} />);
    }
  }

  renderContentBar() {
    if (this.state.content_red_shadow) {
      return (<input id="content" className="red-box" type="text" placeholder="content" onChange={this.onContentChange} />);
    } else {
      return (<input id="content" className="black-box" type="text" placeholder="content" onChange={this.onContentChange} />);
    }
  }

  renderTagsBar() {
    if (this.state.tags_red_shadow) {
      return (<input id="tags" className="red-box" type="text" placeholder="tags" onChange={this.onTagsChange} />);
    } else {
      return (<input id="tags" className="black-box" type="text" placeholder="tags" onChange={this.onTagsChange} />);
    }
  }

  renderCoverUrlBar() {
    if (this.state.cover_url_red_shadow) {
      return (<input id="cover_url" className="red-box" type="text" placeholder="cover_url" onChange={this.onCoverUrlChange} />);
    } else {
      return (<input id="cover_url" className="black-box" type="text" placeholder="cover_url" onChange={this.onCoverUrlChange} />);
    }
  }

  render() {
    return (
      <div className="new-post">
        <h1>Create a new post:</h1>
        <div className="inputs">
          {this.renderTitleBar()}
          {this.renderContentBar()}
          {this.renderTagsBar()}
          <div className="add-a-gif">
            {this.renderCoverUrlBar()}
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
