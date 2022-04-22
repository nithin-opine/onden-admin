import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"
import { BaseUrl } from "../../../config/BaseUrl"
import { apiGet, apiDelete } from "../../../config/apiConfig"

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../../assets/images/users/avatar-4.jpg"

//i18n
import { withTranslation } from "react-i18next"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    let url = BaseUrl.apiUrl.baseUrl + "api/admin/profile/notifications"

    let resp = apiGet(url)
    resp.then(resp => {
      setData(resp.response.data.data)
    })
  }, [])

  const clear = () => {
    let url = BaseUrl.apiUrl.baseUrl + "api/admin/profile/clear_notifications"
    let resp = apiDelete(url)
    let url1 = BaseUrl.apiUrl.baseUrl + "api/admin/profile/notifications"

    let resp1 = apiGet(url1)
    resp1.then(resp1 => {
      setData(resp1.response.data.data)
    })
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon "
          tag="button"
          id="page-header-notifications-dropdown"
        >
          {data.length > 0 ? (
            <i className="bx bx-bell bx-tada" />
          ) : (
            <i className="bx bx-bell" />
          )}

          {data.length > 0 ? (
            <span className="badge bg-danger rounded-pill">{data.length}</span>
          ) : (
            ""
          )}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {data.map((e, v) => {
              return (
                <>
                  <Link
                    to={
                      e.type == "STUDENT"
                        ? "/student-profile/" + e.typeId
                        : "/teacher-profile/" + e.typeId
                    }
                    className="text-reset notification-item"
                  >
                    <div className="media">
                      <div className="avatar-xs me-3">
                        <span className="avatar-title bg-primary rounded-circle font-size-16">
                          {e.type == "STUDENT" ? (
                            <i className="bx bx-book-reader" />
                          ) : (
                            <i className="bx bx-user-plus" />
                          )}
                        </span>
                      </div>
                      <div className="media-body">
                        <h6 className="mt-0 mb-1">
                          {e.type == "STUDENT"
                            ? "New student enrollment"
                            : "New Tutor application"}
                        </h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">
                            {e.type == "STUDENT"
                              ? e.name + " has enrolled as a student"
                              : e.name + " has applied to be an ONDEN tutor"}
                          </p>
                          <p className="mb-0">
                            <i className="mdi mdi-clock-outline" />{" "}
                            {new Date(e.dateCreated).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              )
            })}
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="#"
              onClick={clear}
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              {props.t("Clear all")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}
