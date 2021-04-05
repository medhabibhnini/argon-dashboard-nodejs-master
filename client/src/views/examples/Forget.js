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
import React, { useState } from "react";

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
import { registerUser } from "../../actions/auths/registerUser";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { connect } from "react-redux";
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { useHistory } from "react-router-dom";

const Forget = ({ history })=> {
    const [formData, setFormData] = useState({
        email: '',
        textChange: 'Submit',
      });
      const { email, textChange } = formData;
      const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
      };
      const handleSubmit = e => {
        e.preventDefault();
        if (email) {
          setFormData({ ...formData, textChange: 'Submitting' });
          axios
            .put(`${process.env.REACT_APP_API_URL}/password-forget`, {
              email
            })
            .then(res => {
              
                setFormData({
                  ...formData,
                  email: '',
                });
                toast.success(`Please check your email`);
              
            })
            .catch(err => {
            console.log(err.response)
              toast.error(err.response.data.error);
            });
        } else {
          toast.error('Please fill all fields');
        }
      };
    return (
      <>
        <DemoNavbar />
        <main >
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small>Forget Password</small>
                      </div>
                      <div className="text-center">
                        <Button
                          className="btn-neutral btn-icon mr-4"
                          color="default"
                          href="/facebook"
                          onClick={e => e.preventDefault()}
                        >
                          <span className="btn-inner--icon mr-1">
                            <img
                              alt="..."
                              src={require("assets/img/icons/common/facebook.svg")}
                            />
                          </span>
                          <span className="btn-inner--text">facebook</span>
                        
                        </Button>
                        <Button
                          className="btn-neutral btn-icon ml-1"
                          color="default"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
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
                        <small>Or sign up with credentials</small>
                      </div>
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email" name="email"  onChange={handleChange('email')} value={email}/>
                          </InputGroup>
                        </FormGroup>

                    
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type='submit'
                          >
                            send a mail verification
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }



  const mapStateToProps = (state) => ({
    error: state.auth.errors,
  });

  export default Forget;
