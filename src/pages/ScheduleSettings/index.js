import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container, Card, CardBody, Row, Col, Button } from "reactstrap"
import { BaseUrl } from "../../config/BaseUrl"
import { apiGet, apiPut } from "../../config/apiConfig"

class ScheduleSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiData: "",
    }
    this.deleteSlot = this.deleteSlot.bind(this)
    this.addTimeSlot = this.addTimeSlot.bind(this)
  }
  addTimeSlot() {
    const date = new Date()
    const offset = date.getTimezoneOffset()
    let dateoffset = -540 + offset
    console.log(dateoffset)
  }
  deleteSlot(id) {}
  componentDidMount() {
    let url = BaseUrl.apiUrl.baseUrl + "api/admin/settings/interview_time_slots"

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
            <title>Schedule Settings | Onden Admin</title>
          </MetaTags>
          <Container fluid>
            <h4>Schedule Settings</h4>
            <Row>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={12}>
                        Please select at least 3 comfortable slots for
                        conducting interviews
                      </Col>
                      <Col md={12}>
                        <hr />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <h6>Current time slots</h6>
                      </Col>
                      <Col md={12}>
                        {this.state.apiData
                          ? this.state.apiData.map((v, k) => {
                              return (
                                <>
                                  <Row>
                                    <Col md={12} className="slots">
                                      <input type="time" value={v.startTime} />{" "}
                                      - <input type="time" value={v.endTime} />
                                      <Button
                                        className="deleteslot-btn"
                                        onClick={this.deleteSlot(v.id)}
                                      >
                                        Delete
                                      </Button>
                                    </Col>
                                  </Row>
                                </>
                              )
                            })
                          : ""}
                      </Col>
                      <Col md={12}>
                        <hr />
                      </Col>
                      <Col md={12}>
                        <h6>Add new time slot</h6>
                      </Col>
                      <Col md={12} className="slots">
                        <input type="time" name="selectedTimeStart" /> -{" "}
                        <input type="time" name="selectedTimeEnd" />
                      </Col>
                      <Col md={12}>
                        <Button onClick={this.addTimeSlot}>
                          Add Time slot
                        </Button>
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
  }
}

export default ScheduleSettings
