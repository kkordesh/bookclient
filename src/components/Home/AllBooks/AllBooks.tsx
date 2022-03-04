import * as React from 'react';
import {useEffect} from 'react';
import AllBooksTable from './AllBooksTable/AllBooksTable'

interface AllBooksProps {
    token : string | null
}
 
interface AllBooksState {
    allBooks : [string]
}

interface allBooks {
    title: string,
    author: string,
    genre: string, 
    summary: string, 
    image: string, 
    list: string
}



class AllBooks extends React.Component<AllBooksProps, AllBooksState> {
    constructor (props: AllBooksProps) {
        super(props);
        this.state = {allBooks: ['']}
    }
    
    
    FetchAllBooks = () => {
        const token = this.props.token
        fetch('http://localhost:4000/book/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization:  `${token}`,
            }),
        }) .then ((res) => res.json())
        .then((bookData) => {
            this.setState({allBooks: bookData})
            console.log(bookData)
        })
    }

    componentDidMount() {
       this.FetchAllBooks();
       //console.log(this.props.token)
    }
        
    render() { 
        return ( 
            <div>
                <AllBooksTable FetchAllBooks = {this.FetchAllBooks}/>
            </div>
         );
    }
}
 
export default AllBooks;