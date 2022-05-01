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
import CoinWithdrawalHistory from "./CoinWithdrawalHistoryTable"
import ReportAgainstTutor from "./ReportAgainstTutorTable"
import { BaseUrl } from "../../config/BaseUrl"
import { apiGet, apiPut } from "../../config/apiConfig"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

class TeacherProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModelOpen: false,
      isModelOpen1: false,
      activeTab1: "1",
      details: {},
      sessionTimeLine: [],
      selectedRow: {},
      sessionTimeLineData: [],
      coinWidthdrawalHistory: [],
      coinWidthdrawalHistoryData: [],
      toastData: {},
    }
    this.tog_standard = this.tog_standard.bind(this)
    this.tog_standard1 = this.tog_standard1.bind(this)
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
    this.handleValidSubmit1 = this.handleValidSubmit1.bind(this)
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
  handleValidSubmit() {
    let url = BaseUrl.apiUrl.baseUrl + "api/admin/teacher/reset_teacher_wallet"
    let body = {
      teacherId: this.state.details.id,
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
  handleValidSubmit1() {
    let url =
      BaseUrl.apiUrl.baseUrl + "api/admin/teacher/set_teacher_coin_ratio"
    let body = {
      id: this.state.details.id.toString(),
      coinValue: this.state.selectedRow.coinRatio,
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
          this.tog_standard1()
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
      "api/admin/teacher/teacher_profile/" +
      this.props.match.params.id

    let resp = apiGet(url)
    resp.then(resp => {
      console.log("resp is", resp)
      this.setState(
        {
          details: resp.response.data.data,
          sessionTimeLine: resp.response.data.data.sessionList,
          coinWidthdrawalHistory: resp.response.data.data.coinWithdrawalList,
        },
        () => {
          console.log("details is", this.state.details)
          let sessionRows = []
          let coinRows = []
          this.state.sessionTimeLine.forEach((value, index) => {
            let temp = {
              sessionNumber: value.sessionNumber,
              sessionDate: value.sessionDate + " " + value.startTime,
              studentFirstName:
                value.studentFirstName + " " + value.studentLastName,
              sessionDuration: value.sessionDuration,
              disputeStatus:
                value.disputeStatus == 1 ? value.disputeReason : "No disputes",
            }
            sessionRows.push(temp)
          })
          this.state.coinWidthdrawalHistory.forEach((value, index) => {
            let status = ""
            switch (value.paymentRequestStatus) {
              case 1:
                status = "open"
                break
              case 2:
                status = "Close"
                break
              case 3:
                status = "Pending"
                break
              case 4:
                status = "Rejected"
                break
              default:
              // code block
            }
            let coinhistory = {
              paymentTranferRequestedOn: value.paymentTranferRequestedOn,
              amountToBeTransferred: value.amountToBeTransferred,
              paymentRequestStatus: status,
              paymentTranferredOn: value.paymentTranferredOn,
            }
            coinRows.push(coinhistory)
          })

          this.setState({ sessionTimeLineData: sessionRows })
          this.setState({ coinWidthdrawalHistoryData: coinRows })
        }
      )
    })
  }
  componentDidMount() {
    let url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/teacher/teacher_profile/" +
      this.props.match.params.id

    let resp = apiGet(url)
    resp.then(resp => {
      console.log("resp is", resp)
      this.setState(
        {
          details: resp.response.data.data,
          sessionTimeLine: resp.response.data.data.sessionList,
          coinWidthdrawalHistory: resp.response.data.data.coinWithdrawalList,
        },
        () => {
          console.log("details is", this.state.details)
          let sessionRows = []
          let coinRows = []
          this.state.sessionTimeLine.forEach((value, index) => {
            let temp = {
              sessionNumber: value.sessionNumber,
              sessionDate: value.sessionDate + " " + value.startTime,
              studentFirstName:
                value.studentFirstName + " " + value.studentLastName,
              sessionDuration: value.sessionDuration,
              disputeStatus:
                value.disputeStatus == 1 ? value.disputeReason : "No disputes",
            }
            sessionRows.push(temp)
          })
          this.state.coinWidthdrawalHistory.forEach((value, index) => {
            let status = ""
            switch (value.paymentRequestStatus) {
              case 1:
                status = "open"
                break
              case 2:
                status = "Close"
                break
              case 3:
                status = "Pending"
                break
              case 4:
                status = "Rejected"
                break
              default:
              // code block
            }
            let coinhistory = {
              paymentTranferRequestedOn: value.paymentTranferRequestedOn,
              amountToBeTransferred: value.amountToBeTransferred,
              paymentRequestStatus: status,
              paymentTranferredOn: value.paymentTranferredOn,
            }
            coinRows.push(coinhistory)
          })

          this.setState({ sessionTimeLineData: sessionRows })
          this.setState({ coinWidthdrawalHistoryData: coinRows })
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
            <title>Onden | Tutor-profile</title>
          </MetaTags>
          <Container fluid>
            <h4>Tutor Profile</h4>
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
                              {this.state.details.teacherFirstName}{" "}
                              {this.state.details.teacherLastName}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Country :</th>
                            <td>{this.state.details.country}</td>
                          </tr>
                          <tr>
                            <th scope="row">Native language :</th>
                            <td>{this.state.details.nativeLanguage}</td>
                          </tr>
                          <tr>
                            <th scope="row">Staff from:</th>
                            <td>{this.state.details.staffFrom}</td>
                          </tr>
                          <tr>
                            <th scope="row">Level :</th>
                            <td>{this.state.details.level}</td>
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
                    <Row className="profileActions">
                      <Col md={12} onClick={this.tog_standard}>
                        <i className="fas fa-coins"></i>
                        <span className="ss">Edit Coin Balance</span>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Row className="profileActions ">
                      <Col md={12} onClick={this.tog_standard1}>
                        <i className="bx bx-yen"></i>
                        <span className="ss">Edit coin exchange ratio</span>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col xl="8" className="mt-4">
                <Row>
                  <MiniCards
                    title="Completed Sessions"
                    text={this.state.details.completedSessions + " sessions"}
                    iconClass="bx-check-circle"
                  />
                  <MiniCards
                    title="Scheduled Sessions"
                    text={this.state.details.scheduledSessions + " sessions"}
                    iconClass="bx-hourglass"
                  />
                  <MiniCards
                    title="Coin balance"
                    text={
                      null != this.state.details.coinBalance
                        ? this.state.details.coinBalance.toString() + " coins"
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
                              this.state.details.upcomingSessionStudentImage
                                ? this.state.details.upcomingSessionStudentImage
                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            }
                            alt="Generic placeholder image"
                          />
                        </div>
                        <div className="upSessionInfo">
                          <h5>
                            {null != this.state.details.upcomingSessionDate &&
                            null != this.state.details.upcomingSessionDate
                              ? this.state.details.upcomingSessionDate +
                                " " +
                                this.state.details.upcomingSessionTime
                              : "No sessions found"}
                          </h5>
                          <p className="mb-0">
                            {null != this.state.details.upcomingSessionStudent
                              ? this.state.details.upcomingSessionStudent
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
                              this.state.details.previousSessionStudentImage
                                ? this.state.details.previousSessionStudentImage
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
                            {null != this.state.details.previousSessionStudent
                              ? this.state.details.previousSessionStudent
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
                              Coin withdrawal history
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
                              Reports against tutor
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
                                <CoinWithdrawalHistory
                                  data={this.state.coinWidthdrawalHistoryData}
                                />
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="3">
                            <Row>
                              <Col sm="12">
                                <ReportAgainstTutor />
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
                            min="0"
                            step="1"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                          />
                        </div>
                        <div className="modal-footer">
                          <button type="submit" className="btn btn-primary">
                            Update
                          </button>
                        </div>
                      </AvForm>
                    </Modal>
                    <Modal
                      isOpen={this.state.isModelOpen1}
                      toggle={this.tog_standard1}
                      className="modal-sm modal-dialog-centered"
                    >
                      <AvForm
                        onValidSubmit={this.handleValidSubmit1}
                        onInvalidSubmit={this.handleInvalidSubmit}
                      >
                        <div className="modal-header">
                          <h5 className="modal-title mt-0" id="myModalLabel">
                            Edit coin exchange ratio
                          </h5>
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
                          <p>
                            Current exchange ratio is{" "}
                            {this.state.details.coinRatio}
                          </p>
                          <AvField
                            name="coinRatio"
                            label="New exchange ratio"
                            placeholder="Enter ratio"
                            value={this.state.selectedRow.coinRatio}
                            onChange={this.handleChange}
                            type="number"
                            required
                            min="0"
                            step="1"
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
    TeacherProfile.propTypes = {
      match: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string,
        }),
      }),
    }
  }
}

export default TeacherProfile
