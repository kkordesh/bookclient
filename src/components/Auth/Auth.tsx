import * as React from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup'
import {Button} from 'reactstrap'
import './Auth.css'


interface AuthProps {
    updateLocalStorage: (newToken: string, storedId: string, storedName: string, storedAdmin: string) => void;
    token: string | null;
}
 
interface AuthState {
    LoginVisible: boolean 
}
 
class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = {LoginVisible: true}
    }

    handleToggle () {
        this.setState({LoginVisible: !this.state.LoginVisible})
    }

    
    render() { 
        //this.props.updateLocalStorage

        return ( 
            <div id='loginpage' className='overlay'>
                <h1 id='welcometitle'>Welcome to BookShelf</h1>
                <h2>Sign up or log in to get started!</h2>
                { this.state.LoginVisible === true ? (
                    <Login updateLocalStorage={this.props.updateLocalStorage}/>
                    
                    ) : (
                        <Signup updateLocalStorage={this.props.updateLocalStorage}/>
                        )}
                <br />
                    <Button id='togbtn'onClick={(e) => this.setState({LoginVisible: !this.state.LoginVisible})}>Toggle LogIn/SignUp</Button>
                       
            </div>
         );
    }
}
 
export default Auth;