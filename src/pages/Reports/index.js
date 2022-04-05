import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody } from "reactstrap"

class Reports extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Onden | Reports list</title>
          </MetaTags>
          <Container fluid>
            <h4>Data Report</h4>
            <Row>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <a href="/latest-student-reports" className="">
                      1. Latest Students Reports
                    </a>
                    <br />
                    <br />
                    <a href="latest-tutor-reports" className="">
                      2. Latest Tutors Reports
                    </a>
                    <br />
                    <br />
                    <a href="/resignation-report" className="">
                      3. Resignation Reports
                    </a>
                    <br />
                    <br />
                    <a href="student-leave-reports" className="">
                      4. Reports of students who left Onden
                    </a>
                    <br />
                    <br />
                    <a href="/interview-reports" className="">
                      5. Interview Reports
                    </a>
                    <br />
                    <br />
                    <a href="/fee-reports" className="">
                      6. Fee Reports
                    </a>
                    <br />
                    <br />
                    <a href="/student-timing-reports" className="">
                      7. Most opted student time
                    </a>
                    <br />
                    <br />
                    <a href="/tutor-timing-reports" className="">
                      8. Most availed tutor timings
                    </a>
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

export default Reports
