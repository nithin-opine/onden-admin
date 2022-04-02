import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container, Card, Row, Col, CardBody } from "reactstrap"
import { BaseUrl } from "../../config/BaseUrl"
import { apiGet } from "../../config/apiConfig"

class Interview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiData: [],
      tableData: [],
    }
  }
  componentDidMount() {
    let url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/teacher/interview_application/" +
      this.props.match.params.id
    let resp = apiGet(url)
    resp.then(resp => {
      this.setState({ apiData: resp.response.data.data })
    })
  }
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Dashboard | Skote - React Admin & Dashboard Template</title>
          </MetaTags>
          <Container fluid>
            <h4>Interviews</h4>
            <Row>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={12}>
                        <Row>
                          <Col md={2}>
                            <img src="" alt="" />
                          </Col>
                          <Col md={10}>
                            <Row>
                              <Col md={12}>
                                {this.state.apiData.firstname +
                                  " " +
                                  this.state.apiData.lastname}{" "}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={12}>{this.state.apiData.email}</Col>
                            </Row>
                            <Row>
                              <Col md={4}>Applied on</Col>
                              <Col md={8}>{this.state.apiData.dateCreated}</Col>
                            </Row>
                            <Row>
                              <Col md={4}>Native Language</Col>
                              <Col md={8}>
                                {this.state.apiData.nativeLanguage}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={4}>Languages fluent at</Col>
                              <Col md={8}>
                                {this.state.apiData.languagesFluentAt}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={4}>Work Experience</Col>
                              <Col md={8}>
                                {this.state.apiData.workExperience}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={4}>
                                About {this.state.apiData.firstname}{" "}
                              </Col>
                              <Col md={8}>{this.state.apiData.about}</Col>
                            </Row>
                            <Row>
                              <Col md={4}>Message to the students</Col>
                              <Col md={8}>{this.state.apiData.bio}</Col>
                            </Row>
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
    Interview.propTypes = {
      match: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string,
        }),
      }),
    }
  }
}

export default Interview
