
import * as React from 'react'
import { Card, ListGroup, ListGroupItem, Button, ButtonGroup} from 'react-bootstrap'
import { TabContent, TabPane, Nav, NavItem, NavLink, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames'
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

interface MyLibraryTableProps {
    token: string | null
    FetchMyBooks: () => void 
    myBooks: getMyBookAPI[]
    updateOn: Function,
    editUpdateBook: Function 
}

interface MyLibraryTableState {
    title: string, 
    author: string, 
    genre: string, 
    summary: string, 
    id: string, 
    list: string, 
    bookData: []
    activeTab: string 
    
}

interface getMyBookAPI {
    id: string, 
    title: string,
    author: string,
    genre: string, 
    summary: string,
    list: string,  
    image: string, 

}



 
class MyLibraryTable extends React.Component<MyLibraryTableProps, MyLibraryTableState> {
    constructor(props: MyLibraryTableProps) {
        super(props);
        this.state = { title: "", author: "", genre: "", summary: "", id:"", list: "", bookData: [], activeTab: '1', 
        };
    }
    
    toggle(tab: string) {
        if(this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    }

    MyFilteredBookMapper = (filterType: "toread" | "currentlyreading" | "completed") => {
        
        return this.props.myBooks.filter((book: getMyBookAPI) => book.list === filterType).map((book: getMyBookAPI, index) => {
            
            
            
            const deleteBook = () => {
                const token = this.props.token
                fetch(`http://localhost:4000/book/${book.id}`, {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    })
                })
                .then(() => this.props.FetchMyBooks())
            }
            
         
            return (
              <Card style={{ width: '26rem' }}>
              <Row className='no-gutters'>
              <Col md={5} lg={5}  >
              <Card.Img variant="top" src={book.image} />
              </Col>
              <Col>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  By: {book.author}
                </Card.Text>
                <ListGroup className="list-group-flush">
                                    <ListGroupItem>genre: {book.genre}</ListGroupItem>
                                    <Link to={`/BookPage/${book.id}`}>
                                        Summary/Reviews
                                    </Link>
                                    <ListGroupItem><Button onClick={() => {deleteBook()}}>Delete</Button>
                                    <Button onClick={()=>{this.props.editUpdateBook(book); this.props.updateOn()}}>Update</Button>
                                    </ListGroupItem>
                                </ListGroup>
              </Card.Body>
              </Col>
              </Row>
            </Card>
            
            )
        })
    }
    myBookMapper = () => {
        return this.props.myBooks.map((book: getMyBookAPI, index) => {
            
            
            
            const deleteBook = () => {
                const token = this.props.token
                fetch(`http://localhost:4000/book/${book.id}`, {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    })
                })
                .then(() => this.props.FetchMyBooks())
            }
            
         
            return (

              <>
         

         <Card style={{ width: '25rem' }}>
  <Row className='no-gutters'>
  <Col md={5} lg={5}  >
  <Card.Img variant="top" src={book.image} />
  </Col>
  <Col>
  <Card.Body>
    <Card.Title>{book.title}</Card.Title>
    <Card.Text>
      By: {book.author}
    </Card.Text>
    <ListGroup className="list-group-flush">
                        <ListGroupItem>genre: {book.genre}</ListGroupItem>
                        <Link to={`/BookPage/${book.id}`}>
                            Summary/Reviews
                        </Link>
                        <ListGroupItem><Button onClick={() => {deleteBook()}}>Delete</Button>
                        <Button onClick={()=>{this.props.editUpdateBook(book); this.props.updateOn()}}>Update</Button>
                        </ListGroupItem>
                    </ListGroup>
  </Card.Body>
  </Col>
  </Row>
</Card>






  
                </>
            )
        })
    
    }


  

    render() { 
       console.log(this.props.myBooks)
        return ( 
            <div>
                     <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
             
            >
              All My Books
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
              
              
            >
              Books To Read
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Currently Reading
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Completed Books
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4>My Library</h4>
                {this.myBookMapper()}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
             <h4>Books To Read</h4>
           
            {this.MyFilteredBookMapper("toread") }
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
             <h4>Currently Reading</h4>
            {this.MyFilteredBookMapper("currentlyreading")}
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
             <h4>Completed</h4>
            {this.MyFilteredBookMapper("completed")}
            </Row>
          </TabPane>
        </TabContent>
            

                {/* {this.myBookMapper()} */}
            </div>
         );
    }
}
 
export default MyLibraryTable;