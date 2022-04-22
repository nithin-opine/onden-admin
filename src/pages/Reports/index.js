import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
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
                    <Link to="/latest-student-reports" className="">
                      1. Latest Students Reports
                    </Link>
                    <br />
                    <br />
                    <Link to="latest-tutor-reports" className="">
                      2. Latest Tutors Reports
                    </Link>
                    <br />
                    <br />
                    <Link to="/resignation-report" className="">
                      3. Resignation Reports
                    </Link>
                    <br />
                    <br />
                    <Link to="student-leave-reports" className="">
                      4. Reports of students who left Onden
                    </Link>
                    <br />
                    <br />
                    <Link to="/interview-reports" className="">
                      5. Interview Reports
                    </Link>
                    <br />
                    <br />
                    <Link to="/fee-reports" className="">
                      6. Fee Reports
                    </Link>
                    <br />
                    <br />
                    <Link to="/student-timing-reports" className="">
                      7. Most opted student time
                    </Link>
                    <br />
                    <br />
                    <Link to="/tutor-timing-reports" className="">
                      8. Most availed tutor timings
                    </Link>
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
