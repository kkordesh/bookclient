import * as React from 'react'
import './BookPageTable.css'
import {Row, Col, Container} from 'reactstrap'
import APIURL from '../../../helpers/environment'
interface BookPageTableProps {
    pageId: any
    token: string | null 
    book: [],
    bookfetcher: Function 
}
 
interface BookPageTableState {
    id: string
    title: string, 
    author: string, 
    genre: string, 
    summary: string, 
    list: string, 
    image: string 
    book: []
    username: string
}

interface getThisBookApi {
    id: string,
    title: string,
    author: string, 
    genre: string, 
    summary: string, 
    list: string, 
    image: string 
    username: string 
}
 
class BookPageTable extends React.Component<BookPageTableProps, BookPageTableState> {
    constructor(props: BookPageTableProps) {
        super(props);
        this.state = { 
            id: this.props.pageId,
            title: "",
            author: "",
            genre: "",
            summary: "",
            list: "",
            image: "",
            book: [],
            username: ""
         };
    }

    bookfetcher = () => {
        const token = this.props.token
        console.log(this.props.pageId)
        fetch(`${APIURL}/book/book/${this.props.pageId}`, {
            
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                Authorization: `${token}`
            })
        }).then ((res) => res.json())
        .then((bookData) => {
            this.setState({book: bookData})
            console.log(bookData, 'HELLO')
        })
    }
    


        BookMap = () => {
            return this.state.book.map((book: getThisBookApi, index) => {
                return (
      
                    <div id='bookpagetable'>
                        <Container>
                        <h1 id='justbooktitle'>{book.title}</h1>
                        </Container>
                        <Row id='imageandsummary' style={{width: ''}}>
                            <Col md='5'>
                            <img src={book.image} style={{width: '60%', marginLeft: '30%'}}/>
                            </Col>
                            <Col> 
                            <p id='justsummary'>{book.summary}</p>
                            <Row>
                                <p>posted by: {book.username}</p>
                            </Row>
                            </Col>
                        </Row>
                      
                    </div>
                )
            })
        }
    
    componentDidMount () {
    this.bookfetcher();
    }


    render() { 
        return ( 
            <div>
                {this.BookMap()}
          
            </div>
         );
    }
}
 
export default BookPageTable;