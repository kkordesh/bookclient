import * as React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    Container, 
    Nav,
    
} from 'react-bootstrap'
import Logout from "./logout/Logout"
import Home from '../Home/Home'
import MyLibrary from '../MyLibrary/MyLibrary';

interface SitebarProps {
    clearLocalStorage: () => void
    token: string | null
}
 
interface SitebarState {


}
 
class Sitebar extends React.Component<SitebarProps, SitebarState> {
    constructor(props: SitebarProps) {
        super(props);
      
    } 


    render() { 
        return ( 
            <div>

         
<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand>Books</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/Home">Home</Nav.Link>
        <Nav.Link href="/MyLibrary">My Library</Nav.Link>
               <Logout clearLocalStorage = {this.props.clearLocalStorage} />
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

            <div className='NavbarRoute'>
                <Routes>
                    <Route  path='/Home' element={<Home token={this.props.token}/>} /> 
                    <Route  path='/MyLibrary' element={<MyLibrary token={this.props.token}/>} />

                </Routes>

            </div>


            </div>
         );
    }
}
 
export default Sitebar;