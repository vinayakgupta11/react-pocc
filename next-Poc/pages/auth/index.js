import React  from 'react';
import User from '../../Components/User'
const authIndex=(props)=>
     (
        <div>
            <h1>The auth index page {props.appName}</h1>
            <User name="max" age={28}/>
        </div>
    );
authIndex.getInitialProps= (context)=>{
    const promise=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({appName:'Super App'} )
        },1000)
    });
    return promise;
}

export default authIndex;