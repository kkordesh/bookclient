import * as React from 'react'

interface BookReviewTableProps {
    token: string | null 
    pageId: any 
}

interface BookReviewTableState {
    title: string, 
    review: string, 
    rating: number, 
    bookId: string, 
    reviews: []
}

interface getReviewAPI {
    title: string, 
    review: string, 
    rating: number, 
    bookId: string 
}
 
class BookReviewTable extends React.Component<BookReviewTableProps, BookReviewTableState> {
    constructor(props: BookReviewTableProps) {
        super(props);
        this.state = { 
            title: "",
            review: "",
            rating: 5,
            bookId: this.props.pageId,
            reviews: []
          };
    }

    
FetchTheseReviews = () => {
    const token = this.props.token 
    console.log(this.props.pageId)
    fetch(`http://localhost:4000/review/review/${this.props.pageId}`, {
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

componentDidMount () {
    this.FetchTheseReviews();
}


ReviewMapper = () => {
   return this.state.reviews.map((review: getReviewAPI, index) => {
       return (
           <div key={index}>
           <header>{review.title}</header>
           <p>{review.review}</p>
           <p>{review.rating}</p>
           </div>
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