import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import { BaseUrl } from "../../config/BaseUrl"
import { apiGet } from "../../config/apiConfig"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"
//css
import "@fullcalendar/bootstrap/main.css"
import { object } from "prop-types"

class InterviewCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      calendarEvents: [],
    }
  }
  componentDidMount() {
    let url =
      BaseUrl.apiUrl.baseUrl + "api/admin/calendar/interview_calendar_view"
    let resp = apiGet(url)
    let row = []
    resp.then(res => {
      this.setState({ events: res.response.data.data }, () => {
        console.log(this.state.events)
        this.state.events.map(item =>
          row.push({
            title: item.teacherName,
            date: item.interviewTiming,
          })
        )
        this.setState({ calendarEvents: row }, () => {
          console.log(this.state.calendarEvents)
        })
      })
    })
  }
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Onden | Calendar</title>
          </MetaTags>
          <Container fluid>
            <h4>Interview Calendar</h4>
            <Row>
              <Col md={12}>
                <Card className="mini-stats-wid">
                  <CardBody>
                    <Col md={12}>
                      <FullCalendar
                        plugins={[
                          BootstrapTheme,
                          dayGridPlugin,
                          interactionPlugin,
                        ]}
                        slotDuration={"00:15:00"}
                        handleWindowResize={true}
                        themeSystem="bootstrap"
                        headerToolbar={{
                          left: "prev,next today",
                          center: "title",
                          right: "dayGridMonth,dayGridWeek,dayGridDay",
                        }}
                        events={this.state.calendarEvents}
                        // editable={true}
                        // droppable={true}
                        selectable={true}
                        // dateClick={handleDateClick}
                        // eventClick={handleEventClick}
                        // drop={onDrop}
                      />
                    </Col>
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

export default InterviewCalendar
