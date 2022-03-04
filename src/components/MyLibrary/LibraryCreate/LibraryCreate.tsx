import * as React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';




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
}
 
class LibraryCreate extends React.Component<LibraryCreateProps, LibraryCreateState> {
    constructor(props: LibraryCreateProps) {
        super(props);
        this.state = { title:"", author: "", genre: "", summary: "", image: "", list: ""  };
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const token = this.props.token
        e.preventDefault();
        fetch('http://localhost:4000/book', {
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
       <h3>Log a Book</h3>
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
               <Label htmlFor='image'/>
               <Input name='image' placeholder='image'value={this.state.image} onChange={(e)=> this.setState({image: e.target.value})}/>
           </FormGroup>
        
           <Button type='submit'>Click to Submit</Button>
       </Form>
            </div>
        );
    }
}
 
export default LibraryCreate;