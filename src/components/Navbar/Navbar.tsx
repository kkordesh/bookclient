import * as React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    Container, 
    Nav,
    NavItem,
    
} from 'react-bootstrap'
import {Row, Col} from 'reactstrap'
import Logout from "./logout/Logout"
import Home from '../Home/Home'
import MyLibrary from '../MyLibrary/MyLibrary';
import BookPage from '../BookPage/BookPage';
import './Navbar.css'
import logo6 from '../assets/logo7.png'
interface SitebarProps {
    clearLocalStorage: () => void
    token: string | null
}
 
interface SitebarState {


}
 
class Sitebar extends React.Component<SitebarProps, SitebarState> {
  


    render() { 
        return ( 
            <div>

         
<Navbar className='bar'expand="lg">
  <Container style={{marginRight:'0%'}}>
    
        <Col md='2'> 
    <Navbar.Brand>
      <img id='logo' src={logo6} style={{ margin: '0%'}}/>
    </Navbar.Brand>
        </Col>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
          
      <Nav id='homelink' >
        
          <Link to='/' style={{textDecoration: "underline"}}>

        Home

          </Link>
        
      </Nav>
      <Nav id='liblink'>

        <Link to="/MyLibrary" style={{textDecoration: "underline"}}>
       My Library
        </Link>
      </Nav>
     
         
            
    </Navbar.Collapse>
    

  </Container>
               <Logout clearLocalStorage = {this.props.clearLocalStorage} />
             
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