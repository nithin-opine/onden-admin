import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Link } from "react-router-dom"
import { Container, Row, Col, Card, CardBody, Media } from "reactstrap"
import { apiGet, apiPost, apiPut, apiDelete } from "../../config/apiConfig"
import { BaseUrl } from "../../config/BaseUrl"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import toastr from "toastr"

import "../../../node_modules/toastr/build/toastr.css"

//i18n

const ScheduleSettings = props => {
  const [startTime, setStart] = useState("11:00")
  const [endTime, setEnd] = useState("12:00")

  useEffect(() => {
    getData()
  }, [])

  function showToast(x) {
    switch (x) {
      case 1:
        var title = "Success"
        var message = "Succesfully added time slot"
        toastr.success(message, title)
        break
      case 2:
        var title = "Error"
        var message = "Time slot error"
        toastr.warning(message, title)
        break
      case 3:
        var title = "Success"
        var message = "Succesfully deleted time slot"
        toastr.success(message, title)
        break
      case 4:
        var title = "Error"
        var message = "Time slot error"
        toastr.warning(message, title)
        break
    }
  }
  async function deleteSlot(id) {
    const Url =
      BaseUrl.apiUrl.baseUrl + "api/admin/settings/interview_time_slots/" + id

    let resp = await apiDelete(Url)
    console.log(resp)
    if (resp.response.status == 200) {
      showToast(3)
      getData()
    } else {
      showToast(4)
    }
  }

  async function addSlot() {
    const Url =
      BaseUrl.apiUrl.baseUrl + "api/admin/settings/interview_time_slots"
    let body = { startTime: startTime, endTime: endTime }
    let resp = await apiPost(Url, body)
    console.log(resp)
    if (resp.response.status == 200) {
      showToast(1)
      getData()
    } else {
      showToast(2)
    }
  }

  const [data, setData] = useState([])
  async function getData() {
    const Url =
      BaseUrl.apiUrl.baseUrl + "api/admin/settings/interview_time_slots"
    let resp = await apiGet(Url)
    console.log(resp)
    setData(resp.response.data.data)
  }
  let timeSlots = ""
  timeSlots = Object.keys(data).map(item => {
    return (
      <div className="timeSlot">
        <input
          type="text"
          value={new Date(data[item].startTimeUtc).toLocaleTimeString()}
          className=""
        />{" "}
        -{" "}
        <input
          type="text"
          value={new Date(data[item].endTimeUtc).toLocaleTimeString()}
          className=""
        />
        <button
          className="deleteBtn"
          onClick={() => {
            deleteSlot(data[item].id)
          }}
        >
          Delete slot
        </button>
      </div>
    )
  })
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Onden | Schedule Settings</title>
        </MetaTags>
        <Container fluid>
          <h4>Schedule Settings</h4>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Media className="faq-box mb-4">
                    <div className="faq-icon mr-3">
                      <i className="bx bx-help-circle font-size-20 text-success"></i>
                    </div>
                    <Media body>
                      <p className="text-muted">
                        Please set your comfortable time slots for candidate
                        interviews. You must select atleast 3 slots. Current
                        time slots are displayed in Japan Standard Time (JST)
                      </p>
                    </Media>
                  </Media>
                  <h6 className="mt-3">Current time slots</h6>
                  {timeSlots}
                  <hr />
                  <h6 className="mt-3">Add new time slot</h6>
                  <input
                    type="time"
                    value={startTime}
                    className=""
                    onChange={e => setStart(e.target.value)}
                  />{" "}
                  -{" "}
                  <input
                    type="time"
                    value={endTime}
                    onChange={e => setEnd(e.target.value)}
                    className=""
                  />
                  <button
                    className="modalProceedBtn ml-3"
                    onClick={() => addSlot()}
                  >
                    Add slot
                  </button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ScheduleSettings
