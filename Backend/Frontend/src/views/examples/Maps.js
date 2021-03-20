

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
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import React, { Component } from 'react';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default class Categories extends Component {


  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUpdate = this.onChangeUpdate.bind(this);

    this.deleteCategory = this.deleteCategory.bind(this);

    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      name: '',
      category: [],
      refresh: [],
      pageSize: 5,
      pageIndex: 0,

    }

  }


  componentDidMount = () => {
    this.getData();
  }


  getData() {
    axios.get('http://localhost:5000/api/categories/getCat')
      .then((response) => {
        console.log(response);
        this.setState({
          category: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }


  deleteCategory(id) {
    axios.delete('http://localhost:5000/api/categories/delete/' + id)
      .catch((error) => {
        console.log(error)
      })
    this.getData();
  }




  updateCategory(id) {
    const obj = {
      name: this.state.name,

    };
    axios.post('http://localhost:5000/api/categories/update/' + id, obj)
      .then(res => console.log(res.data))
      .catch(function (error) {
        console.log(error);
      })

  }



  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeUpdate(e) {
    this.setState({
      name: e.target.value
    })

  }


  onSubmit(e) {
    e.preventDefault();

    const category = {
      name: this.state.name,
      headers: {
        "Content-Type": "application/json"
      }

    }

    axios.post('http://localhost:5000/api/categories/addCat', category)
      .then(res => console.log(res.data))
      .then(res => {
        NotificationManager.success('Success', 'Category added successfully', 3000);
     
      })
      .catch(error => {
        window.location.href('/admin/index')
      })
      e.target.reset();
    this.setState({ name: '' })
    this.getData();
  
    



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
          Math.ceil(prevState.category.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex
    }));
  }
  render() {

    const { category } = this.state

    const contentStyle = {
      maxWidth: "600px",
      width: "90%"
    };

    return (
      <>

        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div align="center" className="col">

              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">

                      <h3 className="mb-0">Categories</h3>

                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h6 className="heading-small text-muted mb-4">
                        Add a new category
                  </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Category name
                          </label>
                              <Input
                                className="form-control-alternative"
                                id="name"
                                type="text"
                                placeholder="Name"
                                required
                                onChange={this.onChangeName}
                              />

                            </FormGroup>
                          </Col>

                        </Row>



                        <Button variant="danger" size="lg" block="block" type="submit">
                          Add category
                      </Button>

                      </div>
                    </Form>



                  </CardBody>
                </Card>
              </Col>
            </div>
          </Row>
        </Container>






        <Container >
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Categories List</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Remove</th>

                      <th scope="col" />
                    </tr>
                  </thead>

                  <tbody>
                    {
                      category.length > 0 ? (
                        category
                          .slice(
                            this.state.pageIndex * this.state.pageSize,
                            this.state.pageIndex * this.state.pageSize + this.state.pageSize)
                          .map((x, i) =>

                            <tr value={x}>
                              <td key={i}><Input required type="text" placeholder={x.name} onChange={this.onChangeUpdate}></Input></td>
                              <td>
                                <Button type="sumbit" onClick={() => this.updateCategory(x._id)}>Update</Button>
                              </td>
                              <td>
                                <Button style={{ color: 'red' }} onClick={() => { if (window.confirm('Are you sure you wish to delete this category?')) this.deleteCategory(x._id) }} type="sumbit">Delete</Button>
                              </td>
                            </tr>
                          )) : (
                          <tr>
                            <td colSpan={4}>No categories found</td>
                          </tr>)

                    }

                  </tbody>

                </Table>

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

              </Card>
            </div>

          </Row>
        </Container>


      </>
    );
  };

}
