import React, { Component } from 'react';
import './Blog.css';
import Posts from '../Blog/Posts/Posts'
import {Route,NavLink,Switch,Redirect} from 'react-router-dom';
//import Newpost from '../Blog/NewPost/NewPost'
import FullPost from '../Blog/FullPost/FullPost'
import asynCmp from '../../hoc/asynCmp';
const AsynCmp= asynCmp(()=>{
    return import ('../Blog/NewPost/NewPost');
})
class Blog extends Component {
    state={
        auth:true
    };
    render () {
       

        return (
            <div className="Blogs">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to='/posts' exact
                            activeClassName='my-active'
                            activeStyle={{
                                color: '#fa923f',
                                textDecoration:"underline"
                            }}>Posts</NavLink></li>
                            
                            <li><NavLink to={{
                                pathname:'/new-post',
                                hash:'#submit',
                                search:'?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={()=> <h1>Home</h1>}/>
                <Route path="/"  render={()=> <h1>Home_2</h1>}/> */}
                <Switch>
                {this.state.auth?<Route path="/new-post"   component={AsynCmp}/>:null}
                <Route path="/posts"  component={Posts}/>
                <Route render={()=><h1>Not found</h1>}/>
                {/* <Redirect from='/' to='/posts'/> */}
              
                </Switch>
                
            </div>
        );
    }
}
export default Blog;