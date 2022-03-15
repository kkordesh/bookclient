import * as React from 'react'
import {ListGroup, ListGroupItemHeading, ListGroupItemText, ListGroupItem, Button} from 'reactstrap'
interface BookReviewTableProps {
    token: string | null 
    pageId: any 
    updateOn: Function,
    editUpdateReview: Function 
    FetchTheseReviews: Function 
    reviews: []
}

interface BookReviewTableState {
    title: string, 
    review: string, 
    rating: number, 
    bookId: string, 
   
    id: string
    userId: string
    username: string
}

interface getReviewAPI {
    title: string, 
    review: string, 
    rating: number, 
    bookId: string 
    id: string, 
    userId: string
    username: string 
}
 


class BookReviewTable extends React.Component<BookReviewTableProps, BookReviewTableState> {
    constructor(props: BookReviewTableProps) {
        super(props);
        this.state = { 
            title: "",
            review: "",
            rating: 5,
            bookId: this.props.pageId,
            
            id: " ",
            userId: "",
            username: ""
          };
    }

    


componentDidMount () {
    this.props.FetchTheseReviews();
}


ReviewMapper = () => {
   return this.props.reviews.map((review: getReviewAPI, index) => {

    const deleteReview = () => {
        const token = this.props.token
        fetch(`http://localhost:4000/review/${review.id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                Authorization: `${token}`
            })
        })
        .then(() => this.props.FetchTheseReviews())
    }
       return (
           <ListGroup key={index}>
               <ListGroupItem>
                   {review.username} wrote: 
               </ListGroupItem>
            <ListGroupItem>
                <ListGroupItemHeading>
                    {review.title} rating: {review.rating}
                </ListGroupItemHeading>
            </ListGroupItem>
                <ListGroupItemText>
                    {review.review}
                </ListGroupItemText>
                {review.userId === localStorage.getItem('userId') ||  (localStorage.getItem('isAdmin')) === 'true' ? 
                <Button onClick={()=>{deleteReview()}}>delete</Button> : null }
                {review.userId === localStorage.getItem('userId') || (localStorage.getItem('isAdmin')) === 'true' ? 
                <Button onClick={()=>{this.props.editUpdateReview(review); this.props.updateOn()}}>Edit</Button> : null
            }
           </ListGroup>
       )
   })
}

    render() { 
        return (  
            <div>
                {this.ReviewMapper()}
            </div>
        );
    }
}
 
export default BookReviewTable;