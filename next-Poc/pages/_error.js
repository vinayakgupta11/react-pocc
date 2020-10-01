import React  from 'react';
import Link from 'next/link';
const errorIn=()=>
     (
        <div>
            <h1>oops, something went wrong</h1>
            <p>Go to <Link href="/"><a>going back</a></Link></p>
        </div>
    );


export default errorIn;