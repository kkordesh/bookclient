import { stringify } from 'querystring';
import * as React from 'react'
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { List } from 'reactstrap';

interface MyLibraryTableProps {
    token: string | null
    FetchMyBooks: () => void 
    myBooks: []
    updateOn: Function,
    editUpdateBook: Function 
}
 
interface MyLibraryTableState {
    title: string, 
    author: string, 
    genre: string, 
    summary: string, 
    id: string, 
}

interface getMyBookAPI {
    id: string, 
    title: string,
    author: string,
    genre: string, 
    summary: string,
    list: string,  
    image: string, 

}



 
class MyLibraryTable extends React.Component<MyLibraryTableProps, MyLibraryTableState> {
    constructor(props: MyLibraryTableProps) {
        super(props);
        this.state = { title: "", author: "", genre: "", summary: "", id:""  };
    }
    
    myBookMapper = () => {
        return this.props.myBooks.map((book: getMyBookAPI, index) => {
            
            
            
            const deleteBook = () => {
                const token = this.props.token
                fetch(`http://localhost:4000/book/${book.id}`, {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    })
                })
                .then(() => this.props.FetchMyBooks())
            }
            
         
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
                        <ListGroupItem><Button onClick={() => {deleteBook()}}>Delete</Button>
                        <Button onClick={()=>{this.props.editUpdateBook(book); this.props.updateOn()}}>Update</Button>
                        </ListGroupItem>
                    </ListGroup>
                    
                </Card>
            )
        })
    
    }




    render() { 
       console.log(this.props.myBooks)
        return ( 
            <div>
                {this.myBookMapper()}
            </div>
         );
    }
}
 
export default MyLibraryTable;