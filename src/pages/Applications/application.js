import React, { Component } from "react"
import { Container, Row, Col, Card, CardBody, Modal } from "reactstrap"
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation"
import toastr from "toastr"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { apiGet, apiPost, apiPut } from "../../config/apiConfig"
import { BaseUrl } from "../../config/BaseUrl"
import { map } from "leaflet"

export default class Application extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiList: "",
      modal_small: false,
      modal_interview: false,
      date: "",
      slot: "",
      conf: false,
    }
    this.tog_small = this.tog_small.bind(this)
    this.tog_interview = this.tog_interview.bind(this)
    this.removeBodyCss = this.removeBodyCss.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.showToast = this.showToast.bind(this)
    this.validSubmit = this.validSubmit.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.rejectInterview = this.rejectInterview.bind(this)
    this.display = this.display.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.id

    const Url =
      BaseUrl.apiUrl.baseUrl + "api/admin/teacher/interview_application/" + id

    let resp = apiGet(Url)
    resp.then(resp => this.setState({ apiList: resp.response.data.data }))
  }
  tog_small() {
    this.setState({ modal_small: !this.state.modal_small })
    this.removeBodyCss()
  }
  rejectInterview() {
    let body = {
      teacherId: this.state.apiList.id,
      interviewType: "Telephone Interview",
      interviewScheduleId: 0,
    }
    console.log(body)
    const Url = BaseUrl.apiUrl.baseUrl + "api/admin/teacher/interview_schedule/"
    let resp = apiPost(Url, body)
    resp.then(resp => {
      if (resp.response.status == 200) {
        this.showToast(3)
        this.setState({ modal_small: false })
      } else {
        this.showToast(4)
        this.setState({ modal_small: false })
      }
    })
  }
  tog_interview() {
    this.setState({ modal_interview: !this.state.modal_interview })
    this.removeBodyCss()
  }
  removeBodyCss() {
    document.body.classList.add("no_padding")
  }
  handleValueChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleRadioChange(e) {
    if (e.target) {
      this.setState({ slot: e.target.value })
    }
  }
  showToast(x) {
    switch (x) {
      case 1:
        var title = "Success"
        var message = "Succesfully added interview schedule"
        toastr.success(message, title)
        break
      case 2:
        var title = "Error"
        var message = "Interview schedule addition failed"
        toastr.warning(message, title)
        break
      case 3:
        var title = "Success"
        var message = "Succesfully deleted interview application"
        toastr.success(message, title)
        break
      case 4:
        var title = "Error"
        var message = "Interview application deletion failed"
        toastr.warning(message, title)
        break
    }
  }
  display() {
    this.showToast(1)
  }
  validSubmit() {
    let body = {
      teacherId: this.state.apiList.id,
      interviewType: "Telephone Interview",
      interviewSlotId: this.state.slot,
      interviewDate: this.state.date,
      interviewStatus: "2",
      coinValue: 0,
    }
    const Url = BaseUrl.apiUrl.baseUrl + "api/admin/teacher/interview_schedule"
    let resp = apiPost(Url, body)

    resp.then(resp => {
      if (resp.response.status == 200) {
        this.setState({ modal_interview: false }, function () {
          this.display((window.location.href = "/applications"))
        })
      } else {
        this.showToast(2)
        this.setState({ modal_interview: false })
      }
      this.setState({ conf: true })
    })
  }

  render() {
    if (this.state.apiList !== null) {
      var dayArr = []
      var timeArr = []
      var today = new Date(new Date().valueOf() + 1000 * 3600 * 24)
      if (this.state.apiList.availableDaysList) {
        Object.keys(this.state.apiList.availableDaysList).map(function (
          day,
          i
        ) {
          dayArr.push(this.state.apiList.availableDaysList[day].dayId)
        },
        this)
      }
      if (this.state.apiList.availableSlotList) {
        Object.keys(this.state.apiList.availableSlotList).map(function (
          day,
          i
        ) {
          timeArr.push(
            this.state.apiList.availableSlotList[day].startTime +
              " - " +
              this.state.apiList.availableSlotList[day].endTime
          )
        },
        this)
      }
      var options = ""
      if (this.state.apiList.selectedInterviewSlotList) {
        options = Object.keys(this.state.apiList.selectedInterviewSlotList).map(
          (slot, i) => {
            return (
              <AvRadio
                label={
                  this.state.apiList.selectedInterviewSlotList[slot].startTime +
                  " - " +
                  this.state.apiList.selectedInterviewSlotList[slot].endTime
                }
                value={
                  this.state.apiList.selectedInterviewSlotList[slot]
                    .interviewSlotId
                }
              />
            )
          }
        )
      }
    }

    return (
      <React.Fragment>
        <div className="page-content">
          {this.state.apiList !== null ? (
            <Container fluid>
              {/* Render Breadcrumb */}
              <Breadcrumbs title="Application" breadcrumbItem="Application" />
              <Row>
                <Col md={12}>
                  <Card className="applicationCard">
                    <Row>
                      <Col md={2} className="r">
                        <div className="appCImg">
                          <img
                            src={
                              this.state.apiList.profileImage == null
                                ? "https://onden-bucket.s3.ap-northeast-1.amazonaws.com/profile_images/blank_profile_image.jpeg"
                                : this.state.apiList.profileImage
                            }
                            alt=""
                            className=""
                          />
                        </div>
                      </Col>

                      <Col md={10} className="pl-4">
                        <Row>
                          <Col md={12} className="appCname">
                            {this.state.apiList.firstname}{" "}
                            {this.state.apiList.LastName}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>{this.state.apiList.email}</Col>
                        </Row>
                        <Row className="mt-4">
                          <Col md={12}>
                            {/* <img
                            src="https://www.countryflags.io/lk/flat/64.png"
                            className="flag"
                         /> */}
                            {this.state.apiList.country}
                          </Col>
                        </Row>
                        <Row className="mt-5">
                          <Col md={3}>Applied on</Col>
                          <Col md={9}>
                            {new Date(
                              this.state.apiList.dateCreated
                            ).toLocaleString()}
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col md={3}>Native Language</Col>
                          <Col md={9}>{this.state.apiList.nativeLanguage}</Col>
                        </Row>
                        <Row className="mt-2">
                          <Col md={3}> Languages fluent at</Col>
                          <Col md={9}>
                            {this.state.apiList.languagesFluentAt}
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col md={3}> Work experience</Col>
                          <Col md={6}>{this.state.apiList.workExperience}</Col>
                        </Row>
                        <Row className="mt-2">
                          <Col md={3}>
                            {" "}
                            About {this.state.apiList.firstname}
                          </Col>
                          <Col md={6}>{this.state.apiList.about}</Col>
                        </Row>
                        <Row className="mt-2">
                          <Col md={3}> Message to the students</Col>
                          <Col md={6}>{this.state.apiList.bio}</Col>
                        </Row>
                        <Row className="mt-2">
                          <Col md={9}>
                            {" "}
                            <hr />
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col md={3}> Available days</Col>
                          <Col md={9}>
                            <span
                              className={
                                dayArr.includes(7)
                                  ? "daySpan active"
                                  : "daySpan"
                              }
                            >
                              Sun
                            </span>
                            <span
                              className={
                                dayArr.includes(1)
                                  ? "daySpan active"
                                  : "daySpan"
                              }
                            >
                              Mon
                            </span>
                            <span
                              className={
                                dayArr.includes(2)
                                  ? "daySpan active"
                                  : "daySpan"
                              }
                            >
                              Tue
                            </span>
                            <span
                              className={
                                dayArr.includes(3)
                                  ? "daySpan active"
                                  : "daySpan"
                              }
                            >
                              Wed
                            </span>
                            <span
                              className={
                                dayArr.includes(4)
                                  ? "daySpan active"
                                  : "daySpan"
                              }
                            >
                              Thu
                            </span>
                            <span
                              className={
                                dayArr.includes(5)
                                  ? "daySpan active"
                                  : "daySpan"
                              }
                            >
                              Fri
                            </span>
                            <span
                              className={
                                dayArr.includes(6)
                                  ? "daySpan active"
                                  : "daySpan"
                              }
                            >
                              Sat
                            </span>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col md={9}>
                            {" "}
                            <hr />
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col md={3}> Available time slots</Col>
                          <Col md={9}>
                            {timeArr.map((slot, i) => {
                              return (
                                <span className="daySpan active">{slot}</span>
                              )
                            })}
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col md={9}>
                            {" "}
                            <hr />
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col md={9} className="formBtn">
                            {this.state.conf ? (
                              ""
                            ) : (
                              <>
                                {" "}
                                <button
                                  className=""
                                  onClick={() => {
                                    this.tog_small()
                                  }}
                                  data-toggle="modal"
                                  data-target=".bs-example-modal-sm"
                                >
                                  Reject application
                                </button>
                                <button
                                  className=""
                                  onClick={() => {
                                    this.tog_interview()
                                  }}
                                  data-toggle="modal"
                                  data-target=".bs-example-modal-sm"
                                >
                                  Schedule an interview
                                </button>
                              </>
                            )}
                          </Col>
                          <Modal
                            size="md"
                            isOpen={this.state.modal_small}
                            centered={true}
                            toggle={() => {
                              this.tog_small()
                            }}
                          >
                            <div className="modal-body">
                              Reject this application?
                              <p className="mb-0">
                                <button className="modalNegateBtn">No</button>
                                <button
                                  className="modalProceedBtn"
                                  onClick={() => this.rejectInterview()}
                                >
                                  Delete the application
                                </button>
                              </p>
                            </div>
                          </Modal>
                          <Modal
                            className="intModal"
                            size="md"
                            isOpen={this.state.modal_interview}
                            centered={true}
                            toggle={() => {
                              this.tog_interview()
                            }}
                          >
                            <div className="modal-body">
                              <Row>
                                <Col md={12}>
                                  <span className="modalHead">
                                    Pick a time slot and a date to schedule your
                                    interview
                                  </span>

                                  <AvForm
                                    className="form-horizontal mt-4"
                                    onValidSubmit={this.validSubmit}
                                  >
                                    <div className="form-group">
                                      <AvRadioGroup
                                        onChange={this.handleRadioChange.bind(
                                          this
                                        )}
                                        name="slot"
                                        required
                                        errorMessage="Pick one!"
                                      >
                                        {options}
                                      </AvRadioGroup>
                                    </div>
                                    <AvField
                                      name="date"
                                      label="Date"
                                      className="form-control"
                                      placeholder="Enter date"
                                      type="date"
                                      min={today}
                                      required
                                      onChange={this.handleValueChange.bind(
                                        this
                                      )}
                                    />

                                    <button
                                      className="modalProceedBtn"
                                      type="submit"
                                    >
                                      Schedule interview
                                    </button>
                                  </AvForm>
                                </Col>
                              </Row>
                            </div>
                          </Modal>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Container>
          ) : (
            <div className="notFound">
              The resource you requested could not be found.
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }
}
