import { timeStamp } from 'console';
import * as React from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalFooter, Container, ModalHeader, ModalBody} from 'reactstrap';
import APIURL from '../../../helpers/environment'



interface LibraryCreateProps {
    token: string | null
    FetchMyBooks: () => void
}
 
interface LibraryCreateState {
    title: string,
    author: string,
    genre: string, 
    summary: string, 
    image: string,
    list: string, 
    loading: boolean 
    modal: boolean
    bookData: []
}
 
class LibraryCreate extends React.Component<LibraryCreateProps, LibraryCreateState> {
    constructor(props: LibraryCreateProps) {
        super(props);
        this.state = { title:"", author: "", genre: "", summary: "", image: "", list: "", loading: false, modal: false, bookData: [] };
    }

    togglePopup = () => {
        this.setState({modal: true})
    }
    toggleClose = () => {
        this.setState({modal: false})
    }

    UploadImage = async (e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) => {
        const target = (e.target as HTMLInputElement)
        const files : File = (target.files as FileList) [0]
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
        this.setState({image: File.secure_url})
        this.setState({loading: false})
    }


    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const token = this.props.token
        e.preventDefault();
        fetch(`${APIURL}/book`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers ({
                'Content-Type': 'application/json',
                Authorization: `${token}` 
            })
        }) .then((res) => res.json())
        .then((bookData) => {
            console.log(bookData);
            this.setState({title: ""});
            this.setState({author: ""});
            this.setState({genre: ""});
            this.setState({summary:""});
            this.setState({image: ""});
            this.setState({list:""})
            this.props.FetchMyBooks();
        })
    }

    




    render() { 
        return (  
            <div>
                <Button onClick={this.togglePopup}>Log a Book!</Button>
                <Modal isOpen={this.state.modal} toggle={this.togglePopup}>
       <ModalHeader>Log a Book!</ModalHeader>
       <ModalBody>
       <Form onSubmit={this.handleSubmit}>
           <FormGroup>
               <Label htmlFor='title'/>
               <Input name='title' value={this.state.title} placeholder='Title'onChange={(e)=> this.setState({title: e.target.value})}/>
           </FormGroup>
           <FormGroup>
               <Label htmlFor='author'/>
               <Input name='author' value={this.state.author} placeholder='Author'onChange={(e)=> this.setState({author: e.target.value})}/>
           </FormGroup>
           <FormGroup>
               <Label htmlFor='genre'/>
               <Input type='select' name='genre' value={this.state.genre} onChange={(e)=> this.setState({genre: e.target.value})}>
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
               <Input name='summary' placeholder='summary'value={this.state.summary} onChange={(e)=> this.setState({summary: e.target.value})}/>
           </FormGroup>
           <FormGroup>
           <Label htmlFor='list'/>
               <Input type='select' name='list' value={this.state.list} onChange={(e)=> this.setState({list: e.target.value})}>
                   <option value="toread">To Read</option>
                   <option value="currentlyreading">Currently Reading</option>
                   <option value="completed">Completed</option>
                </Input>
           </FormGroup>
                <FormGroup>
                    <h1>Upload image</h1>
                    <Label htmlFor='image'/>
                    <Input type="file" name='file'  placeholder="Upload Image Here" onChange={this.UploadImage}/>
                    <br/>
                    {this.state.loading ? (<h3>Loading...</h3>) : <img src={this.state.image} style={{width: "300px"}}/>}
                </FormGroup>
                <ModalFooter>
           <Button type='submit'>Click to Submit</Button>
            <Button onClick={this.toggleClose}>Cancel</Button>
                </ModalFooter>
       </Form>
       </ModalBody>
       </Modal>
            </div>
        );
    }
}
 
export default LibraryCreate;