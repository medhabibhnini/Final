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
// react component that copies the given text inside your clipboard
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Container,
  Row,
  Col,
  FormGroup,
} from "reactstrap";

// core components
import React, { Component } from 'react';
import axios from 'axios';
import UserHeader from "components/Headers/UserHeader.js";
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default class ProdDetails extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.onChangeBarcode = this.onChangeBarcode.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangePrice = this.onChangePrice.bind(this)
    this.onChangeQuantity = this.onChangeQuantity.bind(this)

    this.state = {

      products: [],
      category: [],
      name: '',
      description: '',
      price: 0,
      barcode: 0,
      category_name: '',
      image: '',
      url: '',
      quantity: 0,
      loading : false,


    }
  }


  componentDidMount = () => {
    this.getData();
    this.getCat();
  }
  getCat() {
    fetch('http://localhost:5000/api/categories/getCat')
      .then(res => res.json())
      .then(json => json.map(cat => cat.name))
      .then(category => this.setState({ category }))
      .catch(error => this.setState({ error }))

  }

  getData() {
    const url = window.location.pathname;

    const lastSegment = url.split("/").pop();

    axios.get('http://localhost:5000/api/products/' + lastSegment)
      .then((response) => {
        console.log(response);
        this.setState({
          products: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
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
  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value
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
          loading : true
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


  updateCategory(id) {
    const obj = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      barcode: this.state.barcode,
      category_name: this.state.category_name,
      image: this.state.url,
      quantity: this.state.quantity,


    };
    if (this.state.loading)
    {
      axios.post('http://localhost:5000/api/products/update/' + id, obj)
      .then(res => console.log(res.data))
      .then (res => {
        NotificationManager.success('Success', 'Category added successfully', 3000);
        window.location.href=('/admin/prodlist')

      })
      .catch(function (error) {
        window.location.href=('/admin/prodlist')
      })
    this.getData()
    this.getCat()
    }
  
  }

  render() {
    const { category } = this.state
    const { products } = this.state
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Product details</h3>
                </CardHeader>
                <CardBody>
                  <h6 className="heading-small text-muted mb-4">
                    Update product details
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
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
                            placeholder={products.name}
                            required
                            onChange={this.onChangeName}
                          />
                        
                      </Col>
                      <Col lg="6">

                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Product price
                          </label>
                        <Input
                          className="form-control-alternative"
                          id="price"
                          placeholder={products.price}
                          type="number"
                          required
                          onChange={this.onChangePrice}
                        />

                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Product category
                          </label>
                        <div className="form-control-label">
                          <Input
                            type="select"
                            placeholder={products.category_name}
                            required={true}
                            onChange={this.handleChange}
                            value={this.state.category_name}
                          >
                            {category.map((x, i) => <option value={x} key={i}>{x}</option>)}

                          </Input>

                        </div>
                      </Col>
                      <Col lg="6">
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Product Description
                          </label>
                        <Input
                          className="form-control-alternative"
                          id="input-last-name"
                          placeholder={products.description}

                          type="textarea"
                          required
                          onChange={this.onChangeDescription}
                        />
                      </Col>
                      <Col lg="6">
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Product barcode
                          </label>
                        <Input
                          className="form-control-alternative"
                          id="barcode"
                          placeholder={products.barcode}
                          type="number"
                          required
                          onChange={this.onChangeBarcode}
                        />
                      </Col>
                      <Col lg="6">
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Quantity
                          </label>

                        <Input
                          className="form-control-alternative"
                          id="quantity"
                          placeholder={products.quantity}
                          type="number"
                          required
                          onChange={this.onChangeQuantity}
                        />
                      </Col>
                      <Col lg="6">
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Image
                          </label>

                        <Input required type="file" onChange={(e) => this.handleUpload(e)} />

                      </Col>


                    </Row>
                    <br></br>
                    <Row>
                      <Button onClick={() => this.updateCategory(products._id)} variant="danger" size="lg" block="block" type="submit" disabled={!this.state.loading}>
                        Update
        </Button>
                    </Row>


                  </div>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };
}
