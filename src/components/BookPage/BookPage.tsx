import * as React from 'react'
import BookIdHelper from './BookIdHelper';
import BookPageTable from './BookPageTable/BookPageTable'
import BookReviewCreate from './BookReview/BookReviewCreate/BookReviewCreate';
import BookReviewEdit from './BookReview/BookReviewEdit/BookReviewEdit';
import BookReviewTable from './BookReview/BookReviewTable';
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

//    FetchAllReviews = () => {
//        const token = this.props.token 
//        fetch("http://localhost:4000/review/", {
//            method: 'GET',
//            headers: new Headers ({
//                'Content-Type': 'application/json',
//                Authorization: `${token}`,
//            })
//        }) .then((res) => res.json())
//        .then((reviewData) => {
//            this.setState({reviews: reviewData})
//            console.log(reviewData)
//        })
//    }


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
    fetch(`http://localhost:4000/review/review/${this.state.pageId}`, {
        method: 'GET',
        headers: new Headers ({
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        })
    }) .then((res) => res.json())
    .then((reviewData) => {
        this.setState({reviews: reviewData})
        console.log(reviewData)
    })
}

bookfetcher = () => {
    const token = this.props.token
    console.log(this.state.pageId)
    fetch(`http://localhost:4000/book/book/${this.state.pageId}`, {
        
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


componentDidMount() {
  this.bookfetcher();
}

render() { 
        return ( 
            <div>
                <BookIdHelper pageId={this.bookHelper}/>
               
                {this.state.pageId.length> 0 ?
                <BookPageTable bookfetcher={this.bookfetcher} book={this.state.book} pageId={this.state.pageId} token={this.props.token}/> : <></>
                    }   
                <BookReviewCreate pageId={this.state.pageId} token={this.props.token} />
                {this.state.pageId.length>0 ?  
                <BookReviewTable FetchTheseReviews={this.FetchTheseReviews} token={this.props.token} pageId={this.state.pageId} updateOn={this.updateOn} editUpdateReview={this.editUpdateReview} reviews={this.state.reviews} /> : <></>   
            } 
                {this.state.updateActive ? (
                    <BookReviewEdit FetchTheseReviews={this.FetchTheseReviews} token={this.props.token} reviewToUpdate={this.state.reviewToUpdate} updateOff={this.updateOff}/>
                ) : (<div></div>)

                }
            </div>
          );
    }
}
 
export default BookPage;