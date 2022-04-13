import React, { Component } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, Modal } from "reactstrap"
import { apiGet, apiPost, apiPut } from "../../config/apiConfig"
import { BaseUrl } from "../../config/BaseUrl"

export default class SessionSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiList: "",
      modal_small: false,
      disputeId: "",
      disputeDuration: "",
      disputeReason: "",
      disputeCv: 2,
      sessionDuration: "",
    }
    this.tog_small = this.tog_small.bind(this)
    this.removeBodyCss = this.removeBodyCss.bind(this)
    this.tog_dispute = this.tog_dispute.bind(this)
    this.clearDispute = this.clearDispute.bind(this)
  }
  componentDidMount() {
    const Url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/teacher/session_summary_list/" +
      this.props.payid
    let resp = apiGet(Url)
    resp.then(resp => this.setState({ apiList: resp.response.data.data }))
  }
  tog_small(a, b, c) {
    this.setState({ disputeId: a })
    this.setState({ disputeReason: b })
    this.setState({ sessionDuration: c })

    this.setState({ modal_small: !this.state.modal_small })
    this.removeBodyCss()
  }
  removeBodyCss() {
    document.body.classList.add("no_padding")
  }
  clearDispute() {
    const Url =
      BaseUrl.apiUrl.baseUrl +
      "api/admin/teacher/update_dispute_status/" +
      this.state.disputeId +
      "/" +
      this.state.disputeCv
    let resp = apiPut(Url)
    resp.then(resp => this.setState({ apiList: resp.response.data.data }))
  }
  tog_dispute() {
    this.state.disputeCv === 2
      ? this.setState({ disputeCv: 3 })
      : this.setState({ disputeCv: 2 })
  }
  render() {
    var temprow = {}
    var apirow = []
    if (this.state.apiList) {
      Object.keys(this.state.apiList).map(function (key, index) {
        console.log(this.state.apiList[key])

        /*var ageDifMs = Date.now() - this.state.apiList[key].dob.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);*/
        var date = new Date(
          this.state.apiList[key].dateCreated
        ).toLocaleDateString()
        var bal = ""
        if (this.state.apiList[key].disputeStatus === 1) {
          bal = (
            <a
              className="disputeBtn"
              onClick={() => {
                this.tog_small(
                  this.state.apiList[key].id,
                  this.state.apiList[key].disputeReason,
                  this.state.apiList[key].sessionDuration
                )
              }}
              data-toggle="modal"
            >
              Disputed
            </a>
          )
        }

        temprow = {
          id: this.state.apiList[key].id,
          name:
            this.state.apiList[key].studentFirstName +
            " " +
            this.state.apiList[key].studentLastName,

          date: this.state.apiList[key].sessionDate,

          dur: this.state.apiList[key].sessionDuration,

          cbal: bal,
        }
        apirow.push(temprow)
        temprow = []
      }, this)
    }
    const data = {
      columns: [
        {
          label: "S ID",
          field: "id",
          sort: "asc",
          width: 150,
        },
        {
          label: "Student name",
          field: "name",
          sort: "asc",
          width: 150,
        },
        {
          label: "Session date",
          field: "date",
          sort: "asc",
          width: 150,
        },
        {
          label: "Duration",
          field: "dur",
          sort: "asc",
          width: 150,
        },
        {
          label: "Dispute",
          field: "cbal",
          sort: "asc",
          width: 100,
        },
      ],
      rows: apirow,
    }
    console.log(apirow)
    return (
      <>
        <Card>
          <CardBody>
            <MDBDataTable responsive striped bordered data={data} exportToCSV />
          </CardBody>
        </Card>
        <Modal
          size="sm"
          isOpen={this.state.modal_small}
          centered={true}
          toggle={() => {
            this.tog_small()
          }}
        >
          <div className="modal-body">
            <h6 className="text-center">Handle dispute</h6>
            <p className="mb-0"></p>
            <div className="sessTime">
              {this.state.sessionDuration}{" "}
              <span className="mins"> minutes</span>
            </div>
            <p className="">
              Student : <i>{this.state.disputeReason}</i>
            </p>
            <Row>
              <Col>
                <button
                  className={
                    "modalBtn " + (this.state.disputeCv === 2 ? "acc" : "rej")
                  }
                  onClick={() => this.tog_dispute()}
                >
                  Coin to student
                </button>
              </Col>
              <Col>
                <button
                  className={
                    "modalBtn " + (this.state.disputeCv === 3 ? "acc" : "rej")
                  }
                  onClick={() => this.tog_dispute()}
                >
                  Coin to tutor
                </button>
              </Col>
            </Row>
            <Row>
              <Col>
                <button
                  className="modalBtnOk"
                  onClick={() => this.clearDispute()}
                >
                  Clear dispute
                </button>
              </Col>
            </Row>
          </div>
        </Modal>
      </>
    )
  }
}
