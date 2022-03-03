import * as React from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup'

interface AuthProps {
    updateLocalStorage: (newToken: string) => void;
    token: string | null;
}
 
interface AuthState {
    
}
 
class Auth extends React.Component<AuthProps, AuthState> {

    render() { 
        //this.props.updateLocalStorage

        return ( 
            <div>
                Hello from Auth 
                <Login updateLocalStorage={this.props.updateLocalStorage}/>
                <Signup updateLocalStorage={this.props.updateLocalStorage}/>
            </div>
         );
    }
}
 
export default Auth;