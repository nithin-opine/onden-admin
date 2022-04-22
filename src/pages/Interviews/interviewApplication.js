import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container, Card, Row, Col, CardBody, Modal } from "reactstrap"
import { Link } from "react-router-dom"

import { BaseUrl } from "../../config/BaseUrl"
import { apiGet, apiPut } from "../../config/apiConfig"
import BootstrapTheme from "@fullcalendar/bootstrap"
import { object } from "prop-types"
import { AvForm, AvField } from "availity-reactstrap-validation"

import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

class InterviewApplication extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: {},
      selectedRow: "",
      disabled: false,
      isModelOpen1: false,
    }
    this.tog_standard = this.tog_standard.bind(this)
    this.tog_standard1 = this.tog_standard1.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
    this.rejectInterview = this.rejectInterview.bind(this)
  }
  handleChange(e) {
    let updatedname = e.target.name
    let updatedvalue = e.target.value
    this.setState({ selectedRow: updatedvalue })
  }
  tog_standard1() {
    const currentState = this.state.isModelOpen1
    this.setState(
      {
        isModelOpen1: !currentState,
      },
      () => {
        console.log(this.state.isModelOpen1)
      }
    )
  }
  tog_standard() {
    const currentState = this.state.isModelOpen
    this.setState(
      {
        isModelOpen: !currentState,
      },
      () => {
        console.log(this.state.isModelOpen)
      }
    )
  }
  handleValidSubmit() {
    let url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/teacher/interview_schedule/" +
      this.props.match.params.id
    let body = {
      teacherId: this.props.match.params.tid,
      interviewType: "Telephone Interview",
      interviewStatus: "3",
      coinValue: this.state.selectedRow,
    }
    let resp = apiPut(url, body)
    resp.then(resp => {
      resp.response.data.code == 200
        ? toast.success("Tutor successfully added", {
            position: toast.POSITION.TOP_RIGHT,
          })
        : toast.error(resp.response.data.data, {
            position: toast.POSITION.TOP_RIGHT,
          })
      resp.response.data.code == 200 ? this.setState({ disabled: true }) : ""
      this.tog_standard()
    })
  }
  rejectInterview() {
    let url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/teacher/interview_schedule/" +
      this.props.match.params.id
    let body = {
      teacherId: this.props.match.params.tid,
      interviewStatus: "4",
    }
    let resp = apiPut(url, body)
    resp.then(resp => {
      resp.response.data.code == 200
        ? toast.success("Rejected the application", {
            position: toast.POSITION.TOP_RIGHT,
          })
        : toast.error(resp.response.data.data, {
            position: toast.POSITION.TOP_RIGHT,
          })
      resp.response.data.code == 200 ? this.setState({ disabled: true }) : ""
      this.tog_standard1()
    })
  }

  componentDidMount() {
    let url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/teacher/interview_application/" +
      this.props.match.params.tid
    let resp = apiGet(url)
    resp.then(resp => {
      console.log("resp is", resp.response.data.data)
      this.setState({ details: resp.response.data.data })
    })
  }
  render() {
    console.log("params", this.props)
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="page-content">
          <MetaTags>
            <title>Onden | Interview-Application</title>
          </MetaTags>
          <Container fluid>
            <h4>Interviews</h4>
            <Row>
              <Col md={12}>
                <Card className="mini-stats-wid p-3">
                  <CardBody>
                    <Row className="tutor-application">
                      <Col md={2}>
                        <div className="appCImg">
                          <img
                            src={
                              null != this.state.details.profileImage
                                ? this.state.details.profileImage
                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            }
                            alt=""
                            className=""
                          />
                        </div>
                      </Col>
                      <Col md={10} className="pl-4">
                        <Row>
                          <Col md={12} className="appCname">
                            {this.state.details.firstname}{" "}
                            {this.state.details.lastname}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>{this.state.details.email}</Col>
                        </Row>
                        <Row>
                          <Col md={12} className="mt-4">
                            {this.state.details.country}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3} className="mt-5">
                            Applied on
                          </Col>
                          <Col md={9} className="mt-5">
                            {this.state.details.interviewSelectedDate}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3} className="mt-2">
                            Native Language
                          </Col>
                          <Col md={9} className="mt-2">
                            {this.state.details.nativeLanguage}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3} className="mt-2">
                            Languages fluent at
                          </Col>
                          <Col md={9} className="mt-2">
                            {this.state.details.languagesFluentAt}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3} className="mt-2">
                            Work experience
                          </Col>
                          <Col md={9} className="mt-2">
                            {this.state.details.workExperience}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3} className="mt-2">
                            About {this.state.details.firstname}
                          </Col>
                          <Col md={9} className="mt-2">
                            {this.state.details.about}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3} className="mt-2">
                            Message to the students
                          </Col>
                          <Col md={9} className="mt-2">
                            {this.state.details.bio}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={9} className="mt-2">
                            <hr></hr>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={9} className="mt-2">
                            Please conduct the interview manually and use the
                            options below.
                          </Col>
                        </Row>
                        <Row>
                          <Col md={9} className="mt-2">
                            <hr></hr>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={9} className="formBtn ">
                            <button
                              className=""
                              data-toggle="modal"
                              data-target=".bs-example-modal-sm"
                              onClick={this.tog_standard1}
                              disabled={this.state.disabled}
                            >
                              Reject application
                            </button>
                            <button
                              className=""
                              data-toggle="modal"
                              data-target=".bs-example-modal-md"
                              onClick={this.tog_standard}
                              disabled={this.state.disabled}
                            >
                              Accept tutor
                            </button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Modal
              isOpen={this.state.isModelOpen}
              toggle={this.tog_standard}
              className="modal-sm modal-dialog-centered"
            >
              <AvForm
                onValidSubmit={this.handleValidSubmit}
                onInvalidSubmit={this.handleInvalidSubmit}
              >
                <div className="modal-header">
                  <div></div>

                  <button
                    type="button"
                    onClick={this.tog_standard}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="modal-inner-header">
                    Enter a coin exchange ratio for this tutor. You can later
                    change this in the tutor`&apos;`s profile.
                  </div>
                  <AvField
                    name="coinbalance"
                    label="Coin balance"
                    onChange={this.handleChange}
                    type="number"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={this.state.disabled}
                  >
                    Accept
                  </button>
                </div>
              </AvForm>
            </Modal>
            <Modal
              isOpen={this.state.isModelOpen1}
              toggle={this.tog_standard1}
              className="modal-sm modal-dialog-centered"
            >
              <div className="modal-header">
                <div></div>

                <button
                  type="button"
                  onClick={this.tog_standard1}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-inner-header">
                  Do you really want to reject this application?
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn ">No</button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={this.state.disabled}
                  onClick={this.rejectInterview}
                >
                  Yes
                </button>
              </div>
            </Modal>
          </Container>
        </div>
      </React.Fragment>
    )
    InterviewApplication.propTypes = {
      match: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string,
          tid: PropTypes.string,
        }),
      }),
    }
  }
}

export default InterviewApplication
