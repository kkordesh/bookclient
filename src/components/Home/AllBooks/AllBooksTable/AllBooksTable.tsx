import * as React from 'react'
import AllBooks from '../AllBooks';
import { Card, ListGroup, ListGroupItem, } from 'react-bootstrap'
import { stringify } from 'querystring';


interface AllBooksTableProps {
    FetchAllBooks: () => void
    allBooks: []
}

interface AllBooksTableState {
    title: string,
    author: string,
    genre: string,
    summary: string
}

interface getBookAPI {
    title: string, 
    author: string,
    genre: string, 
    summary: string,
}

class AllBooksTable extends React.Component<AllBooksTableProps, AllBooksTableState> {
    constructor(props: AllBooksTableProps) {
        super(props);
        this.state = { title: "", author: "", genre: "", summary: "" }

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