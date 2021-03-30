import React, { useState } from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios'
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import createPost from "../../actions/posts.actions/createPost"
const Posts = ( ) => {
  

    let [textOfThePost, setTextOfThePost] = useState("");

  const onChange = (e) => setTextOfThePost(e.target.value);

  const submitData = () =>async ()=> {
   /* if (textOfThePost !== "" && textOfThePost !== null) {
      createPost(textOfThePost);
      console.log(textOfThePost);
    } else {
      alert("Text is empty!");
    }
    setTextOfThePost("");*/
    await axios.post('http://localhost:8000/forum/createpost', textOfThePost);        
  };

    return (
      <>
        <DemoNavbar />
        <main className="profile-page" >
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-body mt--300">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <h3 align="center" class="text-primary font-weight-700">Posts </h3>
                        <p align="center" class="font-weight-500">
                        Here, you can find all the users' posts, so you can see, like and comment them
                        </p>
                        <hr></hr>

                        <br></br>
                        <div class="card-lift--hover shadow border-0 card" >
                        <div class="py-5 card-body">
                        <div  align="center">
                        <img alt="..." class="img-fluid rounded-circle shadow" src="/argon-design-system-react/static/media/team-2-800x800.dcfcf3b7.jpg" width="150px" align="center">
                      </img>
                      </div>
                        <h6 class="text-primary text-uppercase"align="center">Janna Doe</h6>
                        
                        <p class="description mt-3">Argon is a great free UI package based on Bootstrap 4 that includes the most important components and features.</p>
                        <hr></hr>
                        <div>
                            <span class="mr-1 badge badge-primary badge-pill">
                            <a href="#pablo" class="nav-link-icon nav-link">
                                <i class="ni ni-favourite-28"></i>
                                <span class="nav-link-inner--text d-lg-none"> </span>
                            </a>
                            
                            </span>
                        
                         
                            
                        <br></br>
                        <br></br>
                            <form>
                            <div class="form-group">
                                <input placeholder="Your comment..." type="text" class="form-control"></input>
                            </div>
                            <button type="button" class="btn btn-primary btn-sm">Comment</button>
                                </form>
                            </div>

                        
                        </div>
                        </div>
                      </Col>
                    </Row>
                  
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }

export default Posts;
