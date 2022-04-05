import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody, Modal } from "reactstrap"
import { Link } from "react-router-dom"

import { BaseUrl } from "../../config/BaseUrl"
import { apiGet } from "../../config/apiConfig"
import BootstrapTheme from "@fullcalendar/bootstrap"
import { object } from "prop-types"
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation"
import { forEach } from "lodash"

class Application extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: {},
      finalArray: [],
      timeArray: [],
      isModelOpen: false,
      selectedRow: "",
      interviewtime: 1,
      coinbalance: 5,
      date: "",
    }

    this.tog_standard = this.tog_standard.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.rejectInterview = this.rejectInterview.bind(this)
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }
  handleChange = event => {
    console.log(event)
  }
  tog_standard() {
    const currentState = this.state.isModelOpen
    this.setState(
      {
        isModelOpen: !currentState,
      },
      () => {}
    )
  }
  handleValidSubmit() {
    // let url =
    //   BaseUrl.apiUrl.baseUrl +
    //   "api/admin/teacher/interview_schedule/" +
    //   this.props.match.params.id
    // let body = {
    //   teacherId: this.props.match.params.tid,
    //   interviewType: "Telephone Interview",
    //   interviewStatus: "3",
    //   coinValue: this.state.selectedRow,
    // }
    // let resp = apiPut(url, body)
    // resp.then(resp => {
    //   resp.response.data.code == 200
    //     ? toast.success("Tutor successfully added", {
    //         position: toast.POSITION.TOP_RIGHT,
    //       })
    //     : toast.error(resp.response.data.data, {
    //         position: toast.POSITION.TOP_RIGHT,
    //       })
    //   resp.response.data.code == 200 ? this.setState({ disabled: true }) : ""
    //   this.tog_standard()
    // })
  }
  rejectInterview() {
    // let url =
    //   BaseUrl.apiUrl.baseUrl +
    //   "api/admin/teacher/interview_schedule/" +
    //   this.props.match.params.id
    // let body = {
    //   teacherId: this.props.match.params.tid,
    //   interviewStatus: "4",
    // }
    // let resp = apiPut(url, body)
    // resp.then(resp => {
    //   resp.response.data.code == 200
    //     ? toast.success("Rejected the application", {
    //         position: toast.POSITION.TOP_RIGHT,
    //       })
    //     : toast.error(resp.response.data.data, {
    //         position: toast.POSITION.TOP_RIGHT,
    //       })
    //   resp.response.data.code == 200 ? this.setState({ disabled: true }) : ""
    //   this.tog_standard1()
    // })
  }
  componentDidMount() {
    let url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/teacher/interview_application/" +
      this.props.match.params.id
    let resp = apiGet(url)
    resp.then(resp => {
      this.setState({ details: resp.response.data.data })
      let dayArray = []
      let finalArray = []
      let timeArray = []
      resp.response.data.data.availableDaysList.map(day => {
        dayArray.push(day.dayName)
      })
      resp.response.data.data.availableSlotList.map(time => {
        timeArray.push(time.startTime + " - " + time.endTime)
      })

      finalArray = dayArray.map(e => {
        e = e.substring(0, 3)

        return e
      })

      this.setState({ timeArray: timeArray })

      this.setState({ finalArray: finalArray })
    })
  }
  render() {
    let data = this.state.details.selectedInterviewSlotList
      ? this.state.details.selectedInterviewSlotList.map((e, v) => {
          return (
            <>
              <AvRadio
                label={e.startTime + " - " + e.endTime}
                value={e.interviewSlotId}
              ></AvRadio>
            </>
          )
        })
      : ""
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Onden |Application</title>
          </MetaTags>
          <Container fluid>
            <h4>Application</h4>
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
                            {this.state.details.dateCreated}
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
                          <Col md={3} className="mt-2">
                            Available days
                          </Col>
                          <Col md={9} className="mt-2">
                            <span
                              className={
                                this.state.finalArray.includes("Sun")
                                  ? "daySpan bg-green"
                                  : "daySpan"
                              }
                            >
                              Sun
                            </span>
                            <span
                              className={
                                this.state.finalArray.includes("Mon")
                                  ? "daySpan bg-green"
                                  : "daySpan"
                              }
                            >
                              Mon
                            </span>
                            <span
                              className={
                                this.state.finalArray.includes("Tue")
                                  ? "daySpan bg-green"
                                  : "daySpan"
                              }
                            >
                              Tue
                            </span>
                            <span
                              className={
                                this.state.finalArray.includes("Wed")
                                  ? "daySpan bg-green"
                                  : "daySpan"
                              }
                            >
                              Wed
                            </span>
                            <span
                              className={
                                this.state.finalArray.includes("Thu")
                                  ? "daySpan bg-green"
                                  : "daySpan"
                              }
                            >
                              Thu
                            </span>
                            <span
                              className={
                                this.state.finalArray.includes("Fri")
                                  ? "daySpan bg-green"
                                  : "daySpan"
                              }
                            >
                              Fri
                            </span>
                            <span
                              className={
                                this.state.finalArray.includes("Sat")
                                  ? "daySpan bg-green"
                                  : "daySpan"
                              }
                            >
                              Sat
                            </span>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={9} className="mt-2">
                            <hr></hr>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3} className="mt-2">
                            Available time slots
                          </Col>
                          <Col md={9} className="mt-2">
                            {this.state.timeArray.map((time, key) => (
                              <span
                                className="daySpan bg-green"
                                key={"_li_" + key}
                              >
                                {time}
                              </span>
                            ))}
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
                            >
                              Reject application
                            </button>
                            <button
                              className=""
                              data-toggle="modal"
                              data-target=".bs-example-modal-sm"
                              onClick={this.tog_standard}
                            >
                              Schedule an interview
                            </button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
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
                          Pick a time slot and date to schedule your interview
                        </div>
                        <AvRadioGroup name="interviewSlot">{data}</AvRadioGroup>

                        <AvField
                          name="date"
                          label="Select date"
                          onChange={this.handleChange}
                          type="date"
                          required
                          value={this.state.date}
                        />
                      </div>
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">
                          Schedule Interview
                        </button>
                      </div>
                    </AvForm>
                  </Modal>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
    Application.propTypes = {
      match: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string,
          tid: PropTypes.string,
        }),
      }),
    }
  }
}

export default Application
