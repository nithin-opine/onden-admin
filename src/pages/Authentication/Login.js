import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React from "react"

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link } from "react-router-dom"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

// actions
import { loginUser, socialLogin } from "../../store/actions"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/ondenassets/logo.png"

//Import config
import { facebook, google } from "../../config"

const Login = props => {
  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: "admin" || "",
      password: "admin" || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      console.log(process.env.REACT_APP_DEFAULTAUTH)
      dispatch(loginUser(values, props.history))
    },
  })

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }))

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    dispatch(loginUser(values, props.history))
  }

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        username: res.profileObj.username,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.history, type))
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        username: res.username,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.history, type))
    }
  }

  //handleGoogleLoginResponse
  const googleResponse = response => {
    signIn(response, "google")
  }

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  const facebookResponse = response => {
    signIn(response, "facebook")
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Onden Admin</title>
      </MetaTags>
      <Container fluid>
        <Row>
          <Col md={12} className="loginBg">
            <Row>
              <Col md={4} className="loginformcol">
                <div className="logocontent">
                  <img src={logo} alt="" />
                </div>
                <Form
                  className="form-horizontal"
                  onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}
                >
                  {error ? <Alert color="danger">{error}</Alert> : null}

                  <div className="mb-3">
                    <Label className="form-label">username</Label>
                    <Input
                      name="username"
                      className="form-control"
                      placeholder="Enter username"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.username || ""}
                      invalid={
                        validation.touched.username &&
                        validation.errors.username
                          ? true
                          : false
                      }
                    />
                    {validation.touched.username &&
                    validation.errors.username ? (
                      <FormFeedback type="invalid">
                        {validation.errors.username}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <Label className="form-label">Password</Label>
                    <Input
                      name="password"
                      value={validation.values.password || ""}
                      type="password"
                      placeholder="Enter Password"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.touched.password &&
                        validation.errors.password
                          ? true
                          : false
                      }
                    />
                    {validation.touched.password &&
                    validation.errors.password ? (
                      <FormFeedback type="invalid">
                        {validation.errors.password}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customControlInline"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="customControlInline"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="mt-3 d-grid">
                    <button className="btn btn-primary btn-block" type="submit">
                      Log In
                    </button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
