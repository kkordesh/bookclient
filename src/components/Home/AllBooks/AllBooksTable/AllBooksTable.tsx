import * as React from 'react'
import AllBooks from '../AllBooks';
import { Card, ListGroup, ListGroupItem,} from 'react-bootstrap'
import { stringify } from 'querystring';
import BookPage from '../../../BookPage/BookPage'
import {Routes, Route, Link} from 'react-router-dom'
import {
    Navbar,
    Container, 
    Nav,
    
} from 'react-bootstrap'


interface AllBooksTableProps {
    FetchAllBooks: () => void
    allBooks: []
}

interface AllBooksTableState {
    id: string, 
    title: string,
    author: string,
    genre: string,
    summary: string
}

interface getBookAPI {
    id: string
    title: string, 
    author: string,
    genre: string, 
    summary: string,
}

class AllBooksTable extends React.Component<AllBooksTableProps, AllBooksTableState> {
    constructor(props: AllBooksTableProps) {
        super(props);
        this.state = { id: "", title: "", author: "", genre: "", summary: "" }

    }




    allBookMapper = () => {
        return this.props.allBooks.map((book: getBookAPI, index) => {
            return (

                <Card key={index} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                            {book.summary}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{book.author}</ListGroupItem>
                        <ListGroupItem>{book.genre}</ListGroupItem>
                        <Link to={`/BookPage/${book.id}`}>
                            See More
                        </Link>
                      
                    </ListGroup>
                        

                </Card>
            )
        })
    
    }


    render() {
        return (
            <div>
                {this.allBookMapper()}

                  


            </div>
        );
    }
}

export default AllBooksTable;