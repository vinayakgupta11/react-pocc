import React, { Component } from "react";
import Post from "../../../components/Post/Post";
import axios from "../../../axios";
import "./Posts.css";
import { Route,Link } from "react-router-dom";
import FullPost from '../FullPost/FullPost'

class Posts extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Max",
          };
        });
        this.setState({ posts: updatedPosts });
        // console.log( response );
      })
      .catch((error) => {
        console.log(error);
        //this.setState({error: true});
      });
  }
  postSelectionHandler = (id) => {
    this.props.history.push({ pathname: "/posts/" + id });
    // this.props.history.push('/'+ id);
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          // <Link to={'/' + post.id} key={post.id}>
          //  <Post
          //     key={post.id}
          //     title={post.title}
          //     author={post.author}
          //   />
          // </Link>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectionHandler(post.id)}
          />
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    );
  }
}
export default Posts;
