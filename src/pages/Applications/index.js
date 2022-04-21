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
import { Link } from "react-router-dom"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import { BaseUrl } from "../../config/BaseUrl"
import { apiGet } from "../../config/apiConfig"

const columns = [
  {
    dataField: "id",
    text: "Application ID",
    sort: true,
  },
  {
    dataField: "name",
    text: "Applicant Name",
    sort: true,
  },
  {
    dataField: "country",
    text: "Country",
    sort: true,
  },
  {
    dataField: "date",
    text: "Applied date",
    sort: true,
  },
  {
    dataField: "view",
    text: "View application",
    sort: true,
  },
]

// Table Data

const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
]

const pageOptions = {
  sizePerPage: 10,
  custom: true,
}

// Custom Pagination Toggle
const sizePerPageList = [
  { text: "5", value: 5 },
  { text: "10", value: 10 },
  { text: "15", value: 15 },
  { text: "20", value: 20 },
  { text: "25", value: 25 },
]

// Select All Button operation
const selectRow = {
  mode: "checkbox",
}

const { SearchBar } = Search

class ApplicationList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiData: [],
      tableData: [],
    }
  }

  componentDidMount() {
    let url =
      BaseUrl.apiUrl.baseUrl + "api/admin/teacher/interview_application_list"
    let resp = apiGet(url)

    resp.then(resp => {
      console.log(resp)
      const rows = []
      resp.response.data.data.forEach((value, index) => {
        let date = new Date(value.dateCreated)
        let localDate = date.toLocaleString()
        rows.push({
          id: value.teacherId,
          name: value.firstname + " " + value.lastname,
          country: value.country,
          date: localDate,
          view: (
            <>
              <Link to={"/application/" + value.id} className="tableBtn">
                View application
              </Link>
            </>
          ),
        })
      })
      this.setState({ tableData: rows })
    })
  }

  render() {
    console.log(this.state.tableData)
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Onden | Students List</title>
          </MetaTags>
          <Container fluid>
            <h4>Applications List</h4>
            <Row>
              <Col md={12}>
                <Card className="mini-stats-wid">
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={columns}
                      data={this.state.tableData}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={columns}
                          data={this.state.tableData}
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col md="4">
                                  <div className="search-box me-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={"id"}
                                      responsive
                                      bordered={false}
                                      striped={false}
                                      defaultSorted={defaultSorted}
                                      selectRow={selectRow}
                                      classes={
                                        "table align-middle table-nowrap"
                                      }
                                      headerWrapperClasses={"thead-light"}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="align-items-md-center mt-30">
                                <Col className="inner-custom-pagination d-flex">
                                  <div className="d-inline">
                                    <SizePerPageDropdownStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                  <div className="text-md-right ms-auto">
                                    <PaginationListStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
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

export default ApplicationList
