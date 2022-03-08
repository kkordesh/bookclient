import * as React from 'react'
import BookIdHelper from './BookIdHelper';
import BookPageTable from './BookPageTable/BookPageTable'
import BookReviewCreate from './BookReview/BookReviewCreate/BookReviewCreate';
import BookReviewTable from './BookReview/BookReviewTable';
interface BookPageProps {
token: string | null 

}
 
interface BookPageState {
    reviews: []
    thisReview: review 
    pageId: any
}

    export interface review {
        id: number, 
        title: string, 
        review: number, 
        bookId: string
    }
 
class BookPage extends React.Component<BookPageProps, BookPageState> {
   constructor (props: BookPageProps) {
       super(props);
       this.state = {
           reviews: [],
           thisReview: {} as review,
           pageId: ""
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



componentDidMount() {
  
}
render() { 
        return ( 
            <div>
                <BookIdHelper pageId={this.bookHelper}/>
                The ID of this book is  {this.state.pageId}
                <BookReviewCreate pageId={this.state.pageId} token={this.props.token} />
                {this.state.pageId.length>0 ?  
                <BookReviewTable token={this.props.token} pageId={this.state.pageId} /> : <></>
                
            } 
            </div>
          );
    }
}
 
export default BookPage;