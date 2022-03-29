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
            <h4>Data Reports</h4>
            <Row>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <a href="" className="">
                      Latest Students Reports
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
