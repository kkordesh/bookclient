import * as React from 'react';
import { useState, useEffect } from 'react';

import {useParams} from "react-router-dom"
interface BookIdHelperProps {
    pageId: (id:any)=> void
}

function BookIdHelper(props:BookIdHelperProps ){

    const params = useParams();
useEffect(() => {
    props.pageId(params.id)
    
}, []);

    return(<div></div>)
}

export default BookIdHelper