import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCreatePost } from '../actions';

function formatUsername(user) {
  if (user && user.username) {
    return `@${user.username}`;
  } else {
    return 'Unknown';
  }
}

function formatCreated(timestamp) {
  const t = new Date(parseInt(timestamp, 10));
  return t.toString();
}

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleChange(text) {
    this.setState({ ...this.state, text });
  }

  handlePost() {
    const { text } = this.state;
    this.props.dispatch(requestCreatePost({ text }));
    this.setState({ ...this.state, text: '' });
  }

  render() {
    const { user, posts } = this.props;
    const { text } = this.state;

    const list = Object.keys(posts).map(id => [posts[id], id]);
    list.reverse();

    return (
      <div>
        <h3>Signed-in as {user.username}</h3>
        <div>
          <input type="text" value={text} onChange={e => this.handleChange(e.target.value)} />
          <input type="button" value="Post" onClick={() => this.handlePost()} />
        </div>
        <ul>
          {list.map(([post, id]) =>
            <li key={id}>{post.body} by {formatUsername(post.user)} at {formatCreated(post.created)}</li>
          )}
        </ul>
      </div>
    );
  }
}

function select({ app, users, posts }) {
  const user = users[app.user];

  const compl = Object.keys(posts).reduce((p, key) => {
    const post = posts[key];
    const complPost = { ...post, user: users[post.userId] };
    return { ...p, [key]: complPost };
  }, {});

  return { user, posts: compl };
}

export default connect(select)(Timeline);
