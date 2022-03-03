import * as React from 'react'
import {Link} from "react-router-dom"

interface LogoutProps {
    clearLocalStorage: () => void
}
 
interface LogoutState {
    
}
 
class Logout extends React.Component<LogoutProps, LogoutState> {

    render() { 
        return ( 
            <div>
                <Link to='/'>
                    <button
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