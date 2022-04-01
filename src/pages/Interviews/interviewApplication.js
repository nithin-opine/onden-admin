import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import { BaseUrl } from "../../config/BaseUrl"
import { apiGet } from "../../config/apiConfig"
import BootstrapTheme from "@fullcalendar/bootstrap"
import { object } from "prop-types"

class InterviewApplication extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: {},
    }
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
                            About Fyroz
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
                            >
                              Reject application
                            </button>
                            <button
                              className=""
                              data-toggle="modal"
                              data-target=".bs-example-modal-sm"
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
