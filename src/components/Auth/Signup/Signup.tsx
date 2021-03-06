import * as React from 'react';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import APIURL from '../../../helpers/environment'
interface SignupProps {
    updateLocalStorage: (newToken: string, storedId: string, username: string, storedAdmin: string) => void
}
 
interface SignupState {
    email: string,
    username: string, 
    password: string, 
    isAdmin: boolean,
}
 
class Signup extends React.Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props);
        this.state = {email: "", username: "", password:"", isAdmin: false,}
    };

   
    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then (
            (response) => response.json()
        ).then ((data) => {
            this.props.updateLocalStorage(data.token, data.user.id, data.user.username, data.user.isAdmin)
            console.log(data)
        }) .catch (err => {
            console.log(err)
        })
    }
  
    render() { 
        return ( 
            <div>
                  <h1 id='signuptitle'>Sign Up</h1>
            <Form  onSubmit={this.handleSubmit}  className='signupForm'>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input required type='email' onChange={(e) => this.setState({email: e.target.value})} placeholder="type email"name="email" value={this.state.email} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="username">username</Label>
                    <Input required minLength={5}onChange={(e) => this.setState({username: e.target.value})} placeholder="type username"name="lastName" value={this.state.username} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="password">password</Label>
                    <Input type='password' required minLength={5}onChange={(e) => this.setState({password: e.target.value})} placeholder="type password"name="email" value={this.state.password} />
                </FormGroup>
        

                <Button type="submit">Sign Up</Button>
            </Form>
            </div>
         );
    }
}
 
export default Signup;