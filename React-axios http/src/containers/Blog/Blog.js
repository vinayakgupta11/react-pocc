import React, { Component } from "react";
import axios from "../../axios";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error:false
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const pos = response.data.slice(0, 4);
        const updPos = pos.map((p) => {
          return {
            ...p,
            author: "maxiii",
          };
        });
        this.setState({ posts: updPos });
       // console.log(response);
      })
      .catch((err) => {
          this.setState({error:true})
        console.log(err);
      });
  }
  postSelectorHandler=(id)=>{
      this.setState({selectedPostId:id})

  }
  render() {
      let posts=<p>something went wrong</p>
      if(!this.state.error)
      {
         posts = this.state.posts.map((post) => {
            return <Post key={post.id} 
                    title={post.title} 
                    author={post.author} 
                    clicked={()=> this.postSelectorHandler(post.id)} 
                    />;
          });
      }
   
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
