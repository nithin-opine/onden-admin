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
} from "reactstrap"
import MiniCards from "./mini-card"
import { Link } from "react-router-dom"
import classnames from "classnames"
import avatar3 from "../../assets/images/users/avatar-3.jpg"
import SessionTimeLineTable from "./SessionTimeLineTable"
import CoinPurchaseHistory from "./CoinPurchaseHistoryTable"
import ReportAgainstStudent from "./ReportAgainstStudentTable"
import { BaseUrl } from "../../config/BaseUrl"
import { apiGet } from "../../config/apiConfig"
class StudentProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab1: "1",
      details: {},
      sessionTimeLine: [],
    }
  }

  toggle1(tab) {
    if (this.state.activeTab1 !== tab) {
      this.setState({ activeTab1: tab })
    }
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
        },
        () => {
          console.log("details is", this.state.sessionTimeLine)
        }
      )
    })
  }
  render() {
    return (
      <React.Fragment>
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
                      <Link to="#">
                        <Col md={12}>
                          <i className="fas fa-coins"></i>
                          <span className="ss">Edit Coin Balance</span>
                        </Col>
                      </Link>
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
                                  data={this.state.sessionTimeLine}
                                />
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="2">
                            <Row>
                              <Col sm="12">
                                <CoinPurchaseHistory />
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
                  </Col>
                </Row>
                {/* <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Revenue</CardTitle>
                    <div id="revenue-chart">
                      <ApexRevenue />
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">My Projects</CardTitle>
                    <ToolkitProvider
                      keyField="id"
                      data={userProfile.projects || []}
                      columns={projectColumns()}
                      bootstrap4
                    >
                      {toolkitProps => (
                        <React.Fragment>
                          <Row>
                            <Col xl="12">
                              <div className="table-responsive">
                                <BootstrapTable
                                  responsive
                                  remote
                                  bordered={false}
                                  striped={false}
                                  classes={
                                    "table align-middle table-nowrap table-hover"
                                  }
                                  {...toolkitProps.baseProps}
                                />
                              </div>
                            </Col>
                          </Row>
                        </React.Fragment>
                      )}
                    </ToolkitProvider>
                  </CardBody>
                </Card> */}
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
