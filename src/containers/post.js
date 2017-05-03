import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import marked from 'marked';
import { fetchPost, updatePost, deletePost } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleEditing: false,
      contentEditing: false,
      tagsEditing: false,
      cover_urlEditing: false,
      title: '',
      content: '',
      tags: '',
      cover_url: '',
    };

    this.renderCoverUrl = this.renderCoverUrl.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.onCoverUrlChange = this.onCoverUrlChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.toggleCoverUrl = this.toggleCoverUrl.bind(this);
    this.toggleTitle = this.toggleTitle.bind(this);
    this.toggleContent = this.toggleContent.bind(this);
    this.toggleTags = this.toggleTags.bind(this);
    this.doneClicked = this.doneClicked.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  onCoverUrlChange(event) {
    this.setState({ cover_url: event.target.value });
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

  toggleCoverUrl() {
    if (this.state.cover_urlEditing) {
      this.setState({ cover_urlEditing: false });
      this.props.updatePost(this.props.posts.post._id, { cover_url: this.state.cover_url });
    } else {
      this.setState({
        cover_url: this.props.posts.post.cover_url,
        cover_urlEditing: true,
      });
    }
  }

  toggleTitle() {
    if (this.state.titleEditing) {
      this.setState({ titleEditing: false });
      this.props.updatePost(this.props.posts.post._id, { title: this.state.title });
    } else {
      this.setState({
        title: this.props.posts.post.title,
        titleEditing: true,
      });
    }
  }

  toggleContent() {
    if (this.state.contentEditing) {
      this.setState({ contentEditing: false });
      this.props.updatePost(this.props.posts.post._id, { content: this.state.content });
    } else {
      this.setState({
        content: this.props.posts.post.content,
        contentEditing: true,
      });
    }
  }

  toggleTags() {
    if (this.state.tagsEditing) {
      this.setState({ tagsEditing: false });
      this.props.updatePost(this.props.posts.post._id, { tags: this.state.tags });
    } else {
      this.setState({
        tags: this.props.posts.post.tags,
        tagsEditing: true,
      });
    }
  }

  doneClicked(event) {
    this.props.history.push('/');
  }

  deleteClicked(event) {
    this.props.deletePost(this.props.posts.post._id, this.props.history);
  }

  renderCoverUrl() {
    if (this.state.cover_urlEditing) {
      return (
        <div className="cover-url-edit">
          <textarea autoFocus className="edit-input" onChange={this.onCoverUrlChange} onBlur={this.toggleCoverUrl} value={this.state.cover_url} />
          <a href="https://giphy.com" target="_blank" rel="noopener noreferrer"><button className="giphy-link">Need a Gif?</button></a>
        </div>
      );
    } else if (this.props.posts.post.cover_url && this.props.posts.post.cover_url.trim() === '') {
      return (
        <button className="fix-empty-button" onClick={this.toggleCoverUrl}>Add a cover url!</button>
      );
    } else {
      return (
        <div>
          <span dangerouslySetInnerHTML={{ __html: marked(`![](${this.props.posts.post.cover_url})` || '') }} onClick={this.toggleCoverUrl} />
        </div>
      );
    }
  }

  renderTitle() {
    if (this.state.titleEditing) {
      return (
        <input autoFocus className="edit-input" onChange={this.onTitleChange} onBlur={this.toggleTitle} value={this.state.title} />
      );
    } else if (this.props.posts.post.title && this.props.posts.post.title.trim() === '') {
      return (
        <button className="fix-empty-button" onClick={this.toggleTitle}>Add a title!</button>
      );
    } else {
      return (
        <div>
          <span onClick={this.toggleTitle}>{this.props.posts.post.title}</span>
        </div>
      );
    }
  }

  renderContent() {
    if (this.state.contentEditing) {
      return (
        <div className="content-edit">
          <textarea autoFocus className="edit-input" onChange={this.onContentChange} onBlur={this.toggleContent} value={this.state.content} />
          <p>markdown supported</p>
        </div>
      );
    } else if (this.props.posts.post.content && this.props.posts.post.content.trim() === '') {
      return (
        <button className="fix-empty-button" onClick={this.toggleContent}>Add some content!</button>
      );
    } else {
      return (
        <div>
          <span dangerouslySetInnerHTML={{ __html: marked(this.props.posts.post.content || '') }} onClick={this.toggleContent} />
        </div>
      );
    }
  }

  renderTags() {
    if (this.state.tagsEditing) {
      return (
        <input autoFocus className="edit-input" onChange={this.onTagsChange} onBlur={this.toggleTags} value={this.state.tags} />
      );
    } else if (this.props.posts.post.tags && this.props.posts.post.tags.trim() === '') {
      return (
        <button className="fix-empty-button" onClick={this.toggleTags}>Add some #tags!</button>
      );
    } else {
      return (
        <div>
          <span onClick={this.toggleTags}>{this.props.posts.post.tags}</span>
        </div>
      );
    }
  }

  render() {
    if (this.props.posts.post == null) {
      return (<div />);
    } else {
      return (
        <div className="single-post">
          <div>
            {this.renderCoverUrl()}
          </div>
          <div>
            {this.renderTitle()}
          </div>
          <div>
            {this.renderContent()}
          </div>
          <div>
            {this.renderTags()}
          </div>
          <div>
            <button className="done" onClick={this.doneClicked}>Done</button>
            <button className="delete" onClick={this.deleteClicked}>Delete</button>
          </div>
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

export default withRouter(connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post));
