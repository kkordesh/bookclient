import React from 'react'
import { review } from '../../BookPage';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

interface BookReviewEditProps {
token : string | null,
reviewToUpdate: review;
updateOff: Function 
FetchTheseReviews: Function 

}
 
interface BookReviewEditState {
    editId: number; 
    editTitle: string; 
    editReview: string; 
    editRating: string; 
    editbookId: string 
    modal: boolean; 
}
 
class BookReviewEdit extends React.Component<BookReviewEditProps, BookReviewEditState> {
    constructor(props: BookReviewEditProps) {
        super(props);
        this.state = { 
            editId: this.props.reviewToUpdate.id, 
            editTitle: this.props.reviewToUpdate.title, 
            editReview: this.props.reviewToUpdate.review,
            editRating: this.props.reviewToUpdate.rating,
            editbookId: this.props.reviewToUpdate.bookId,
            modal: false
          };
    }

    reviewUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        const token = this.props.token 
         e.preventDefault();
         fetch(`http://localhost:4000/review/${this.props.reviewToUpdate.id}`, {
             method: 'PUT',
             body: JSON.stringify({
                 title: this.state.editTitle, 
                rating: Number(this.state.editRating),
                review: this.state.editReview
             }),
             headers: new Headers ({
                 'Content-Type': 'application/json',
                 Authorization: `${token}`
             }),
         }) .then ((res) => res.json())
         .then(json => {
             this.props.updateOff();
            this.props.FetchTheseReviews();
            console.log(json)
         }) .catch (err => console.log(err))
         ;
    };

    toggle = () => {
        this.props.updateOff()
    }



    render() { 
        return ( 
            <div>
                <Modal isOpen = {true} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                    <ModalBody>
                        <Form onSubmit = {(e) => this.reviewUpdate(e)}>
                            <FormGroup>
                                <Label htmlFor="title"/>
                                <Input id="title" type='text' value={this.state.editTitle} placeholder='title' onChange={(e) => this.setState({editTitle: e.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label HtmlFor="review"/>
                                <Input id="review" type="text" value={this.state.editReview} placeholder='Review' onChange={(e) => this.setState({editReview: e.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="rating"/>
                                <Input id="rating" type="select" value={this.state.editRating} placeholder='rating' onChange={(e) => this.setState({editRating: e.target.value})}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Input>
                            </FormGroup>
                            <Button type='submit'>Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
         );
    }
}
 
export default BookReviewEdit;