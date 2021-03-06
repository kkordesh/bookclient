import * as React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap'
import APIURL from '../../../../helpers/environment'

interface BookReviewCreateProps {
    pageId: any
    token: string | null
}
 
interface BookReviewCreateState {
    title: string, 
    review: string, 
    rating: string, 
    bookId: string
    reviews: []
}
 
class BookReviewCreate extends React.Component<BookReviewCreateProps, BookReviewCreateState> {
    constructor(props: BookReviewCreateProps) {
        super(props);
        this.state = { 
            title: '', 
            review: '', 
            rating: '',
            bookId: this.props.pageId,
            reviews: []
          };
    }

FetchTheseReviews = () => {
    console.log('hello')
    const token = this.props.token 
    console.log(this.props.pageId)
    fetch(`${APIURL}/review/review/${this.props.pageId}`, {
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

refreshPage =() => {
    window.location.reload();
}

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const token = this.props.token
        e.preventDefault();
        fetch(`${APIURL}/review/`, {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title, 
                review: this.state.review, 
                rating: Number(this.state.rating),
                bookId: this.props.pageId 
            }),
            headers: new Headers ({
                'Content-Type': 'application/json',
                Authorization: `${token}` 
            })
        }).then((res) => res.json())
        .then((reviewData) => {
            console.log(reviewData);
            this.setState({title: ""});
            this.setState({review: ""});
            this.setState({rating: ''})
            this.refreshPage();
        })
    }


    render() { 
        return ( 
            <div >
                <h1 id='leavereviewtitle'>Leave a Review!</h1> 
                <Form id='reviewform'onSubmit = {this.handleSubmit} >
                    <FormGroup>
                        <Label htmlFor="title"/>
                        <Input required name='title' value={this.state.title} placeholder='Title'onChange={(e)=> this.setState({title: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="review"/>
                        <Input type='textarea'required name='review' value={this.state.review} placeholder='Review'onChange={(e)=> this.setState({review: e.target.value})}/> 
                       
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="rating"/>
                        <Input required type='select' name='rating' value={this.state.rating} placeholder='Review'onChange={(e)=> this.setState({rating: e.target.value})}>
                        <option selected={true} disabled={true}value={''}>Select Rating</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        
                            
                            
                             </Input>
                    </FormGroup>
                    <Button id='reviewbtn' type='submit'>Click to Submit</Button>
                </Form>
            </div>
         );
    }
}
 
export default BookReviewCreate;