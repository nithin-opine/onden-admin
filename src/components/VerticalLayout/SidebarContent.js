import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Dashbaord")} </li>
            <li>
              <Link to="#" className=" ">
                <i className="bx bx-home"></i>
                <span>{props.t("Admin Dashbaord")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Information system")} </li>
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>{props.t("Students")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{props.t("Students list")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>{props.t("Tutors")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{props.t("Tutors list")}</Link>
                </li>
              </ul>
            </li>
            <li className="menu-title">{props.t("Tutor Hiring")} </li>
            <li>
              <Link to="#" className=" ">
                <i className="bx bx-home"></i>
                <span>{props.t("Applications")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className=" ">
                <i className="bx bx-home"></i>
                <span>{props.t("Interviews")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className=" ">
                <i className="bx bx-home"></i>
                <span>{props.t("Schedule settings")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className=" ">
                <i className="bx bx-home"></i>
                <span>{props.t("Interview calendar")}</span>
              </Link>
            </li>
            <li className="menu-title">{props.t(" Coin withdrawals")} </li>
            <li>
              <Link to="#" className=" ">
                <i className="bx bx-home"></i>
                <span>{props.t("Open requests")}</span>
              </Link>
            </li>
            <li className="menu-title">{props.t("Resignations")} </li>
            <li>
              <Link to="#" className=" ">
                <i className="bx bx-home"></i>
                <span>{props.t("Open requests")}</span>
              </Link>
            </li>
            <li className="menu-title">{props.t("Reports")} </li>
            <li>
              <Link to="#" className=" ">
                <i className="bx bx-home"></i>
                <span>{props.t("Data Reports")}</span>
              </Link>
            </li>
            <li className="menu-title">{props.t("Master settings")} </li>
            <li>
              <Link to="#" className=" ">
                <i className="bx bx-home"></i>
                <span>{props.t("Application settings")}</span>
              </Link>
            </li>
            <li className="menu-title">{props.t("Account settings")} </li>
            <li>
              <Link to="#" className=" ">
                <i className="bx bx-home"></i>
                <span>{props.t("Change password")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
