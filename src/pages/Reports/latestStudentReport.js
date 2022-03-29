import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-enterprise"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import { BaseUrl } from "../../config/BaseUrl"
import { apiGet } from "../../config/apiConfig"

class LatestStudentReports extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columnDefs: [
        {
          field: "id",
          headerName: "Student Id",
          filter: "agMultiColumnFilter",
        },
        {
          field: "fname",
          headerName: "First Name",
          filter: "agMultiColumnFilter",
        },
        {
          field: "lname",
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
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi

    const updateData = data => params.api.setRowData(data)

    let url = BaseUrl.apiUrl.baseUrl + "api/admin/report/latest_students_list"
    let resp = apiGet(url)
    resp.then(resp => updateData(resp.response.data.data))
  }
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Onden | Latest Student Reports</title>
          </MetaTags>
          <Container fluid>
            <h4>Latest Students Reports</h4>
            <Row>
              <Col md={12}>
                <Card>
                  <CardBody className="report-div">
                    <div style={{ width: "100%", height: "100%" }}>
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                        className="ag-theme-alpine"
                      >
                        <AgGridReact
                          columnDefs={this.state.columnDefs}
                          defaultColDef={this.state.defaultColDef}
                          onGridReady={this.onGridReady}
                          rowData={this.state.rowData}
                        />
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

export default LatestStudentReports
