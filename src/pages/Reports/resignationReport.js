import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-enterprise"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import { BaseUrl } from "../../config/BaseUrl"
import { apiGet } from "../../config/apiConfig"

class ResignationReports extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // start_date: "2021-03-22",
      // end_date: "2022-03-24",
      columnDefs: [
        {
          field: "teacherId",
          headerName: "Tutor Id",
          filter: "agMultiColumnFilter",
        },
        {
          field: "teacherFirstName",
          headerName: "First Name",
          filter: "agMultiColumnFilter",
        },
        {
          field: "teacherLastName",
          headerName: "Last Name",
          filter: "agMultiColumnFilter",
        },
        {
          field: "nickname",
          headerName: "Nick Name",
          filter: "agMultiColumnFilter",
        },
        {
          field: "nickname",
          headerName: "Phone Number",
          filter: "agMultiColumnFilter",
        },
        {
          field: "nickname",
          headerName: "Email",
          filter: "agMultiColumnFilter",
        },
        {
          field: "nickname",
          headerName: "Joined on",
          filter: "agMultiColumnFilter",
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        floatingFilter: true,
        menuTabs: ["filterMenuTab"],
        sortable: true,
      },
      rowData: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.getReport = this.getReport.bind(this)
  }

  handleChange(event) {
    console.log("changed")
    this.setState({ [event.target.name]: event.target.value })
  }
  getReport() {
    let url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/report/resignation_report/" +
      this.state.start_date +
      "/" +
      this.state.end_date
    let resp = apiGet(url)
    resp.then(resp =>
      // updateData(resp.response.data.data)
      this.setState({ rowData: resp.response.data.data })
    )
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi

    const updateData = data => params.api.setRowData(data)

    let url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/report/resignation_report/2021-01-01/2022-04-22"
    //  +
    // this.state.start_date +
    // "/" +
    // this.state.end_date
    let resp = apiGet(url)
    resp.then(
      resp => updateData(resp.response.data.data)
      // this.setState({ rowData: resp.response.data.data })
    )
  }
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Onden | Resignation Reports</title>
          </MetaTags>
          <Container fluid>
            <h4>RESIGNATION REPORT</h4>
            <Row>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <div style={{ width: "100%", height: "100%" }}>
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                        className="ag-theme-alpine"
                      >
                        <Row>
                          <Col md={2}>
                            <Card>
                              <CardBody>
                                <div className="filter mb-4">
                                  <h5>Please select date filters</h5>
                                  <label htmlFor="start_date">
                                    Select start date
                                  </label>
                                  <input
                                    type="date"
                                    name="start_date"
                                    placeholder="Start date"
                                    onChange={this.handleChange}
                                    value={this.state.start_date}
                                  />
                                  <label htmlFor="end_date">
                                    Select end date
                                  </label>
                                  <input
                                    type="date"
                                    name="end_date"
                                    placeholder="End date"
                                    onChange={this.handleChange}
                                    value={this.state.end_date}
                                  />
                                  <Button onClick={this.getReport}>
                                    Get report
                                  </Button>
                                </div>
                              </CardBody>
                            </Card>
                          </Col>
                          <Col md={10}>
                            <Card>
                              <CardBody className="report-div">
                                <AgGridReact
                                  columnDefs={this.state.columnDefs}
                                  defaultColDef={this.state.defaultColDef}
                                  onGridReady={this.onGridReady}
                                  rowData={this.state.rowData}
                                />
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </div>
                    </div>
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

export default ResignationReports
