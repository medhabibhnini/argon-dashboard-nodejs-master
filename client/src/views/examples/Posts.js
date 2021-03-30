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
                        <h3 align="center">Posts </h3>
                        <p>
                        Here, you can find all the users' posts, so you can see, like and comment them
                        </p>
                        <hr></hr>
                        <h5>Posts</h5>
                        <br></br>
                        <div class="card-lift--hover shadow border-0 card" >
                        <div class="py-5 card-body">
                       <div class="icon icon-shape icon-shape-primary rounded-circle mb-4">
                        <i class="ni ni-istanbul"></i>
                        </div>
                        <h6 class="text-primary text-uppercase">Build Something</h6>
                        <p class="description mt-3">Argon is a great free UI package based on Bootstrap 4 that includes the most important components and features.</p>
                        <div>
                            <span class="mr-1 badge badge-primary badge-pill">
                            <a href="#pablo" class="nav-link-icon nav-link">
                                <i class="ni ni-favourite-28"></i>
                                <span class="nav-link-inner--text d-lg-none">Favorites</span>
                            </a>
                            </span>
                            <hr></hr>
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
