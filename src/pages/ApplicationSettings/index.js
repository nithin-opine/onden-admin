import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import { BaseUrl } from "../../config/BaseUrl"
import { apiGet } from "../../config/apiConfig"
import { Link } from "react-router-dom"

class ApplicationSettings extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Onden | Settings</title>
          </MetaTags>
          <Container fluid>
            <h4 className="mb-4">Master Settings</h4>
            <Row>
              <Col md={12} className="mb-2">
                <Link to="/package-settings">1. Package Settings</Link>
              </Col>
              <Col md={12}>
                <Link to="/coin-settings">2. Coin value Settings</Link>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default ApplicationSettings
