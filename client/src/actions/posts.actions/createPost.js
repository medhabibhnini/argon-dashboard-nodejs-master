import { MAKE_POST, POST_ERROR } from "../../constants/posts.constants";
import axios from "axios";
const jwt = require("jsonwebtoken");


export const createPost = (textOfThePost) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    


    const body = JSON.stringify({ textOfThePost });
    const res = await axios.post(
      "http://localhost:8000/forum/createpost",
      body
      ,
      config
    )

    console.log(body);
    //console.log(res);

    dispatch({ type: MAKE_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
