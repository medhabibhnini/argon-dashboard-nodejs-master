import React, { useState } from "react";

// reactstrap components
import { Card, Container, Row, Col } from "reactstrap";
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

const CreatePost = ({ createPost }) => {
  

    let [textOfThePost, setTextOfThePost] = useState("");

  const onChange = (e) => setTextOfThePost(e.target.value);

  const submitData = ()=> {
    if (textOfThePost !== "" && textOfThePost !== null) {

      createPost(textOfThePost);
    } else {
      alert("Text is empty!");
    }
    setTextOfThePost("");
    
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
                        <h3 className="text-primary font-weight-700" align="center">Forum </h3>
                        <p className="font-weight-500" align="center">
                        Feel free to express yourself in this part of the website, so all the users can see what do you have in your 
                        mind
                        </p>
                        <hr></hr>
                        <h5 className="font-weight-700" align="center">Create a new post</h5>
                        <br></br>
                        <form>
                   
                        <div className="form-group">
                            
                            

                            <textarea placeholder="Content of the post" type="text" name="textOfThePost"
                                                        className="form-control-alternative form-control" rows="10" cols="50" value={textOfThePost}
                                                        onChange={(e) => onChange(e)} 
                                                        ></textarea>
                            
                                                    </div>
                       <button type="button"  onClick={() => submitData()} className="btn-1 ml-1 btn btn-outline-info">Post</button>
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

export default CreatePost;
