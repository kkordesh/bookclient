import * as React from 'react'
import { Card, ListGroup, ListGroupItem, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './AllBooksTable.css'
import { NavItem, Nav, NavLink, TabContent, TabPane, Button} from 'reactstrap';
import classnames from 'classnames';
import APIURL from '../../../../helpers/environment'

interface AllBooksTableProps {
    FetchAllBooks: () => void
    allBooks: getBookAPI[]
    token: string | null 
    updateOn: Function, 
    editUpdateBook: Function
}

interface AllBooksTableState {
    id: string, 
    title: string,
    author: string,
    genre: string,
    summary: string
    image: string, 
    activeTab: string
}

interface getBookAPI {
    id: string
    title: string, 
    author: string,
    genre: string, 
    summary: string,
    image: string, 
    list: string, 
}



class AllBooksTable extends React.Component<AllBooksTableProps, AllBooksTableState> {
    constructor(props: AllBooksTableProps) {
        super(props);
        this.state = { id: "", title: "", author: "", genre: "", summary: "", image: "", activeTab: '1'}

    }

    toggle(tab: string) {
        if(this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    }
    
    AllFilteredBookMapper = (filterType: "Action/Adventure" | "Classic" | "Detective/Mystery" | "Fantasy" | "Historical Fiction" | "Horror/Thriller" | "Non-Fiction" | "Romance" | "Sci-Fi") => {

        return this.props.allBooks.filter((book: getBookAPI) => book.genre === filterType).map((book: getBookAPI, index) => {
                  
          const deleteBook = () => {
            const token = this.props.token
            fetch(`${APIURL}/book/${book.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                })
            })
            .then(() => this.props.FetchAllBooks())
        }



            return (

            
<Card key={index} style={{width: '23rem', margin: '15px'}}>
  <Row style={{marginTop: '20px'}}>
  <Col md={5} lg={5}  >
  <Card.Img variant="top" src={book.image} style={{minHeight: '80%', paddingTop: '2%', paddingBottom: '2%' }}/>
  </Col>
  <Col>
  <Card.Body className='cardbody'>
    <Card.Title>{book.title}</Card.Title>
    <Card.Text style={{marginBottom: '5px'}}>
      By: {book.author}
    </Card.Text>
    <ListGroup className="list-group-flush">
                        <ListGroupItem>genre: {book.genre}</ListGroupItem>
                        <Link to={`/BookPage/${book.id}`}>
                            Summary/Reviews
                        </Link>
                        <ListGroupItem>
                      {localStorage.getItem("isAdmin") === 'true' ?
                      <Button onClick={()=>{deleteBook()}}>Delete</Button>
              
                     : null }
                     {localStorage.getItem("isAdmin") === 'true' ?
                       <Button onClick={()=>{this.props.editUpdateBook(book); this.props.updateOn()}}>Update</Button>
                     : null}   
                        </ListGroupItem>

                    </ListGroup>
  </Card.Body>
  </Col>
  </Row>
</Card>


            )
        })
    
    }



    allBookMapper = () => {
        return this.props.allBooks.map((book: getBookAPI, index) => {

              
          const deleteBook = () => {
            const token = this.props.token
            fetch(`${APIURL}/book/${book.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                })
            })
            .then(() => this.props.FetchAllBooks())
        }


            return (

              
            
<Card key={index} style={{ width: '23rem', margin: '15px'  }}>
  
  <Row style={{marginTop: '20px'}}>
  <Col md={5} lg={5}  >
  <Card.Img variant="top" src={book.image} style={{minHeight: '80%', maxHeight: '100%', paddingTop: '2%', paddingBottom: '2%'}} />
  </Col>
  <Col>
  <Card.Body className='cardbody'>
    <Card.Title>{book.title}</Card.Title>
    <Card.Text style={{marginBottom: '5px'}}>
      By: {book.author}
    </Card.Text>
    <ListGroup className="list-group-flush">
                        <ListGroupItem>genre: {book.genre}</ListGroupItem>
                        <Link to={`/BookPage/${book.id}`}>
                            Summary/Reviews
                        </Link>
                        <ListGroupItem>
                      {localStorage.getItem("isAdmin") === 'true' ?
                      <Button onClick={()=>{deleteBook()}}>Delete</Button>
                      
                      : null }
                     {localStorage.getItem("isAdmin") === 'true' ?
                       <Button onClick={()=>{this.props.editUpdateBook(book); this.props.updateOn()}}>Update</Button>
                       : null}   
                        </ListGroupItem>

                    </ListGroup>
  </Card.Body>
  </Col>
  </Row>
</Card>

               




            )
        })
    
    }


    render() {
        return (
            <div className='hometable'>
                         <Row>
            <Col xs="6" sm="4" md="2">
              <Nav className='homenav' tabs vertical pills>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === '1'})}
                    onClick={() => {
                      this.toggle('1');
                    }}
                  >
                    All Books
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === '2'})}
                    onClick={() => {
                      this.toggle('2');
                    }}
                  >
                    Action/Adventure
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === '3'})}
                    onClick={() => {
                      this.toggle('3');
                    }}
                  >
                    Classic
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === '4'})}
                    onClick={() => {
                      this.toggle('4');
                    }}
                  >
                    Detective/Mystery
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === '5'})}
                    onClick={() => {
                      this.toggle('5');
                    }}
                  >
                    Fantasy
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === '6'})}
                    onClick={() => {
                      this.toggle('6');
                    }}
                  >
                    Historical Fiction
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === '7'})}
                    onClick={() => {
                      this.toggle('7');
                    }}
                  >
                    Horror/Thriller
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === '8'})}
                    onClick={() => {
                      this.toggle('8');
                    }}
                  >
                    Non-Fiction
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === '9'})}
                    onClick={() => {
                      this.toggle('9');
                    }}
                  >
                    Romance
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === '10'})}
                    onClick={() => {
                      this.toggle('10');
                    }}
                  >
                    Sci-Fi
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col xs="6" sm="8" md="10">
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <h4 className='genre'>All Books</h4>
            
                <Row>
                {this.allBookMapper()}

                </Row>
 
                </TabPane>
                <TabPane tabId="2">
                  <h4 className='genre'>Action/Adventure</h4>

                  <Row>
                {this.AllFilteredBookMapper("Action/Adventure")}

                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <h4 className='genre'>Classic</h4>

                  <Row>
                {this.AllFilteredBookMapper("Classic")}

                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <h4 className='genre'>Detective/Mystery</h4>

                 <Row> 
                {this.AllFilteredBookMapper("Detective/Mystery")}

                 </Row>
                </TabPane>
                <TabPane tabId="5">
                  <h4 className='genre'>Fantasy</h4>

                  <Row>

                {this.AllFilteredBookMapper("Fantasy")}

                  </Row>
                </TabPane>
                <TabPane tabId="6">
                  <h4 className='genre'>Historical Fiction</h4>

                  <Row>
                {this.AllFilteredBookMapper("Historical Fiction")}

                  </Row>
                </TabPane>
                <TabPane tabId="7">
                  <h4 className='genre'>Horror/Thriller</h4>

                  <Row>
                {this.AllFilteredBookMapper("Horror/Thriller")}

                  </Row>
                </TabPane>
                <TabPane tabId="8">
                  <h4 className='genre'>Non-Fiction</h4>

                  <Row>
                {this.AllFilteredBookMapper("Non-Fiction")}

                  </Row>
                </TabPane>
                <TabPane tabId="9">
                  <h4 className='genre'>Romance</h4>

                  <Row>
                {this.AllFilteredBookMapper("Romance")}

                  </Row>
                </TabPane>
                <TabPane tabId="10">
                  <h4 className='genre'>Sci-Fi</h4>
                  <Row>

                {this.AllFilteredBookMapper("Sci-Fi")}

                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
       

            </div>
        );
    }
}

export default AllBooksTable;