/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components{
    import {
        Button,
        Card,
        CardHeader,
        Container,
        Row,
        CardFooter,
        Pagination,
        PaginationItem,
        PaginationLink,
      } from "reactstrap";
      // core components
      import Header from "components/Headers/Header.js";
      import React, { Component, setState } from 'react';
      import axios from 'axios';
      import { Link } from 'react-router-dom';
      import ProductDetails from "views/examples/Icons.js";
      import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
      import UserHeader from "components/Headers/UserHeader.js";
      import ReactCardFlip from 'react-card-flip';
      
      export default class EventsList extends Component {
      
      
        constructor(props) {
          super(props);
      
          this.state = {
      
            events: [],
            pageSize: 6,
            pageIndex: 0,
            id: 0,
          }
        }
      
      
      
        componentDidMount = () => {
          this.getData();
        }
      
      
        getData() {
          axios.get('http://localhost:5000/api/events/getEvent')
            .then((response) => {
              console.log(response);
              this.setState({
                events: response.data
              });
            })
            .catch((error) => {
              console.log(error);
            })
        }
        handlePrevPageClick(event) {
          this.setState(prevState => ({
            pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0
          }));
        }
      
        handleNextPageClick(event) {
          this.setState(prevState => ({
            pageIndex:
              prevState.pageIndex <
                Math.ceil(prevState.events.length / prevState.pageSize)
                ? prevState.pageIndex + 1
                : prevState.pageIndex
          }));
        }
      
        deleteEvent(id) {
          axios.delete('http://localhost:5000/api/events/delete/' + id)
            .catch((error) => {
              console.log(error)
            })
          this.getData();
        }
      
        
        
        render() {
      
          const { events } = this.state

          
          return (
            <>
              <UserHeader />
              {/* Page content */}
              <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                  <div className="col">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <h3 className="mb-0">Events list</h3>
                      </CardHeader>
                      <div className="card-container">
                        {
                          events.length > 0 ? (
                            events
                              .slice(
                                this.state.pageIndex * this.state.pageSize,
                                this.state.pageIndex * this.state.pageSize + this.state.pageSize)
                              .map((x, i) =>
      
                                <td value={x}>
                                  <div className="card-container">
                                    <td key={i}><img src={x.image} alt="" />
                                      <div className="desc">
                                        <h2>
      
                                          <Link to={`/admin/eventdetails/${x._id}`}>
                                            Details of : {x.name}
                                          </Link>
                                        </h2>
                                        <h3>Start date :{x.startDate}</h3>
                                        <p>End date :{x.endDate}</p>
                                      </div>
                                      <Button style={{ color: 'red' }} onClick={() => {if (window.confirm('Are you sure you wish to delete this event?')) this.deleteEvent(x._id) }} type="sumbit">Delete</Button>
                                    </td>
                                  </div>
      
                                </td>
                              )) : (
                              <tr>
                                <td colSpan={4}>No events found</td>
                              </tr>)
      
                        }
      
                        <div className="desc">
      
      
                        </div>
                      </div>
                      <CardFooter className="py-4">
                        <nav aria-label="...">
      
                          <Pagination
                            className="pagination justify-content-end mb-0"
                            listClassName="justify-content-end mb-0"
                          >
                            <PaginationItem >
                              <PaginationLink
                                href="#pablo"
                                onClick={event => this.handlePrevPageClick(event)}
                                tabIndex="-1"
                              >
                                <i className="fas fa-angle-left" />
                                <span className="sr-only">Previous</span>
                              </PaginationLink>
                            </PaginationItem>
      
                            <PaginationItem>
                              <PaginationLink
                                href="#pablo"
                                onClick={event => this.handleNextPageClick(event)}>
      
                                <i className="fas fa-angle-right" />
                                <span className="sr-only">Next</span>
                              </PaginationLink>
                            </PaginationItem>
                          </Pagination>
                        </nav>
                      </CardFooter>
                    </Card>
                  </div>
      
                </Row>      </Container>
      
            </>
          );
        };
      }
      