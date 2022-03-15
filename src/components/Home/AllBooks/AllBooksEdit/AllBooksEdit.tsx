import React from 'react'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {book} from '../AllBooks'
import APIURL from '../../../../helpers/environment'
interface AllBooksEditProps {
    bookToUpdate: book;
    updateOff: Function;
    token: string | null; 
    FetchAllBooks: Function
}
 
interface AllBooksEditState {
    editId: number; 
    editTitle: string; 
    editAuthor: string;
    editGenre: string;
    editSummary: string; 
    editImage: string; 
    editList: string; 
    modal: boolean; 
    loading: boolean 
}
 
class AllBooksEdit extends React.Component<AllBooksEditProps, AllBooksEditState> {
    constructor(props: AllBooksEditProps) {
        super(props);
        this.state = { 
            editId: this.props.bookToUpdate.id,
            editTitle: this.props.bookToUpdate.title,
            editAuthor: this.props.bookToUpdate.author, 
            editGenre: this.props.bookToUpdate.genre,
            editSummary: this.props.bookToUpdate.summary,
            editImage: this.props.bookToUpdate.image,
            editList:this.props.bookToUpdate.list,
            modal: false, 
            loading: false 
          };
    }

    UploadImage = async (e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) => {
        const target = (e.target as HTMLInputElement)
        const files : File = (target.files as FileList)[0]
        const data = new FormData();
        data.append("file", files);
        data.append("upload_preset", "bookapp");
        this.setState({loading: true});
        const res = await fetch (
            "https://api.cloudinary.com/v1_1/dw451lydk/image/upload", 
            {
                method: "POST",
                body: data, 
            }
        )
        const File = await res.json();

        console.log(File)
        this.setState({editImage: File.secure_url})
        this.setState({loading: false})
    }



     bookUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        const token = this.props.token 
         e.preventDefault();
         fetch(`${APIURL}/book/${this.props.bookToUpdate.id}`, {
             method: 'PUT',
             body: JSON.stringify({
                 title: this.state.editTitle, 
                 author: this.state.editAuthor,
                 genre: this.state.editGenre,
                 summary:this.state.editSummary,
                 list: this.state.editList,
                 Image: this.state.editImage, 
             }),
             headers: new Headers ({
                 'Content-Type': 'application/json',
                 Authorization: `${token}`
             }),
         }).then ((res) => {
             this.props.FetchAllBooks();
             this.props.updateOff();
         });
    };

    toggle = () => {
        this.props.updateOff()
    }



    render() { 
        return ( 
            <div>
                         <Modal isOpen = {true} toggle={this.toggle}>
                     <ModalHeader toggle={this.toggle}>Update</ModalHeader>
                     <ModalBody>
                         <Form onSubmit = {(e) => this.bookUpdate(e)} >
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input id="title" type="text" name="title" value={this.state.editTitle} placeholder="title" onChange={(e) => this.setState({editTitle: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
               <Label htmlFor='author'/>
               <Input name='author' value={this.state.editAuthor} placeholder='Author'onChange={(e)=> this.setState({editAuthor: e.target.value})}/>
           </FormGroup>
           <FormGroup>
               <Label htmlFor='genre'/>
               <Input type='select' name='genre' value={this.state.editGenre} onChange={(e)=> this.setState({editGenre: e.target.value})}>
                   <option value="Action/Adventrue">Action/Adventure</option>
                   <option value="Classic">Classic</option>
                   <option value="Detective/Mystery">Detective/Mystery</option>
                   <option value="Fantasy">Fantasy</option>
                   <option value="Historical Fiction">Historical Fiction</option>
                   <option value="Horror/Thriller">Horror/Thriller</option>
                   <option value="Non-Fiction">Non-Fiction</option>
                   <option value="Romance">Romance</option>
                   <option value="Sci-Fi">Sci-Fi</option>
                </Input>
           </FormGroup>
           <FormGroup>
               <Label htmlFor='summary'/>
               <Input name='summary' placeholder='summary'value={this.state.editSummary} onChange={(e)=> this.setState({editSummary: e.target.value})}/>
           </FormGroup>
           <FormGroup>
           <Label htmlFor='list'/>
               <Input type='select' name='list' value={this.state.editList} onChange={(e)=> this.setState({editList: e.target.value})}>
                   <option value="toread">To Read</option>
                   <option value="currentlyreading">Currently Reading</option>
                   <option value="completed">Completed</option>
                </Input>
           </FormGroup>
           <FormGroup>
               <h3>Upload Image</h3>
               <Label htmlFor='image'/>
               <Input type='file' name='file' placeholder='Upload Image' onChange={this.UploadImage}/>
               <br/>
               {this.state.loading? (<h3>Loading...</h3>) : <img src={this.state.editImage} style={{width: '8rem'}} alt={this.state.editTitle}/>}
           </FormGroup>

                        <Button type="submit"> Submit </Button>
                         </Form>
                     </ModalBody>
                 </Modal>
            </div>
         );
    }
}
 
export default AllBooksEdit;