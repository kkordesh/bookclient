import * as React from 'react'
import AllBooks from '../AllBooks';
import { Card, ListGroup, ListGroupItem,} from 'react-bootstrap'
import { stringify } from 'querystring';
import BookPage from '../../../BookPage/BookPage'
import {Routes, Route, Link} from 'react-router-dom'


import { NavItem, Nav, NavLink, TabContent, TabPane, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { getValue } from '@testing-library/user-event/dist/utils';

interface AllBooksTableProps {
    FetchAllBooks: () => void
    allBooks: getBookAPI[]
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
            return (

                <Card key={index} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={book.image} style={{width: '8rem'}}/>
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                          By:  {book.author}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>genre: {book.genre}</ListGroupItem>
                        <Link to={`/BookPage/${book.id}`}>
                            Summary/Reviews
                        </Link>
                      
                    </ListGroup>
                        

                </Card>
            )
        })
    
    }



    allBookMapper = () => {
        return this.props.allBooks.map((book: getBookAPI, index) => {
            return (

                <Card key={index} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={book.image} style={{width: '8rem'}}/>
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                          By:  {book.author}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>genre: {book.genre}</ListGroupItem>
                        <Link to={`/BookPage/${book.id}`}>
                            Summary/Reviews
                        </Link>
                      
                    </ListGroup>
                        

                </Card>
            )
        })
    
    }


    render() {
        return (
            <div >
                         <Row>
            <Col xs="6" sm="4" md="2">
              <Nav tabs vertical pills>
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
            <Col xs="6" sm="6" md="8">
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <h4>All Books</h4>
                {this.allBookMapper()}

                </TabPane>
                <TabPane tabId="2">
                  <h4>Action/Adventure</h4>
                {this.AllFilteredBookMapper("Action/Adventure")}
                </TabPane>
                <TabPane tabId="3">
                  <h4>Classic</h4>
                {this.AllFilteredBookMapper("Classic")}
                </TabPane>
                <TabPane tabId="4">
                  <h4>Detective/Mystery</h4>
                {this.AllFilteredBookMapper("Detective/Mystery")}
                </TabPane>
                <TabPane tabId="5">
                  <h4>Fantasy</h4>
                {this.AllFilteredBookMapper("Fantasy")}
                </TabPane>
                <TabPane tabId="6">
                  <h4>Historical Fiction</h4>
                {this.AllFilteredBookMapper("Historical Fiction")}
                </TabPane>
                <TabPane tabId="7">
                  <h4>Horror/Thriller</h4>
                {this.AllFilteredBookMapper("Horror/Thriller")}
                </TabPane>
                <TabPane tabId="8">
                  <h4>Non-Fiction</h4>
                {this.AllFilteredBookMapper("Non-Fiction")}
                </TabPane>
                <TabPane tabId="9">
                  <h4>Romance</h4>
                {this.AllFilteredBookMapper("Romance")}
                </TabPane>
                <TabPane tabId="10">
                  <h4>Sci-Fi</h4>
                {this.AllFilteredBookMapper("Sci-Fi")}
                </TabPane>
              </TabContent>
            </Col>
          </Row>
       

            </div>
        );
    }
}

export default AllBooksTable;