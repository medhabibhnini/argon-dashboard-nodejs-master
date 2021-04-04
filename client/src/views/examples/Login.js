/*!
=========================================================
* Argon Design System React - v1.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, {useState} from 'react'
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
import {dispatchLogin} from '../../redux/actions/authAction'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import {useDispatch} from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
const initialState = {
  email: '',
  password: '',
  err: '',
  success: ''
}


function Login() {
  const [user, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const history = useHistory()

  const {email, password, err, success} = user

  const handleChangeInput = e => {
      const {name, value} = e.target
      setUser({...user, [name]:value, err: '', success: ''})
  }


  const handleSubmit = async e => {
      e.preventDefault()
      try {
          const res = await axios.post('/user/login', {email, password})
          setUser({...user, err: '', success: res.data.msg})

          localStorage.setItem('firstLogin', true)

          dispatch(dispatchLogin())
          history.push("/")

      } catch (err) {
          err.response.data.msg && 
          setUser({...user, err: err.response.data.msg, success: ''})
      }
  }
/*
  const responseGoogle = async (response) => {
      try {
          const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

          setUser({...user, error:'', success: res.data.msg})
          localStorage.setItem('firstLogin', true)

          dispatch(dispatchLogin())
          history.push('/')
      } catch (err) {
          err.response.data.msg && 
          setUser({...user, err: err.response.data.msg, success: ''})
      }
  }

  const responseFacebook = async (response) => {
      try {
          const {accessToken, userID} = response
          const res = await axios.post('/user/facebook_login', {accessToken, userID})

          setUser({...user, error:'', success: res.data.msg})
          localStorage.setItem('firstLogin', true)

          dispatch(dispatchLogin())
          history.push('/')
      } catch (err) {
          err.response.data.msg && 
          setUser({...user, err: err.response.data.msg, success: ''})
      }
  }
*/
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
    
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small>Sign in with</small>
                      </div>
                      <div className="btn-wrapper text-center">
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                          href="#pablo"
               
                        >
                          <span className="btn-inner--icon mr-1">
                            <img
                              alt="..."
                              src={require("assets/img/icons/common/github.svg")}
                            />
                          </span>
                          <span className="btn-inner--text">Github</span>
                        </Button>
                        <Button
                          className="btn-neutral btn-icon ml-1"
                          color="default"
                          href="#pablo"
                        
                        >
                          <span className="btn-inner--icon mr-1">
                            <img
                              alt="..."
                              src={require("assets/img/icons/common/google.svg")}
                            />
                          </span>
                          <span className="btn-inner--text">Google</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Or sign in with crekjnkjndentials</small>
                      </div>
                      <Form  onSubmit={handleSubmit}>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                          value={email} name="email" onChange={handleChangeInput}
                       
                           id="email"
                           type="email"
                              placeholder="Email" 
                              name="password"
                              />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                           
                           value={password} name="password" onChange={handleChangeInput}
                        
                            id="password"
                            type="password"
                              placeholder="Password"
                              name="password"
                              autoComplete="off"
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                            
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                     
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                      
                      >
                        <small>Create new account</small>
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }


export default Login