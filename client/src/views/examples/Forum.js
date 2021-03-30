import React, { useState } from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios'
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import createPost from "../../actions/posts.actions/createPost"
const Forum = ( ) => {
  

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
                        <h3 align="center">Forum </h3>
                        <p>
                        Feel free to express yourself in this part of the website, so all the users can see what do you have in your 
                        mind
                        </p>
                        <hr></hr>
                        <h5>Create a new post</h5>
                        <form>
                        <div class="form-group">
                            
                            <textarea placeholder="Content of the post" type="textarea" name="textOfThePost"
                            class="form-control-alternative form-control" rows="10" cols="50"
                            onChange={(e) => onChange(e)} 
                            ></textarea>
                        </div>

                       <button type="button"  onClick={() => submitData()} class="btn-1 ml-1 btn btn-outline-info">Post</button>
                       </form>
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

export default Forum;
