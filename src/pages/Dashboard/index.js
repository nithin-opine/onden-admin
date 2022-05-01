import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Link } from "react-router-dom"
import {
  Container,
  CardBody,
  Card,
  Col,
  Row,
  CardTitle,
  Progress,
} from "reactstrap"
import Apaexlinecolumn from "./Charts/apaexlinecolumn"
import LineChart from "./Charts/linebrickchart"
import LineYear from "./Charts/lineYear"
import Line from "./Charts/linechart"
import Pie from "./Charts/piechart"
import { BaseUrl } from "../../config/BaseUrl"
import { apiGet } from "../../config/apiConfig"
import StudentTurnOver from "./Charts/studentTurnOver"

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dashboardDetails: {},
      countryTutorList: [],
      topTutors: [],
      packageSelection: [],
      yearEnrollment: [],
      weekEnrollment: [],
      studentEnrollment: [],
      turnOver: [],
      packageSelectionByMonth: [],
    }
  }
  componentDidMount() {
    let url = BaseUrl.apiUrl.baseUrl + "api/admin/report/dashboard_admin"
    let resp = apiGet(url)
    resp.then(resp => {
      this.setState({ dashboardDetails: resp.response.data.data }, () => {
        console.log(this.state.dashboardDetails)
      })
      this.setState(
        {
          countryTutorList: resp.response.data.data.countryTutorList,
        },
        () => {}
      )
      this.setState(
        {
          topTutors: resp.response.data.data.topTutorsList,
        },
        () => {}
      )
      this.setState(
        { packageSelection: resp.response.data.data.packageSelections },
        () => {}
      )
      this.setState(
        { yearEnrollment: resp.response.data.data.enrollmentsByYear },
        () => {}
      )
      this.setState(
        { weekEnrollment: resp.response.data.data.enrollmentsByWeek },
        () => {}
      )
      this.setState({
        turnOver: resp.response.data.data.turnOverByYear,
      })
      this.setState(
        {
          studentEnrollment: resp.response.data.data.enrollmentByLevels,
        },
        () => {}
      )
      this.setState(
        {
          packageSelectionByMonth:
            resp.response.data.data.packageSelectionsByMonth,
        },
        () => {}
      )
    })
  }
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Dashboard | Onden Admin</title>
          </MetaTags>
          <Container fluid>
            <h4>Dashboard</h4>
            <Row>
              <Col xl="4">
                <Card className="overflow-hidden">
                  <CardBody className="pt-0">
                    <Row>
                      <Col sm="12">
                        <div className=" mt-4">
                          <h5 className="">Welcome Back !</h5>
                          <p>Onden Admin</p>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">
                      Monthly Revenue for ONDEN
                    </CardTitle>
                    <Row>
                      <Col sm="12">
                        <p className="text-muted">This month</p>
                        <h3>
                          {null != this.state.dashboardDetails.lastMonthRevenue
                            ? this.state.dashboardDetails.lastMonthRevenue
                            : "0"}
                          ¥
                        </h3>
                        <p className="text-muted">
                          <span className="text-success me-2">
                            {" "}
                            {null !=
                            this.state.dashboardDetails
                              .percentFromLastMonthRevenue
                              ? this.state.dashboardDetails
                                  .percentFromLastMonthRevenue
                              : "0"}
                            % From previous period
                          </span>
                        </p>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">
                      Monthly Teacher Expense
                    </CardTitle>
                    <Row>
                      <Col sm="6">
                        <p className="text-muted">Tutor Payment</p>
                        <h3>0¥</h3>
                        <p className="text-muted">
                          <span className="text-success me-2">
                            {" "}
                            0% <i className="mdi mdi-arrow-up"></i>{" "}
                          </span>{" "}
                          From previous period
                        </p>
                      </Col>
                      <Col sm="6">
                        <p className="text-muted">Pending tutor payment</p>
                        <h3>0¥</h3>
                        <p className="text-muted">
                          <span className="text-success me-2">
                            {" "}
                            0% <i className="mdi mdi-arrow-up"></i>{" "}
                          </span>{" "}
                          From previous period
                        </p>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md={8}>
                <Row>
                  <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">New Students</p>
                            <h4 className="mb-0">
                              {this.state.dashboardDetails.newStudents}
                            </h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i className={"bx bx-copy-alt font-size-24"}></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">New Tutors</p>
                            <h4 className="mb-0">
                              {this.state.dashboardDetails.newTeachers}
                            </h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={"bx bx-archive-in font-size-24"}
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">Revenue</p>
                            <h4 className="mb-0">
                              {this.state.dashboardDetails.revenue}¥
                            </h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx bx bx-purchase-tag-alt font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Card>
                      <CardBody>
                        <CardTitle className="mb-4">
                          {" "}
                          Student enrollments
                        </CardTitle>
                        <Apaexlinecolumn data={this.state.studentEnrollment} />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Registration Media</CardTitle>
                    <div className="text-center">
                      <div className="avatar-sm mx-auto mb-4">
                        <span className="avatar-title rounded-circle bg-primary bg-soft font-size-24">
                          <i className="bx bx-file text-primary"></i>
                        </span>
                      </div>
                      <p className="font-16 text-muted mb-2"></p>
                      <h5>
                        <Link to="#" className="text-dark">
                          Normal Registrations -{" "}
                          <span className="text-muted font-16">
                            {this.state.dashboardDetails.studentRegistrations
                              ? this.state.dashboardDetails
                                  .studentRegistrations[0].users + " "
                              : ""}{" "}
                            Registrations
                          </span>{" "}
                        </Link>
                      </h5>
                    </div>

                    <Row className="mt-4">
                      <Col xs="4">
                        <div className="social-source text-center mt-3">
                          <div className="avatar-xs mx-auto mb-3">
                            <span className="avatar-title rounded-circle bg-primary font-size-16">
                              <i className="mdi mdi-facebook text-white"></i>
                            </span>
                          </div>
                          <h5 className="font-size-15">Facebook</h5>
                          <p className="text-muted mb-0">
                            {this.state.dashboardDetails.studentRegistrations
                              ? this.state.dashboardDetails
                                  .studentRegistrations[1].users + " "
                              : ""}
                            Registrations
                          </p>
                        </div>
                      </Col>
                      <Col xs="4">
                        <div className="social-source text-center mt-3">
                          <div className="avatar-xs mx-auto mb-3">
                            <span className="avatar-title rounded-circle bg-info font-size-16">
                              <i className="mdi mdi-facebook text-white"></i>
                            </span>
                          </div>
                          <h5 className="font-size-15">Google</h5>
                          <p className="text-muted mb-0">
                            {this.state.dashboardDetails.studentRegistrations
                              ? this.state.dashboardDetails
                                  .studentRegistrations[2].users + " "
                              : ""}
                            Registrations
                          </p>
                        </div>
                      </Col>
                      <Col xs="4">
                        <div className="social-source text-center mt-3">
                          <div className="avatar-xs mx-auto mb-3">
                            <span className="avatar-title rounded-circle bg-black font-size-16">
                              <i className="mdi mdi-facebook text-white"></i>
                            </span>
                          </div>
                          <h5 className="font-size-15">Apple</h5>
                          <p className="text-muted mb-0">
                            {this.state.dashboardDetails.studentRegistrations
                              ? this.state.dashboardDetails
                                  .studentRegistrations[1].users + " "
                              : ""}
                            Registrations
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-5">
                      Tutor country of origin
                    </CardTitle>
                    <ul className="verti-timeline list-unstyled">
                      {this.state.countryTutorList.map((tutor, key) => (
                        <li className="event-list" key={"_li_" + key}>
                          <div className="event-timeline-dot">
                            <i className="bx bx-right-arrow-circle font-size-18" />
                          </div>
                          <div className="d-flex">
                            <div className="me-3">
                              <h5 className="font-size-14">
                                {tutor.country}
                                <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" />
                              </h5>
                            </div>
                            <div className="flex-grow-1">
                              <div>
                                {tutor.tutors}
                                {" tutors"}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Top Tutors</CardTitle>
                    <div className="text-center">
                      <div className="mb-4">
                        <i className="bx bx-map-pin text-primary display-4" />
                      </div>
                      <h3>
                        {this.state.topTutors[0]
                          ? this.state.topTutors[0].teacherFirstName
                          : ""}
                      </h3>
                      <p>
                        {this.state.topTutors[0]
                          ? this.state.topTutors[0].ratings
                          : "Null "}{" "}
                        Rating,
                        {this.state.topTutors[0]
                          ? this.state.topTutors[0].classDuration
                          : "Null"}{" "}
                        Total class duration{" "}
                      </p>
                    </div>

                    <div className="table-responsive mt-4">
                      <table className="table align-middle table-nowrap">
                        <tbody>
                          {this.state.topTutors.map((toptutor, key) => (
                            <tr key={"_tr_" + key}>
                              <td style={{ width: "30%" }}>
                                <p className="mb-0">
                                  {toptutor.teacherFirstName +
                                    " " +
                                    toptutor.teacherLastName}
                                </p>
                              </td>
                              <td style={{ width: "25%" }}>
                                <h5 className="mb-0">
                                  {null != toptutor.ratings
                                    ? toptutor.ratings + ","
                                    : ""}
                                </h5>
                              </td>
                              <td style={{ width: "25%" }}>
                                {toptutor.classDuration}
                              </td>
                              <td>
                                <Progress
                                  value="100"
                                  color="primary"
                                  className="bg-transparent progress-sm"
                                  size="sm"
                                />
                              </td>
                            </tr>
                          ))}
                          {/* <tr>
                            <td>
                              <p className="mb-0">Los Angeles</p>
                            </td>
                            <td>
                              <h5 className="mb-0">1,123</h5>
                            </td>
                            <td>
                              <Progress
                                value="82"
                                color="success"
                                className="bg-transparent progress-sm"
                                size="sm"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="mb-0">San Diego</p>
                            </td>
                            <td>
                              <h5 className="mb-0">1,026</h5>
                            </td>
                            <td>
                              <Progress
                                value="70"
                                color="warning"
                                className="bg-transparent progress-sm"
                                size="sm"
                              />
                            </td>
                          </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">
                      {" "}
                      Enrollments (by year)
                    </CardTitle>
                    <LineYear data={this.state.yearEnrollment} />
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">
                      {" "}
                      Enrollments (by month)
                    </CardTitle>
                    <Line data={this.state.weekEnrollment} />
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <CardBody>
                    <CardTitle>Package selection</CardTitle>
                    <div id="pie-chart" className="e-chart">
                      <Pie data={this.state.packageSelection} />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Card>
                  <CardBody>
                    <CardTitle>Packages selected this month</CardTitle>
                    <LineChart data={this.state.packageSelectionByMonth} />
                  </CardBody>
                </Card>
              </Col>
              <Col md={8}>
                <Card>
                  <CardBody>
                    <CardTitle>Student turn over rate (by year)</CardTitle>
                    <StudentTurnOver data={this.state.turnOver} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard
