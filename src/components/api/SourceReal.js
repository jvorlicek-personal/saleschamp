import axios from "axios";

export default axios.create({
 baseURL: "https://somethingsomething.darkside.cz",
  headers: {
    'Content-Type': "application/json",
  }
});
