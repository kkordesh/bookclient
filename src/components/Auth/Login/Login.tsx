import * as React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
interface LoginProps {
    updateLocalStorage: (newToken: string, storedId: string, storedName: string, storedAdmin: string) => void
}
 
interface LoginState {
    username: string,
    password: string, 
}
 
class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {username: "", password: ""}
    };


    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:4000/user/login', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        }) .then (
            (response) => response.json()
        ).then((data) => {
            this.props.updateLocalStorage(data.token, data.user.id, data.user.username, data.user.isAdmin);
            console.log(data)
        }) .catch (err => {
            console.log(err)
        })
    }

    render() { 
        return ( 
            <div>
                <h1 id='login'>Login</h1>
            <Form onSubmit={this.handleSubmit} className='loginForm'>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input onChange={(e)=> this.setState({username: e.target.value})} placeholder="type username"name="username" value={this.state.username} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input onChange={(e)=>this.setState({password: e.target.value})} name="password" placeholder='type password' value={this.state.password}/>
                </FormGroup>
                <Button type='submit'>Login</Button>
            </Form>
            </div>
         );
    }
}
 
export default Login;
