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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
// core components
import { UncontrolledAlert } from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import React, { Component } from 'react';
import axios from 'axios';
import ReactDatetime from "react-datetime";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import moment from 'moment'


export default class Products extends Component {


  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrize = this.onChangePrize.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.updateStartDate = this.updateStartDate.bind(this)
    this.updateEndDate = this.updateEndDate.bind(this)

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      startDate: '',
      endDate: '',
      prize: 0,
      image : '',
      loading : false,

    }


  }



  componentDidMount() {
  }


  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  updateStartDate(startDate) {
    this.setState({ startDate });
  }

  updateEndDate(endDate) {
    this.setState({ endDate });
  }
  onChangePrize(e) {
    this.setState({
      prize: e.target.value
    })
  }

  onChangeImage(e) {
    this.setState({
      image: ''
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
        });

      })
      .catch(err => {
        console.log(err)
      })
  }


  onSubmit(e) {
    e.preventDefault();


    const sd = this.state.startDate.format('YYYY-MM-DD HH:mm').toString();
    const ed = this.state.endDate.format('YYYY-MM-DD HH:mm').toString();
    
    const event = {
      name: this.state.name,
      startDate: sd,
      endDate: ed,
      prize: this.state.prize,
      image: this.state.url,
    }


    if ((event.startDate < event.endDate) && (this.state.loading))      {
      axios.post('http://localhost:5000/api/events/addEvent', event)
        .then(res => console.log(res.data))
        .then(res => {
          this.setState({ name: '', startDate: '', endDate: '', prize: 0, image: '' })
          NotificationManager.success('Success', 'Event added successfully',3000);
        })
        .catch(error => {
          NotificationManager.warning('Error', 'An error has occured please verify your internet connection', 3000);
          window.location.href = ('/admin/index')
        })
     
    } else {
      NotificationManager.warning('Warning', 'The end date is invalid please verify', 3000);
    }
  e.target.reset();
  }

  render() {

    const filterPassedTime = time => {
      const currentDate = new Date();
      const selectedDate = new Date(time);

      return currentDate.getTime() < selectedDate.getTime();
    }


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
                      
                        <h3 className="mb-0">Events</h3>
                      
                      <Col className="text-right" xs="4">

                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h6 className="heading-small text-muted mb-4">
                        Add a new event
                  </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Event name
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
                                Start date
                             </label>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-calendar-grid-58" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <ReactDatetime
                                  inputProps={{
                                    placeholder: "Start date"

                                  }}
                                  value={this.state.startDate}
                                  timeFormat={true}
                                  isValidDate={filterPassedTime}
                                  closeOnSelect={true}
                                  dateFormat="YYYY-MM-DD"
                                  timeFormat="HH:mm"
                                  onChange={this.updateStartDate}

                                />
                              </InputGroup>
                            </FormGroup>

                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Prize
                          </label>
                              <Input
                                className="form-control-alternative"
                                id="prize"
                                placeholder="Prize"
                                type="number"
                                required
                                onChange={this.onChangePrize}
                                min={0}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                End date
                          </label>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-calendar-grid-58" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <ReactDatetime
                                  inputProps={{
                                    placeholder: "End date"

                                  }}
                                  value={this.state.endDate}
                                  timeFormat={true}
                                  isValidDate={filterPassedTime}
                                  closeOnSelect={true}
                                  dateFormat="YYYY-MM-DD"
                                  timeFormat="HH:mm"
                                  onChange={this.updateEndDate}
                                />
                              </InputGroup>
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
                            Add event
                          </Button>
                        </Row>

                      </div> </Form>
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


