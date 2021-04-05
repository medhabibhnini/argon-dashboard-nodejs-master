import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { addLikeToPost } from "../../actions/posts.actions/likes.actions/addLikeToPost";
import { Card, Row, Col } from "reactstrap";
import { removeLikeFromTopicPost } from "../../actions/posts.actions/likes.actions/removeLikeFromTopicPost";
import Container from "reactstrap/lib/Container";

const TopicPost = ({
  isTheOldest,
  isTheMostCommented,
  isTheMostRecent,
  isTheMostLiked,
  post,
  removeLikeFromTopicPost,
  addLikeToPost,
  auth,
}) => {
  return (
    
    <section className="section-profile-cover section-shaped my-0">
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
            <section className="section">
          <Container>

            <div class="card-lift--hover shadow border-0 card" >
            <div class="py-5 card-body">
    <div className="topic-wrapper">
      <div className="topic-date">
        <Moment format="HH:mm YYYY-MM-DD">{post.date}</Moment>
      </div>

      <div className="topic-user">
        <img src={post.avatar} className="topic-avatar" alt="" />
        <p className="font__p p__size">{post.name}</p>
      </div>

      <div className="topic-section">
        <p>{post.textOfThePost}</p>
        <div className="topic-section-links">
          <div className="like-section" style={{ color: "rgb(42, 9, 9)" }}>
            <div
              className="font__p font__bold p__size like-item"
              onClick={() => {
                if (post.likes.find((like) => like.user === auth.user._id)) {
                  post.likes.find((like) =>
                    removeLikeFromTopicPost(
                      post._id,
                      like._id,
                      isTheOldest,
                      isTheMostRecent,
                      isTheMostCommented,
                      isTheMostLiked
                    )
                  );
                } else {
                  addLikeToPost(
                    post._id,
                    isTheOldest,
                    isTheMostRecent,
                    isTheMostCommented,
                    isTheMostLiked
                  );
                }
              }}
            >
                  
              <i
                
                className={
                  post.likes.find((like) => like.user === auth.user._id)
                    
                    ? "ni ni-favourite-28"
                    : "ni ni-favourite-28"
                }
              ></i>
            </div>

            <div className="font__p font__bold p__size likes-length-item">
              {post.likes.length}
            </div>
          </div>

          <div className="topic-comment-section font__p font__bold p__size">
            <i className="far fa-comment"></i>
            {post.comments.length}
          </div>
           <br></br>
          <div className="link-to-post-page-button app_color_background font__p font__bold p__size">
            <Link to={`/topics/topic/${post._id}`}>View more</Link>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
      
 

    </Container>
    <hr></hr>
    </section>
    </section>
    
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  addLikeToPost,
  removeLikeFromTopicPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicPost);
