
import * as React from 'react'
import './MyLibrary.css'
import APIURL from '../../helpers/environment';
import LibraryCreate from './LibraryCreate/LibraryCreate';
import MyLibraryTable from './LibraryTable/MyLibraryTable';
import LibraryEdit from './LibraryEdit/LibraryEdit'
import {Col, Row} from 'react-bootstrap'
interface MyLibraryProps {
    token: string | null
}
 
interface MyLibraryState {
    myBooks: []
    updateActive: boolean; 
    bookToUpdate: book
}

export interface book {
    id: number; 
    title: string;
    genre: string;
    summary: string, 
    image: string, 
    list: string, 
    author: string, 
}
 
class MyLibrary extends React.Component<MyLibraryProps, MyLibraryState> {
    constructor (props: MyLibraryProps) {
        super(props);
        this.state = {myBooks: [], updateActive: false, bookToUpdate: {} as book }
    }

    FetchMyBooks = () => {
        const token = this.props.token

    fetch(`${APIURL}/book/${localStorage.getItem("userId")}` , {
        method: 'GET',
        headers: new Headers ({
            'Content-Type': 'application/json',
            Authorization: `${token}`
        })
    }).then ((res) => res.json())
    .then((bookData) => {
        this.setState({myBooks: bookData.books})
        console.log(bookData.books)
    })

    }


    componentDidMount() {
        this.FetchMyBooks();
    }

    editUpdateBook = (book: book) => {
        this.setState({ bookToUpdate: book})
        console.log(book)
    }

    updateOn = () => {
        this.setState({updateActive: true })
    }
    updateOff = () => {
        this.setState({updateActive: false})
    }

    render() { 
        return ( 
            <div>
                <Col id='titlecol' xs={6} md={4}>
                
                <h1 id='usertitle'>{localStorage.getItem("userName")}'s Library</h1>
                </Col>
               <LibraryCreate token={this.props.token} FetchMyBooks={this.FetchMyBooks}/> 
               <MyLibraryTable token={this.props.token} FetchMyBooks={this.FetchMyBooks} myBooks={this.state.myBooks} updateOn={this.updateOn} editUpdateBook={this.editUpdateBook}/>
                {this.state.updateActive ? (
              <LibraryEdit token={this.props.token} FetchMyBooks={this.FetchMyBooks} bookToUpdate={this.state.bookToUpdate} updateOff={this.updateOff}/>  ) : (<div></div>)
                }
            </div>
         );
    }
}
 
export default MyLibrary;