import * as React from 'react'



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
        fetch(`http://localhost:4000/book/book/${this.props.pageId}`, {
            
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                Authorization: `${token}`
            })
        }) .then ((res) => res.json())
        .then((bookData) => {
            this.setState({book: bookData})
            console.log(bookData, 'HELLO')
        })
    }
    


        BookMap = () => {
            return this.state.book.map((book: getThisBookApi, index) => {
                return (
                    <div>
                    <h3>Posted by: {book.username}</h3>
                    <img src={book.image}/>
                    <h1>{book.title} by {book.author}</h1>
                    <p>{book.summary}</p>
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