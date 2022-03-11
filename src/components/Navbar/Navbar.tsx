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
import BookPage from '../BookPage/BookPage';

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
          <Link to='/'>

        Home

          </Link>
        <Link to="/MyLibrary" style={{textDecoration: "none"}}>
       My Library

        </Link>
               <Logout clearLocalStorage = {this.props.clearLocalStorage} />
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

            <div className='NavbarRoute'>
                <Routes>
                    <Route  path='/' element={<Home token={this.props.token}/>} /> 
                    <Route  path='/MyLibrary' element={<MyLibrary token={this.props.token}/>} />
                    <Route  path='/BookPage/:id'  element={<BookPage token={this.props.token}/>} /> 
                               </Routes>

            </div>


            </div>
         );
    }
}
 
export default Sitebar;