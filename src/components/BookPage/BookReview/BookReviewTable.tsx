import * as React from 'react'
import {ListGroup, ListGroupItemHeading, ListGroupItemText, ListGroupItem, Button, Col, Container, Row} from 'reactstrap'
import APIURL from './../../../helpers/environment'
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
        fetch(`${APIURL}/review/${review.id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                Authorization: `${token}`
            })
        })
        .then(() => this.props.FetchTheseReviews())
    }
       return (
        //    <ListGroup key={index}>
        //        <ListGroupItem>
        //            {review.username} wrote: 
        //        </ListGroupItem>
        //     <ListGroupItem>
        //         <ListGroupItemHeading>
        //             {review.title} rating: {review.rating}
        //         </ListGroupItemHeading>
        //     </ListGroupItem>
        //         <ListGroupItemText>
        //             {review.review}
        //         </ListGroupItemText>
        //         {review.userId === localStorage.getItem('userId') ||  (localStorage.getItem('isAdmin')) === 'true' ? 

        //         <Button id='reviewdelete' onClick={()=>{deleteReview()}}>Delete</Button> : null }
        //         {review.userId === localStorage.getItem('userId') || (localStorage.getItem('isAdmin')) === 'true' ? 
        //         <Button id='reviewedit'onClick={()=>{this.props.editUpdateReview(review); this.props.updateOn()}}>Edit</Button> : null
        //     }
        //    </ListGroup>
            <div key={index}>
              
                <Container id='reviewall'> 
                    <h4 id='reviewuser'>{review.username}</h4>
                    <Row id='reviewlinetwo'>
                        <Col md='9'>
                        <h4 id='reviewtitle'>"{review.title}"</h4>
                        </Col>
                        <Col>
                        <h4 id='reviewrating'>{review.rating}/5</h4>
                        </Col>
                    </Row>
                    <Row id='reviewlinethree'>
                        <Col md='9'>
                        <p id='reviewreview'>{review.review}</p>
                        </Col>
                        {review.userId === localStorage.getItem('userId') ||  (localStorage.getItem('isAdmin')) === 'true' ? 
                         <Col>
                          <Button id='reviewdelete' onClick={()=>{deleteReview()}}>Delete</Button>
                         </Col>
                          : null }
                            {review.userId === localStorage.getItem('userId') || (localStorage.getItem('isAdmin')) === 'true' ? 
                           <Col>
                           <Button id='reviewedit'onClick={()=>{this.props.editUpdateReview(review); this.props.updateOn()}}>Edit</Button> 
                          </Col>
                        : null}
                    </Row>
                </Container>
            </div>
       )
   })
}

    render() { 
        return (  
            <div id='allreviewtable'>
                <h1 id='allreviewstitle'>All Reviews</h1>
                {this.ReviewMapper()}
            </div>
        );
    }
}
 
export default BookReviewTable;