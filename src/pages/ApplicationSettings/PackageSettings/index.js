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
  Toast,
  ToastHeader,
  ToastBody,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap"
import { Link } from "react-router-dom"

import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import { BaseUrl } from "../../../config/BaseUrl"
import { apiGet, apiPut } from "../../../config/apiConfig"
import { values } from "lodash"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const columns = [
  {
    dataField: "id",
    text: "Package ID",
    sort: true,
  },
  {
    dataField: "name",
    text: "Package Name",
    sort: true,
  },
  {
    dataField: "amount",
    text: "Package amount",
    sort: true,
  },
  {
    dataField: "coins",
    text: "Coins",
    sort: true,
  },
  {
    dataField: "totalminutes",
    text: "Total minutes",
    sort: true,
  },
  {
    dataField: "expiry",
    text: "Expiry",
    sort: true,
  },
  {
    dataField: "view",
    text: "Edit",
    sort: true,
  },
]

// Table Data
const productData = [
  {
    id: 1,
    name: "Airi Satou",
    position: "Accountant",
    office: "Tokyo",
    age: "33",
    startdate: "2008/11/28",
    salary: "$162,700",
  },

  {
    id: 2,
    name: "Angelica Ramos",
    position: "Chief Executive Officer (CEO)",
    office: "London",
    age: "47",
    startdate: "2009/10/09",
    salary: "$1,200,000",
  },

  {
    id: 3,
    name: "Ashton Cox",
    position: "Junior Technical Author",
    office: "San Francisco",
    age: "66",
    startdate: "2009/01/12",
    salary: "$86,000",
  },

  {
    id: 4,
    name: "Bradley Greer",
    position: "Software Engineer",
    office: "London",
    age: "41",
    startdate: "2012/10/13",
    salary: "$132,000",
  },

  {
    id: 5,
    name: "Brenden Wagner",
    position: "Software Engineer",
    office: "San Francisco",
    age: "28",
    startdate: "2011/06/07",
    salary: "$206,850",
  },

  {
    id: 6,
    name: "Brielle Williamson",
    position: "Integration Specialist",
    office: "New York",
    age: "61",
    startdate: "2012/12/02",
    salary: "$372,000",
  },

  {
    id: 7,
    name: "Bruno Nash",
    position: "Software Engineer",
    office: "London",
    age: "38",
    startdate: "2011/05/03",
    salary: "$163,500",
  },

  {
    id: 8,
    name: "Caesar Vance",
    position: "Pre-Sales Support",
    office: "New York",
    age: "21",
    startdate: "2011/12/12",
    salary: "$106,450",
  },

  {
    id: 9,
    name: "Cara Stevens",
    position: "Sales Assistant",
    office: "New York",
    age: "46",
    startdate: "2011/12/06",
    salary: "$145,600",
  },

  {
    id: 10,
    name: "Cedric Kelly",
    position: "Senior Javascript Developer",
    office: "Edinburgh",
    age: "22",
    startdate: "2012/03/29",
    salary: "$433,060",
  },

  {
    id: 11,
    name: "Marshall",
    position: "Regional Director",
    office: "San Francisco",
    age: "36",
    startdate: "2008/10/16",
    salary: "$470,600",
  },

  {
    id: 12,
    name: "Hurst",
    position: "Javascript Developer",
    office: "San Francisco",
    age: "39",
    startdate: "2009/09/15",
    salary: "$205,500",
  },

  {
    id: 13,
    name: "Rios",
    position: "Personnel Lead",
    office: "Edinburgh",
    age: "35",
    startdate: "2012/09/26",
    salary: "$217,500",
  },

  {
    id: 14,
    name: "Snider",
    position: "Customer Support",
    office: "New York",
    age: "27",
    startdate: "2011/01/25",
    salary: "$112,000",
  },

  {
    id: 15,
    name: "Wilder",
    position: "Sales Assistant",
    office: "Sidney",
    age: "23",
    startdate: "2010/09/20",
    salary: "$85,600",
  },

  {
    id: 16,
    name: "Camacho",
    position: "Support Engineer",
    office: "San Francisco",
    age: "47",
    startdate: "2009/07/07",
    salary: "$87,500",
  },

  {
    id: 17,
    name: "Green",
    position: "Chief Operating Officer (COO)",
    office: "San Francisco",
    age: "48",
    startdate: "2010/03/11",
    salary: "$850,000",
  },

  {
    id: 18,
    name: "Winters",
    position: "Accountant",
    office: "Tokyo",
    age: "63",
    startdate: "2011/07/25",
    salary: "$170,750",
  },

  {
    id: 19,
    name: "Cortez",
    position: "Team Leader",
    office: "San Francisco",
    age: "22",
    startdate: "2008/10/26",
    salary: "$235,500",
  },

  {
    id: 20,
    name: "Joyce",
    position: "Developer",
    office: "Edinburgh",
    age: "42",
    startdate: "2010/12/22",
    salary: "$92,575",
  },

  {
    id: 21,
    name: "Gloria Little",
    position: "Systems Administrator",
    office: "New York",
    age: "59",
    startdate: "2009/04/10",
    salary: "$237,500",
  },

  {
    id: 22,
    name: "Haley Kennedy",
    position: "Senior Marketing Desi,ner",
    office: "London",
    age: "43",
    startdate: "2012/12/18",
    salary: "$313,500",
  },

  {
    id: 23,
    name: "Hermione Butler",
    position: "Regional Director",
    office: "London",
    age: "47",
    startdate: "2011/03/21",
    salary: "$356,250",
  },

  {
    id: 24,
    name: "Herrod Chandler",
    position: "Sales Assistant",
    office: "San Francisco",
    age: "59",
    startdate: "2012/08/06",
    salary: "$137,500",
  },

  {
    id: 25,
    name: "Hope Fuentes",
    position: "Secretary",
    office: "San Francisco",
    age: "41",
    startdate: "2010/02/12",
    salary: "$109,850",
  },

  {
    id: 26,
    name: "Howard Hatfield",
    position: "Office Manager",
    office: "San Francisco",
    age: "51",
    startdate: "2008/12/16",
    salary: "$164,500",
  },

  {
    id: 27,
    name: "Jackson Bradshaw",
    position: "Director",
    office: "New York",
    age: "65",
    startdate: "2008/09/26",
    salary: "$645,750",
  },

  {
    id: 28,
    name: "Jena Gaines",
    position: "Office Manager",
    office: "London",
    age: "30",
    startdate: "2008/12/19",
    salary: "$90,560",
  },

  {
    id: 29,
    name: "Jenette Caldwell",
    position: "Development Lead",
    office: "New York",
    age: "30",
    startdate: "2011/09/03",
    salary: "$345,000",
  },

  {
    id: 30,
    name: "Jennifer Acosta",
    position: "Junior Javascript Devel,per",
    office: "Edinburgh",
    age: "43",
    startdate: "2013/02/01",
    salary: "$75,650",
  },
]

const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
]

const pageOptions = {
  sizePerPage: 10,
  totalSize: productData.length, // replace later with size(customers),
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

class PackageSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModelOpen: false,
      apiData: [],
      tableData: [],
      selectedRow: {},
      toastData: {},
    }
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
    this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.tog_standard = this.tog_standard.bind(this)
    this.openModel = this.openModel.bind(this)
    this.updateGrid = this.updateGrid.bind(this)
  }
  handleValidSubmit() {
    console.log("valid")
    let url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/settings/packages/" +
      this.state.selectedRow.id
    let body = {
      packageName: this.state.selectedRow.name,
      packageAmount: this.state.selectedRow.amount,
      coinsToBeCredited: this.state.selectedRow.coins,
      durationMinutes: this.state.selectedRow.totalminutes,
      usageLimit: this.state.selectedRow.expiry,
    }
    let resp = apiPut(url, body)
    resp.then(resp => {
      console.log("resp is", resp)
      this.setState({ toastData: resp.response.data }, () => {
        console.log("toastData is", this.state.toastData)
        if (resp.response.status == 200) {
          toast.success(this.state.toastData.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
          this.tog_standard()
          this.updateGrid()
        } else {
          toast.error(this.state.toastData.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
      })
    })
  }

  handleInvalidSubmit(event, errors, values) {
    console.log("invalid")
    this.setState({ email: values.email, error: true })
  }
  handleChange(e) {
    let updatedname = e.target.name
    let updatedvalue = e.target.value
    this.setState(
      prevState => ({
        selectedRow: {
          // object that we want to update
          ...prevState.selectedRow, // keep all other key-value pairs
          [updatedname]: updatedvalue, // update the value of specific key
        },
      }),
      () => {
        console.log(this.state.selectedRow)
      }
    )
  }
  updateGrid() {
    let url = BaseUrl.apiUrl.baseUrl + "api/admin/settings/packages"
    let resp = apiGet(url)

    resp.then(resp => {
      console.log(resp)
      const rows = []
      resp.response.data.data.forEach((value, index) => {
        let tempState = {
          id: value.id,
          name: value.packageName,
          amount: value.packageAmount,
          coins: value.coinsToBeCredited,
          totalminutes: value.durationMinutes,
          expiry: value.usageLimit,
        }
        rows.push({
          id: value.id,
          name: value.packageName,
          amount: value.packageAmount,
          coins: value.coinsToBeCredited,
          totalminutes: value.durationMinutes,
          expiry: value.usageLimit,
          view: (
            <>
              <Link to="#" onClick={() => this.openModel(tempState)}>
                Edit
              </Link>
            </>
          ),
        })
      })
      this.setState({ tableData: rows })
    })
  }
  componentDidMount() {
    let url = BaseUrl.apiUrl.baseUrl + "api/admin/settings/packages"
    let resp = apiGet(url)

    resp.then(resp => {
      console.log(resp)
      const rows = []
      resp.response.data.data.forEach((value, index) => {
        let tempState = {
          id: value.id,
          name: value.packageName,
          amount: value.packageAmount,
          coins: value.coinsToBeCredited,
          totalminutes: value.durationMinutes,
          expiry: value.usageLimit,
        }
        rows.push({
          id: value.id,
          name: value.packageName,
          amount: value.packageAmount,
          coins: value.coinsToBeCredited,
          totalminutes: value.durationMinutes,
          expiry: value.usageLimit,
          view: (
            <>
              <Link to="#" onClick={() => this.openModel(tempState)}>
                Edit
              </Link>
            </>
          ),
        })
      })
      this.setState({ tableData: rows })
    })
  }
  openModel(obj) {
    this.setState({ selectedRow: obj }, () => {
      this.tog_standard()
    })
  }
  tog_standard() {
    const currentState = this.state.isModelOpen
    this.setState(
      {
        isModelOpen: !currentState,
      },
      () => {
        console.log(this.state.isModelOpen)
      }
    )
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="page-content">
          <MetaTags>
            <title>Onden | Package Settings</title>
          </MetaTags>
          <Container fluid>
            <h4>Package Details</h4>
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
                                      classes={
                                        "table align-middle table-nowrap table-striped striped table-borderd"
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
                <Modal
                  isOpen={this.state.isModelOpen}
                  toggle={this.tog_standard}
                  className="modal-sm modal-dialog-centered"
                >
                  <AvForm
                    onValidSubmit={this.handleValidSubmit}
                    onInvalidSubmit={this.handleInvalidSubmit}
                  >
                    <div className="modal-header">
                      <h5 className="modal-title mt-0" id="myModalLabel">
                        Edit Package
                      </h5>
                      <button
                        type="button"
                        onClick={this.tog_standard}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <AvField
                        name="name"
                        label="Package name"
                        value={this.state.selectedRow.name}
                        onChange={this.handleChange}
                        required
                      />
                      <AvField
                        name="amount"
                        label="Package Amount"
                        type="number"
                        value={this.state.selectedRow.amount}
                        onChange={this.handleChange}
                        required
                      />
                      <AvField
                        name="coins"
                        label="Coins included"
                        type="number"
                        value={this.state.selectedRow.coins}
                        onChange={this.handleChange}
                        required
                      />
                      <AvField
                        name="totalminutes"
                        label="Minutes included"
                        value={this.state.selectedRow.totalminutes}
                        onChange={this.handleChange}
                        required
                      />
                      <AvField
                        name="expiry"
                        label="Package expiry"
                        value={this.state.selectedRow.expiry}
                        onChange={this.handleChange}
                        type="number"
                        required
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </AvForm>
                </Modal>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default PackageSettings
