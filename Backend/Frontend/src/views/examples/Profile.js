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
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown, Menu } from 'semantic-ui-react'
import { NotificationContainer, NotificationManager } from 'react-notifications';



export default class Products extends Component {


  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeBarcode = this.onChangeBarcode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this)

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      price: 0,
      barcode: 0,
      category: [],
      category_name: '',
      image: '',
      url: '',
      quantity: 0,
      loading: false,


    }


  }



  componentDidMount() {
    fetch('http://localhost:5000/api/categories/getCat')
      .then(res => res.json())
      .then(json => json.map(cat => cat.name))
      .then(category => this.setState({ category }))
      .catch(error => this.setState({ error }))

  }


  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    })
  }

  onChangeBarcode(e) {
    this.setState({
      barcode: e.target.value
    })
  }

  onChangeImage(e) {
    this.setState({
      image: ''
    })
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value
    })
  }
  handleChange(e) {
    this.setState({
      category_name: e.target.value
    })
  }


  handleUpload(e) {


    const data = new FormData()
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "PFE2021")
    data.append("cloud_name", "ds2lp5gx9")
    fetch(" https://api.cloudinary.com/v1_1/ds2lp5gx9/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(res => {
        console.log('response is: ', res);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({
          url: res.secure_url
        });
        this.setState({
          loading: true
        })

      })
      .catch(err => {
        console.log(err)
      })
  }



  onSubmit(e) {
    e.preventDefault();



    const product = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      barcode: this.state.barcode,
      category_name: this.state.category_name,
      image: this.state.url,
      quantity: this.state.quantity
    }
    if (this.state.loading) {
      axios.post('http://localhost:5000/api/products/addprod', product)
        .then(res => console.log(res.data))
        .then(res => {
          NotificationManager.success('Success', 'Event added successfully', 3000);
          this.setState({ name: '', description: '', price: 0, barcode: 0, category_name: '', image: '', quantity: 0 })
        })
        .catch(error => {
          NotificationManager.warning('Error', 'An error has occured please verify your internet connection', 3000);
          window.location.href = ('/admin/index')
        })
    }
    e.target.reset();

    // window.location = '/';
  }

  render() {

    const { category } = this.state






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

                      <h3 className="mb-0">Groceries</h3>


                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h6 className="heading-small text-muted mb-4">
                        Add a new product
                  </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Product name
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
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Product price
                          </label>
                              <Input
                                className="form-control-alternative"
                                id="price"
                                placeholder="Price"
                                type="number"
                                required
                                onChange={this.onChangePrice}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">

                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Product category
                          </label>
                              <div className="form-control-label">
                                <Input
                                  type="select"
                                  required={true}
                                  value={this.state.category_name}
                                  onChange={this.handleChange}
                                >
                                  {category.map((x, i) => <option value={x} key={i}>{x}</option>)}

                                </Input>
                              </div>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Product Description
                          </label>
                              <Input
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder="Description"
                                type="textarea"
                                required
                                onChange={this.onChangeDescription}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Product barcode
                          </label>
                              <Input
                                className="form-control-alternative"
                                id="barcode"
                                placeholder="Barcode"
                                type="number"
                                required
                                onChange={this.onChangeBarcode}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Quantity
                          </label>

                              <Input
                                className="form-control-alternative"
                                id="quantity"
                                placeholder="Quantity"
                                type="number"
                                required
                                onChange={this.onChangeQuantity}
                              />
                            </FormGroup>

                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Image
                          </label>

                              <Input required type="file" onChange={(e) => this.handleUpload(e)} />
                            </FormGroup>
                          </Col>
                        
                        
                        
                         <Button variant="danger" size="lg" block="block" type="submit" disabled={!this.state.loading}>
                            Add product
                          </Button>
                        </Row>
                      </div> 
                      </Form>
                    <hr className="my-4" />


                  </CardBody>

                </Card>

              </Col>
            </div>
          </Row>


        </Container>
      </>
    );
  };

}


