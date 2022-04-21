import React, { Component } from "react"

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Media,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
} from "reactstrap"
import classnames from "classnames"
import { apiGet, apiPut } from "../../config/apiConfig"
import { BaseUrl } from "../../config/BaseUrl"
import toastr from "toastr"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import SessionSummary from "./SessionSummary"

export default class Withdrawal extends Component {
  constructor(props) {
    super(props)
    this.state = { activeTab: "1", apiList: "", loading: true }
    this.confirmPayment = this.confirmPayment.bind(this)
    this.showToast = this.showToast.bind(this)
  }
  componentDidMount() {
    const Url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/teacher/payment_request/" +
      this.props.match.params.id
    let resp = apiGet(Url)
    resp.then(resp => this.setState({ apiList: resp.response.data.data }))
  }
  confirmPayment() {
    this.setState({ loading: false })
    const Url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/teacher/update_payment_transferred/" +
      this.props.match.params.id
    let resp = apiPut(Url)
    resp.then(resp => {
      console.log(resp.response)
      if (resp.response.data.status == "Failed") {
        this.showToast(2)
        this.setState({ modal_interview: false })
      } else {
        this.showToast(1)
        this.setState({ modal_interview: false })
        this.setState({ loading: true })
      }
    })
  }
  showToast(x) {
    switch (x) {
      case 1:
        var title = "Success"
        var message = "Succesfully confirmed payment release"
        toastr.success(message, title)
        break
      case 2:
        var title = "Error"
        var message = "Payment release error"
        toastr.warning(message, title)
        break
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.state.apiList !== null ? (
          <div className="page-content">
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs
                title="Withdrawal request"
                breadcrumbItem="Withdrawal summary"
              />

              <div className="checkout-tabs">
                <Row>
                  <Col lg="2">
                    <Nav className="flex-column" pills>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "1",
                          })}
                          onClick={() => {
                            this.setState({ activeTab: "1" })
                          }}
                        >
                          <i className="bx bx-question-mark d-block check-nav-icon mt-4 mb-2"></i>
                          <p className="font-weight-bold mb-4">
                            Session summary
                          </p>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "2",
                          })}
                          onClick={() => {
                            this.setState({ activeTab: "2" })
                          }}
                        >
                          <i className="bx bx-check-shield d-block check-nav-icon mt-4 mb-2"></i>
                          <p className="font-weight-bold mb-4">
                            Payment information
                          </p>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "3",
                          })}
                          onClick={() => {
                            this.setState({ activeTab: "3" })
                          }}
                        >
                          <i className="bx bx-support d-block check-nav-icon mt-4 mb-2"></i>
                          <p className="font-weight-bold mb-4">
                            Process payment
                          </p>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col lg="10">
                    <Card>
                      <CardBody>
                        <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="1">
                            <CardTitle className="mb-5">
                              Session summary
                            </CardTitle>
                            <Media className="faq-box mb-4">
                              <div className="faq-icon mr-3">
                                <i className="bx bx-help-circle font-size-20 text-success"></i>
                              </div>
                              <Media body>
                                <p className="text-muted">
                                  Session summary of the tutor for coins since
                                  his/her last withdrawal. Please check disputed
                                  sessions and fix coin transfers.
                                </p>
                              </Media>
                            </Media>
                            <SessionSummary
                              payid={this.props.match.params.id}
                            />
                          </TabPane>
                          <TabPane tabId="2">
                            <CardTitle className="mb-5">
                              Review information
                            </CardTitle>
                            <Row>
                              <Col md={8}>
                                <Row>
                                  <Col md={3}>Name :</Col>
                                  <Col>
                                    <b>
                                      {this.state.apiList.teacherFirstName +
                                        " " +
                                        this.state.apiList.teacherLastName}
                                    </b>
                                  </Col>
                                </Row>
                                <Row className="mt-2">
                                  <Col md={3}>Country :</Col>
                                  <Col>
                                    <b>{this.state.apiList.country}</b>
                                  </Col>
                                </Row>
                                <Row className="mt-2">
                                  <Col md={3}>Email address :</Col>
                                  <Col>
                                    <b>{this.state.apiList.email}</b>
                                  </Col>
                                </Row>
                                <Row className="mt-2">
                                  <Col md={3}>Paypal address :</Col>
                                  <Col>
                                    <b>{this.state.apiList.paypalEmail}</b>
                                  </Col>
                                </Row>
                                <Row className="mt-2">
                                  <Col>
                                    <hr />
                                  </Col>
                                </Row>
                                <Row className="mt-2">
                                  <Col md={3}>Coins requested :</Col>
                                  <Col>
                                    <b>
                                      {this.state.apiList.coinsToBeTransferred}
                                    </b>
                                  </Col>
                                </Row>
                                <Row className="mt-2">
                                  <Col md={3}>Coin balance :</Col>
                                  <Col>
                                    <b>{this.state.apiList.coinsInHand}</b>
                                  </Col>
                                </Row>
                                <Row className="mt-2">
                                  <Col md={3}>Coins exchange ratio :</Col>
                                  <Col>
                                    <b>
                                      {this.state.apiList.coinExchangeValue}
                                    </b>
                                  </Col>
                                </Row>
                                <Row className="mt-2">
                                  <Col md={3}>Salary benefit :</Col>
                                  <Col>
                                    <b>{this.state.apiList.salaryBenefit} ¥</b>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="3">
                            <CardTitle className="mb-5">
                              Process payment
                            </CardTitle>
                            <Row className="">
                              <Col>
                                Please confirm that you have transferred{" "}
                                <b>{this.state.apiList.salaryBenefit} ¥</b> to{" "}
                                <b>{this.state.apiList.paypalEmail}</b>
                              </Col>
                            </Row>
                            <Row className="">
                              <Col>
                                {this.state.loading ? (
                                  <button
                                    className="conf"
                                    onClick={() => this.confirmPayment()}
                                  >
                                    Confirm and close the request
                                  </button>
                                ) : (
                                  ""
                                )}
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
        ) : (
          <div className="page-content">
            <div className="notFound">
              The resource you requested could not be found.
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}
