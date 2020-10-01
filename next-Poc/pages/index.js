import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
class Index extends Component {
    static getInitialProps(context)
    {
        console.log(context);
        const promise=new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve({appName:'Super App'} )
            },1000)
        }) ;
        return promise;
        // return {appName:'Super App'};
    }
  render() {
    return (
      <div>
        <h1>The main index page {this.props.appName}</h1>
        <p>
          Go to{" "}
          <Link href="/auth">
            <a>Auth</a>
          </Link>
        </p>
        <button onClick={() => Router.push("/auth")}>Go to Auth</button>
      </div>
    );
  }
}

export default Index;
