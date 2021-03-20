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
import UserHeader from "components/Headers/UserHeader.js";
import React, { Component } from 'react';
import axios from 'axios';
import ReactDatetime from "react-datetime";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import moment from 'moment'
import { flattenDiagnosticMessageText } from "typescript";

export default class EventDetails extends Component {

  constructor(props) {
    super(props);

    this.updateStartDate = this.updateStartDate.bind(this)
    this.updateEndDate = this.updateEndDate.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangePrize = this.onChangePrize.bind(this)


    this.state = {

      events: [],
      name: '',
      startDate: '',
      endDate: '',
      prize: 0,
      image: '',
      url: '',
      loading : false,


    }
  }


  componentDidMount = () => {
    this.getData();
  }


  getData() {
    const url = window.location.pathname;

    const lastSegment = url.split("/").pop();

    axios.get('http://localhost:5000/api/events/find/' + lastSegment)
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
          loading : true
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


  updateEvent(id) {

    const sd = this.state.startDate.format('YYYY-MM-DD HH:mm').toString();
    const ed = this.state.endDate.format('YYYY-MM-DD HH:mm').toString();

    const obj = {
      name: this.state.name,
      startDate: sd,
      endDate: ed,
      prize: this.state.prize,
      image: this.state.url,
    };

    if (obj.startDate < obj.endDate)      {
    axios.post('http://localhost:5000/api/events/update/' + id, obj)
      .then(res => console.log(res.data))
      .then(res => {
        this.getData()
        NotificationManager.success('Success', 'Event updated successfully',3000)
        window.location.href=('/admin/eventslist')    
      })
      .catch(function (error) {
        window.location.href=('/admin/eventslist')
      })
   
    } else {
      NotificationManager.warning('Warning', 'The end date is invalid please verify', 3000);
    }
  }

  


  render() {
    const { events } = this.state

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
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Event details</h3>
                </CardHeader>
                <CardBody>
                  <h6 className="heading-small text-muted mb-4">
                    Update event details
                    </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
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
                          placeholder={events.name}
                          required
                          onChange={this.onChangeName}
                        />

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
                                placeholder: events.startDate
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
                            placeholder={events.prize}
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
                                placeholder: events.endDate

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
                      <Button onClick={() => this.updateEvent(events._id)} variant="danger" size="lg" block="block" type="submit" disabled={!this.state.loading}>
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
