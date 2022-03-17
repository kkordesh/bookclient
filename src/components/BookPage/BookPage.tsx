import * as React from 'react'
import BookIdHelper from './BookIdHelper';
import BookPageTable from './BookPageTable/BookPageTable'
import BookReviewCreate from './BookReview/BookReviewCreate/BookReviewCreate';
import BookReviewEdit from './BookReview/BookReviewEdit/BookReviewEdit';
import BookReviewTable from './BookReview/BookReviewTable';
import APIURL from '../../helpers/environment'
import './BookPage.css'
import {Col, Row} from 'reactstrap'
interface BookPageProps {
token: string | null 

}
 
interface BookPageState {
    reviews: []
    
    pageId: any
    updateActive: boolean; 
    reviewToUpdate: review
    book: []
}

    export interface review {
        id: number, 
        title: string, 
        review: string, 
        rating: string, 
        bookId: string,
    }
 
class BookPage extends React.Component<BookPageProps, BookPageState> {
   constructor (props: BookPageProps) {
       super(props);
       this.state = {
           reviews: [],
           reviewToUpdate: {} as review,
           pageId: "",
           updateActive: false,
           book: []
       }
   }



bookHelper= (id: any)=> this.setState({pageId: id})



editUpdateReview = (review: review) => {
    this.setState({ reviewToUpdate: review})
    console.log(review)
}

updateOn = () => {
    this.setState({ updateActive: true})
}

updateOff = () => {
    this.setState({updateActive: false})
}

FetchTheseReviews = () => {
    const token = this.props.token 
    console.log(this.state.pageId)
    fetch(`${APIURL}/review/review/${this.state.pageId}`, {
        method: 'GET',
        headers: new Headers ({
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        })
    }).then((res) => res.json())
    .then((reviewData) => {
        this.setState({reviews: reviewData})
        console.log(reviewData)
    })
}

bookfetcher = () => {
    const token = this.props.token
    console.log(this.state.pageId)
    fetch(`${APIURL}/book/book/${this.state.pageId}`, {
        
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


componentDidMount() {
  this.bookfetcher();
}

render() { 
        return ( 
            <div>
                <BookIdHelper pageId={this.bookHelper}/>
                <Row>
                {this.state.pageId.length> 0 ?
                <Col md='5'>
                <BookPageTable bookfetcher={this.bookfetcher} book={this.state.book} pageId={this.state.pageId} token={this.props.token}/> 
                </Col>
                : <></>  }   
                <Col>
                <BookReviewCreate pageId={this.state.pageId} token={this.props.token} />
                </Col>
                </Row>
             
                <Row>
                    <Col md='2'/>
                   <Col md='8'>
                {this.state.pageId.length>0 ? 
               
               <BookReviewTable  FetchTheseReviews={this.FetchTheseReviews} token={this.props.token} pageId={this.state.pageId} updateOn={this.updateOn} editUpdateReview={this.editUpdateReview} reviews={this.state.reviews} /> : <></>   
            } 
                {this.state.updateActive ? (
                    <BookReviewEdit FetchTheseReviews={this.FetchTheseReviews} token={this.props.token} reviewToUpdate={this.state.reviewToUpdate} updateOff={this.updateOff}/>
                    ) : (<div></div>)
                    
                }
               
                </Col>
                <Col md='2'/>
                </Row>
            </div>
          );
    }
}
 
export default BookPage;