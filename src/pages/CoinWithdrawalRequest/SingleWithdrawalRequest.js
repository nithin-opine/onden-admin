import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"
import { Link } from "react-router-dom"
import classnames from "classnames"
import { BaseUrl } from "../../config/BaseUrl"
import { apiGet } from "../../config/apiConfig"
import BootstrapTheme from "@fullcalendar/bootstrap"
import { object } from "prop-types"

class SingleWithdrawalRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: {},
      activeTab1: "1",
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
      "api/admin/teacher/payment_request/" +
      this.props.match.params.id
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
            <title>Onden | Withdrawal request</title>
          </MetaTags>
          <Container fluid>
            <h4>Withdrawal request</h4>
            <div className="checkout-tabs mt-4">
              <Row>
                <Col lg="2">
                  <Nav className="flex-column" pills>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab1 === "1",
                        })}
                        onClick={() => {
                          this.toggle1("1")
                        }}
                      >
                        <i className="bx bx-question-mark d-block check-nav-icon mt-4 mb-2" />
                        <p className="font-weight-bold mb-4">Session summary</p>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab1 === "2",
                        })}
                        onClick={() => {
                          this.toggle1("2")
                        }}
                      >
                        <i className="bx bx-check-shield d-block check-nav-icon mt-4 mb-2" />
                        <p className="font-weight-bold mb-4">
                          Payment information
                        </p>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab1 === "3",
                        })}
                        onClick={() => {
                          this.toggle1("3")
                        }}
                      >
                        <i className="bx bx-support d-block check-nav-icon mt-4 mb-2" />
                        <p className="font-weight-bold mb-4">Process payment</p>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
                <Col lg="10">
                  <Card>
                    <CardBody>
                      <TabContent activeTab={this.state.activeTab1}>
                        <TabPane tabId="1">
                          <CardTitle className="mb-5">
                            Session summary
                          </CardTitle>
                          <div className="faq-box d-flex mb-4">
                            <div className="flex-shrink-0 me-3 faq-icon">
                              <i className="bx bx-help-circle font-size-20 text-success" />
                            </div>
                            <div className="flex-grow-1">
                              <p className="text-muted">
                                Session summary of the tutor for coins since
                                his/her last withdrawal. Please check disputed
                                sessions and fix coin transfers.
                              </p>
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tabId="2">
                          <CardTitle className="mb-5">
                            Review information
                          </CardTitle>

                          <Row>
                            <Col md={8}>
                              <Row>
                                <Col md={3}>Name</Col>
                                <Col>
                                  <b>
                                    {this.state.details.teacherFirstName}{" "}
                                    {this.state.details.teacherLastName}
                                  </b>
                                </Col>
                              </Row>
                              <Row className="mt-2">
                                <Col md={3}>Country</Col>
                                <Col>
                                  <b>{this.state.details.country}</b>
                                </Col>
                              </Row>
                              <Row className="mt-2">
                                <Col md={3}>Email address</Col>
                                <Col>
                                  <b>{this.state.details.email}</b>
                                </Col>
                              </Row>
                              <Row className="mt-2">
                                <Col md={3}>Paypal address</Col>
                                <Col>
                                  <b>{this.state.details.paypalEmail}</b>
                                </Col>
                              </Row>
                              <Row className="mt-2">
                                <Col>
                                  <hr></hr>
                                </Col>
                              </Row>
                              <Row className="mt-2">
                                <Col md={3}>Coins requested </Col>
                                <Col>
                                  <b>
                                    {this.state.details.coinsToBeTransferred}
                                  </b>
                                </Col>
                              </Row>
                              <Row className="mt-2">
                                <Col md={3}>Coin balance </Col>
                                <Col>
                                  <b>{this.state.details.coinsInHand}</b>
                                </Col>
                              </Row>
                              <Row className="mt-2">
                                <Col md={3}>Coins exchange ratio</Col>
                                <Col>
                                  <b>{this.state.details.coinExchangeValue}</b>
                                </Col>
                              </Row>
                              <Row className="mt-2">
                                <Col md={3}>Salary benefit </Col>
                                <Col>
                                  <b>
                                    {this.state.details.salaryBenefit}
                                    {" ¥"}
                                  </b>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="3">
                          <CardTitle className="mb-5">
                            Process payment
                          </CardTitle>
                          <Row>
                            <Col md={8}>
                              Please confirm that you have transferred{" "}
                              <b>{this.state.details.salaryBenefit} ¥</b> to{" "}
                              <b>{this.state.details.paypalEmail}</b>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <button className="conf">
                                Confirm and close the request
                              </button>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </React.Fragment>
    )
    SingleWithdrawalRequest.propTypes = {
      match: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string,
        }),
      }),
    }
  }
}

export default SingleWithdrawalRequest
