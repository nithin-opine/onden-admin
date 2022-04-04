import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col } from "reactstrap"

import { BaseUrl } from "../../config/BaseUrl"
import { apiPut } from "../../config/apiConfig"

import { AvForm, AvField } from "availity-reactstrap-validation"

class ChangePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRow: {},
    }
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
    this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleValidSubmit() {
    console.log("valid")
    let url = BaseUrl.apiUrl.baseUrl + "api/admin/profile/reset_password"
    let body = {
      newPassword: this.state.selectedRow.password,
    }
    let resp = apiPut(url, body)
    resp.then(resp => {
      console.log("resp is", resp)
      //   this.setState({ toastData: resp.response.data }, () => {
      //     console.log("toastData is", this.state.toastData)
      //     if (resp.response.status == 200) {
      //       this.tog_standard()
      //       this.updateGrid()
      //       this.toggle_toast()
      //     } else {
      //       this.toggle_toast()
      //     }
      //   })
      // console.log("resp is", resp)
      // if (resp.response.status == 200) {
      //   this.tog_standard()
      //   this.updateGrid()
      // }
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
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Onden | Change password</title>
          </MetaTags>
          <Container fluid>
            <Row>
              <Col md={3} className="mt-4">
                <AvForm
                  onValidSubmit={this.handleValidSubmit}
                  onInvalidSubmit={this.handleInvalidSubmit}
                >
                  <AvField
                    name="password"
                    label="Enter new password"
                    type="text"
                    placeholder="Enter current password"
                    onChange={this.handleChange}
                    required
                  />
                  <AvField
                    name="reenterpassword"
                    label="Re enter new password"
                    type="text"
                    placeholder="Enter current password"
                    onChange={this.handleChange}
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </AvForm>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default ChangePassword
