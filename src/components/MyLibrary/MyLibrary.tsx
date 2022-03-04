import * as React from 'react'

import LibraryCreate from './LibraryCreate/LibraryCreate';
import {Endpoints} from '../../endpoints'

interface MyLibraryProps {
    token: string | null
}
 
interface MyLibraryState {
    myBooks: [string]
    
}


 
class MyLibrary extends React.Component<MyLibraryProps, MyLibraryState> {
    constructor (props: MyLibraryProps) {
        super(props);
        this.state = {myBooks: ['']}
    }

    FetchMyBooks = () => {
        const token = this.props.token

    fetch(`http://localhost:4000/book/${localStorage.getItem("userId")}` , {
        method: 'GET',
        headers: new Headers ({
            'Content-Type': 'application/json',
            Authorization: `${token}`
        })
    }) .then ((res) => res.json())
    .then((bookData) => {
        this.setState({myBooks: bookData})
        console.log(bookData)
    })

    }
    componentDidMount() {
        this.FetchMyBooks();
    }

    render() { 
        return ( 
            <div>
               <LibraryCreate token={this.props.token} FetchMyBooks={this.FetchMyBooks}/> 
            </div>
         );
    }
}
 
export default MyLibrary;