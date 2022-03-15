import * as React from 'react';
import AllBooksTable from '../AllBooks/AllBooksTable/AllBooksTable'
import AllBooksEdit from '../AllBooks/AllBooksEdit/AllBooksEdit'
import './AllBooks.css'
import APIURL from '../../../helpers/environment'

interface AllBooksProps {
    token : string | null
}
 
interface AllBooksState {
    allBooks : []
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
 


class AllBooks extends React.Component<AllBooksProps, AllBooksState> {
    constructor (props: AllBooksProps) {
        super(props);
        this.state = {allBooks: [], updateActive: false, bookToUpdate: {} as book }
    }
    
    
    FetchAllBooks = () => {
        const token = this.props.token
        fetch(`${APIURL}/book/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization:  `${token}`,
            }),
        }).then ((res) => res.json())
        .then((bookData) => {
            this.setState({allBooks: bookData})
            console.log(bookData)
        })
    }

    componentDidMount() {
       this.FetchAllBooks();
       //console.log(this.props.token)
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
                <AllBooksTable token={this.props.token} FetchAllBooks = {this.FetchAllBooks} allBooks={this.state.allBooks} updateOn={this.updateOn} editUpdateBook={this.editUpdateBook}/>

                {this.state.updateActive ? (
              <AllBooksEdit token={this.props.token} FetchAllBooks={this.FetchAllBooks} bookToUpdate={this.state.bookToUpdate} updateOff={this.updateOff}/>  ) : (<div></div>)
                }
            </div>
         );
    }
}
 
export default AllBooks;