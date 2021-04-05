import React, { useState, useEffect } from "react";
import { getPosts } from "../../actions/posts.actions/getPosts";
import { getMostRecentPosts } from "../../actions/posts.actions/getMostRecentPosts";
import { getMostCommentedPosts } from "../../actions/posts.actions/getMostCommentedPosts";
import { getMostLikedPosts } from "../../actions/posts.actions/getMostLikedPosts";
import { searchTopics } from "../../actions/posts.actions/searchTopics";
import { connect } from "react-redux";
import TopicPostsWrapper from "../TopicPosts/TopicPostsWrapper";

// reactstrap  
import { Button, Card, Container, Row, Col } from "reactstrap";
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
  
const Posts = ({
  getPosts,
  getMostRecentPosts,
  getMostCommentedPosts,
  getMostLikedPosts,
  searchTopics,
  posts,
}) => {
  let [dataFromSearch, setDataFromSearch] = useState("");
  let [topicsSortType, setTopicsSortType] = useState({
    isTheOldest: false,
    isTheMostRecent: true,
    isTheMostCommented: false,
    isTheMostLiked: false,
  });

  let {
    isTheMostCommented,
    isTheOldest,
    isTheMostLiked,
    isTheMostRecent,
  } = topicsSortType;

  useEffect(() => {
    if (isTheOldest) getPosts();
    else if (isTheMostCommented) getMostCommentedPosts();
    else if (isTheMostLiked) getMostLikedPosts();
    else getMostRecentPosts();
  }, []);

  const onChange = (e) => setDataFromSearch(e.target.value);

  const searchForTopic = () => {
    if (dataFromSearch !== "" || dataFromSearch !== null) {
      return searchTopics(dataFromSearch);
    } else {
      setTopicsSortType({
        isTheMostRecent: true,
        isTheMostCommented: false,
        isTheMostLiked: false,
        isTheOldest: false,
      });
      getMostRecentPosts();
    }
  };

  const changeTopicsType = (changedType) => {
    if (changedType === "isTheMostLiked") {
      setTopicsSortType({
        isTheMostLiked: true,
        isTheOldest: false,
        isTheMostCommented: false,
        isTheMostRecent: false,
      });
      getMostLikedPosts();
    } else if (changedType === "isTheOldest") {
      setTopicsSortType({
        isTheMostLiked: false,
        isTheOldest: true,
        isTheMostCommented: false,
        isTheMostRecent: false,
      });
      getPosts();
    } else if (changedType === "isTheMostCommented") {
      setTopicsSortType({
        isTheMostLiked: false,
        isTheOldest: false,
        isTheMostCommented: true,
        isTheMostRecent: false,
      });
      getMostCommentedPosts();
    } else {
      setTopicsSortType({
        isTheMostLiked: false,
        isTheOldest: false,
        isTheMostCommented: false,
        isTheMostRecent: true,
      });
      getMostRecentPosts();
    }
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

                        <div class="card-lift--hover shadow border-0 card" >
                        <div class="py-5 card-body">
                 <div className="topics-wrapper" >
     
                  <TopicPostsWrapper
                  isTheOldest={isTheOldest}
                  isTheMostCommented={isTheMostCommented}
                  isTheMostRecent={isTheMostRecent}
                  isTheMostLiked={isTheMostLiked}
                  posts={posts.posts}
                    />
                </div>
      
                        <br></br>
                        <br></br>

                        
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
  
    };

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = {
  getPosts,
  getMostRecentPosts,
  getMostCommentedPosts,
  getMostLikedPosts,
  searchTopics,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

