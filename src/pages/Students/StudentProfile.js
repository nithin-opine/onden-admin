import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Col,
  Container,
  Row,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap"
import MiniCards from "./mini-card"
import { Link } from "react-router-dom"
import classnames from "classnames"
import avatar3 from "../../assets/images/users/avatar-3.jpg"
import SessionTimeLineTable from "./SessionTimeLineTable"
import CoinPurchaseHistory from "./CoinPurchaseHistoryTable"
import ReportAgainstStudent from "./ReportAgainstStudentTable"
import { BaseUrl } from "../../config/BaseUrl"
import { apiGet, apiPut } from "../../config/apiConfig"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
class StudentProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModelOpen: false,
      activeTab1: "1",
      details: {},
      sessionTimeLine: [],
      selectedRow: {},
      sessionTimeLineData: [],
      coinPurchaseHistory: [],
      coinPurchaseHistoryData: [],
      toastData: {},
    }
    this.tog_standard = this.tog_standard.bind(this)
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
    this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateGrid = this.updateGrid.bind(this)
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
    let url = BaseUrl.apiUrl.baseUrl + "api/admin/student/add_coins_to_wallet"
    let body = {
      studentId: this.state.details.id,
      coinBalance: this.state.selectedRow.coinbalance,
    }
    let resp = apiPut(url, body)
    resp.then(resp => {
      console.log("respasdasdasd is", resp)
      this.setState({ toastData: resp.response.data }, () => {
        console.log("toastData is", this.state.toastData)
        if (resp.response.status == 200) {
          toast.success(this.state.toastData.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
          this.tog_standard()
          this.updateGrid()
        } else {
          toast.error(this.state.toastData.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
      })
    })
  }
  handleInvalidSubmit(event, errors, values) {
    console.log("invalid")
    this.setState({ email: values.email, error: true })
  }
  handleChange(e) {
    let updatedname = e.target.name
    let updatedvalue = e.target.value
    this.setState(
      prevState => ({
        selectedRow: {
          // object that we want to update
          ...prevState.selectedRow, // keep all other key-value pairs
          [updatedname]: updatedvalue, // update the value of specific key
        },
      }),
      () => {
        console.log(this.state.selectedRow)
      }
    )
  }
  toggle1(tab) {
    if (this.state.activeTab1 !== tab) {
      this.setState({ activeTab1: tab })
    }
  }
  updateGrid() {
    let url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/student/student_profile/" +
      this.props.match.params.id

    let resp = apiGet(url)
    resp.then(resp => {
      console.log("resp is", resp)
      this.setState(
        {
          details: resp.response.data.data,
          sessionTimeLine: resp.response.data.data.sessionList,
          coinPurchaseHistory: resp.response.data.data.purchaseHistoryList,
        },
        () => {
          console.log("details is", this.state.details)
          let sessionRows = []
          let coinRows = []
          this.state.sessionTimeLine.forEach((value, index) => {
            let temp = {
              sessionNumber: value.sessionNumber,
              sessionDate: value.sessionDate + " " + value.startTime,
              teacherFirstName:
                value.teacherFirstName + " " + value.teacherLastName,
              sessionDuration: value.sessionDuration,
              disputeStatus:
                value.disputeStatus == 1 ? value.disputeReason : "No disputes",
            }
            sessionRows.push(temp)
          })
          this.state.coinPurchaseHistory.forEach((value, index) => {
            let coinhistory = {
              id: value.id,
              packagePurchasedOn: value.packagePurchasedOn,
              packageName: value.packageName,
              packagePaymentStatus:
                value.packagePaymentStatus == 1
                  ? "Payment Verified"
                  : "Payment Not verified",
              packageExpiresOn: value.packageExpiresOn,
            }
            coinRows.push(coinhistory)
          })

          this.setState({ sessionTimeLineData: sessionRows })
          this.setState({ coinPurchaseHistoryData: coinRows })
        }
      )
    })
  }
  componentDidMount() {
    let url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/student/student_profile/" +
      this.props.match.params.id

    let resp = apiGet(url)
    resp.then(resp => {
      console.log("resp is", resp)
      this.setState(
        {
          details: resp.response.data.data,
          sessionTimeLine: resp.response.data.data.sessionList,
          coinPurchaseHistory: resp.response.data.data.purchaseHistoryList,
        },
        () => {
          console.log("details is", this.state.details)
          let sessionRows = []
          let coinRows = []
          this.state.sessionTimeLine.forEach((value, index) => {
            let temp = {
              sessionNumber: value.sessionNumber,
              sessionDate: value.sessionDate + " " + value.startTime,
              teacherFirstName:
                value.teacherFirstName + " " + value.teacherLastName,
              sessionDuration: value.sessionDuration,
              disputeStatus:
                value.disputeStatus == 1 ? value.disputeReason : "No disputes",
            }
            sessionRows.push(temp)
          })
          this.state.coinPurchaseHistory.forEach((value, index) => {
            let coinhistory = {
              id: value.id,
              packagePurchasedOn: value.packagePurchasedOn,
              packageName: value.packageName,
              packagePaymentStatus:
                value.packagePaymentStatus == 1
                  ? "Payment Verified"
                  : "Payment Not verified",
              packageExpiresOn: value.packageExpiresOn,
            }
            coinRows.push(coinhistory)
          })

          this.setState({ sessionTimeLineData: sessionRows })
          this.setState({ coinPurchaseHistoryData: coinRows })
        }
      )
    })
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="page-content">
          <MetaTags>
            <title>Onden | Student-profile</title>
          </MetaTags>
          <Container fluid>
            <h4>Student Profile</h4>
            <Row>
              <Col xl="4">
                <Card className="withProfile mt-4">
                  <div className="withProfileDiv">
                    <img
                      src={
                        null != this.state.details.profileImage
                          ? this.state.details.profileImage
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                    ></img>
                  </div>
                  <CardBody>
                    <CardTitle className="mb-4">Personal Information</CardTitle>
                    <div className="table-responsive">
                      <Table className="table-nowrap mb-0">
                        <tbody>
                          <tr>
                            <th scope="row">Full Name :</th>
                            <td>
                              {this.state.details.studentFirstName}{" "}
                              {this.state.details.studentLastName}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Nick Name :</th>
                            <td>{this.state.details.nickName}</td>
                          </tr>
                          <tr>
                            <th scope="row">Age :</th>
                            <td>{this.state.details.age}</td>
                          </tr>
                          <tr>
                            <th scope="row">Level:</th>
                            <td>{this.state.details.level}</td>
                          </tr>
                          <tr>
                            <th scope="row">Mobile :</th>
                            <td>
                              {this.state.details.mobile}
                              <span
                                className={
                                  this.state.details.isMobileVerified == 1
                                    ? "verified"
                                    : "unverified"
                                }
                              >
                                <i className="bx bx-check"></i>{" "}
                                {this.state.details.isMobileVerified == 1
                                  ? "Verified"
                                  : "Not verified"}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">E-mail :</th>
                            <td>
                              {this.state.details.email}
                              <span
                                className={
                                  this.state.details.isEmailVerified == 1
                                    ? "verified"
                                    : "unverified"
                                }
                              >
                                <i className="bx bx-check"></i>{" "}
                                {this.state.details.isEmailVerified == 1
                                  ? "Verified"
                                  : "Not verified"}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Row className="profileActions ">
                      <Col md={12} onClick={this.tog_standard}>
                        <i className="fas fa-coins"></i>
                        <span className="ss">Edit Coin Balance</span>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col xl="8" className="mt-4">
                <Row>
                  <MiniCards
                    title="Completed Sessions"
                    text={this.state.details.completedSessions}
                    iconClass="bx-check-circle"
                  />
                  <MiniCards
                    title="Scheduled Sessions"
                    text={this.state.details.scheduledSessions}
                    iconClass="bx-hourglass"
                  />
                  <MiniCards
                    title="Coin balance"
                    text={
                      null != this.state.details.coinBalance
                        ? this.state.details.coinBalance.toString()
                        : ""
                    }
                    iconClass="bx-package"
                  />
                </Row>
                <Row>
                  <Col md={6}>
                    <Card body>
                      <CardTitle className="mt-0">Upcoming Session</CardTitle>

                      <div className="d-flex mt-3">
                        <div className="flex-shrink-0 me-3">
                          <img
                            className="rounded avatar-sm"
                            src={
                              null !=
                              this.state.details.upcomingSessionTeacherImage
                                ? this.state.details.upcomingSessionTeacherImage
                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            }
                            alt="Generic placeholder image"
                          />
                        </div>
                        <div className="upSessionInfo">
                          <h5>
                            {null != this.state.details.upcomingSessionDate &&
                            null != this.state.details.upcomingSessionTime
                              ? this.state.details.upcomingSessionDate +
                                " " +
                                this.state.details.upcomingSessionTime
                              : "No sessions found"}
                          </h5>
                          <p className="mb-0">
                            {null != this.state.details.upcomingSessionTeacher
                              ? this.state.details.upcomingSessionTeacher
                              : ""}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card body>
                      <CardTitle className="mt-0">Previous Session</CardTitle>

                      <div className="d-flex mt-3">
                        <div className="flex-shrink-0 me-3">
                          <img
                            className="rounded avatar-sm"
                            src={
                              null !=
                              this.state.details.previousSessionTeacherImage
                                ? this.state.details.previousSessionTeacherImage
                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            }
                            alt="Generic placeholder image"
                          />
                        </div>
                        <div className="upSessionInfo">
                          <h5>
                            {null != this.state.details.previousSessionDate &&
                            null != this.state.details.previousSessionTime
                              ? this.state.details.previousSessionDate +
                                " " +
                                this.state.details.previousSessionTime
                              : "No sessions found"}
                          </h5>
                          <p className="mb-0">
                            {null != this.state.details.previousSessionTeacher
                              ? this.state.details.previousSessionTeacher
                              : ""}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Card>
                      <CardBody>
                        <Nav pills className="navtab-bg nav-justified">
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: this.state.activeTab1 === "1",
                              })}
                              onClick={() => {
                                this.toggle1("1")
                              }}
                            >
                              Session Timeline
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: this.state.activeTab1 === "2",
                              })}
                              onClick={() => {
                                this.toggle1("2")
                              }}
                            >
                              Coin purchase history
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: this.state.activeTab1 === "3",
                              })}
                              onClick={() => {
                                this.toggle1("3")
                              }}
                            >
                              Reports against student
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent
                          activeTab={this.state.activeTab1}
                          className="p-3 text-muted"
                        >
                          <TabPane tabId="1">
                            <Row>
                              <Col sm="12">
                                <SessionTimeLineTable
                                  data={this.state.sessionTimeLineData}
                                />
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="2">
                            <Row>
                              <Col sm="12">
                                <CoinPurchaseHistory
                                  data={this.state.coinPurchaseHistoryData}
                                />
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="3">
                            <Row>
                              <Col sm="12">
                                <ReportAgainstStudent />
                              </Col>
                            </Row>
                          </TabPane>
                        </TabContent>
                      </CardBody>
                    </Card>
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
                          <h5 className="modal-title mt-0" id="myModalLabel">
                            Enter new wallet balance
                          </h5>
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
                          <AvField
                            name="coinbalance"
                            label="Coin balance"
                            value={this.state.selectedRow.coinBalance}
                            onChange={this.handleChange}
                            type="number"
                            required
                          />
                        </div>
                        <div className="modal-footer">
                          <button type="submit" className="btn btn-primary">
                            Update
                          </button>
                        </div>
                      </AvForm>
                    </Modal>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
    StudentProfile.propTypes = {
      match: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string,
        }),
      }),
    }
  }
}

export default StudentProfile
