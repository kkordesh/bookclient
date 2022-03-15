import * as React from 'react'
import {Link} from "react-router-dom"
import "./Logout.css"
interface LogoutProps {
    clearLocalStorage: () => void
}
 
interface LogoutState {
    
}
 
class Logout extends React.Component<LogoutProps, LogoutState> {

    render() { 
        return ( 

            <div className='logout'>
                
                <Link to='/'>
                    <button id='logout'
                    onClick={this.props.clearLocalStorage}
                    >
                        Logout
                    </button>
                </Link>
            </div>
         );
    }
}
 
export default Logout;