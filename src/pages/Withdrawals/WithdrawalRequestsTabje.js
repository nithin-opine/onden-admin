import React, { Component } from "react"
import { MDBDataTable } from "mdbreact"
import { Card, CardBody } from "reactstrap"
import { apiGet } from "../../config/apiConfig"
import { BaseUrl } from "../../config/BaseUrl"

export default class WithdrawalRequestsTable extends Component {
  constructor(props) {
    super(props)
    this.state = { apiList: "", modal_small: false }
  }
  componentDidMount() {
    const Url = BaseUrl.apiUrl.baseUrl + "api/admin/teacher/payment_requests"
    let resp = apiGet(Url)
    resp.then(resp => this.setState({ apiList: resp.response.data.data }))
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
        temprow = {
          id: this.state.apiList[key].teacherNumber,
          name:
            this.state.apiList[key].teacherFirstName +
            " " +
            this.state.apiList[key].teacherLastName,

          date: this.state.apiList[key].paymentTranferRequestedOn,
          creq: this.state.apiList[key].coinsToBeTransferred,
          cbal: this.state.apiList[key].coinsInHand,
          cex: this.state.apiList[key].coinExchangeValue,
          salbe:
            this.state.apiList[key].coinExchangeValue *
            this.state.apiList[key].coinsToBeTransferred,
          profile: (
            <a
              className="tableBtn"
              href={"/withdrawal/" + this.state.apiList[key].id}
            >
              Process
            </a>
          ),
        }
        apirow.push(temprow)
        temprow = []
      }, this)
    }
    const data = {
      columns: [
        {
          label: "Tutor ID",
          field: "id",
          sort: "asc",
          width: 150,
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 150,
        },
        {
          label: "Coins requested on",
          field: "date",
          sort: "asc",
          width: 150,
        },
        {
          label: "Coins requested ",
          field: "creq",
          sort: "asc",
          width: 150,
        },
        {
          label: "Coin balance",
          field: "cbal",
          sort: "asc",
          width: 100,
        },
        {
          label: "Coin exchange ratio",
          field: "cex",
        },
        {
          label: "Salary benefit",
          field: "salbe",
        },
        {
          label: "Process request",
          field: "profile",
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
      </>
    )
  }
}
