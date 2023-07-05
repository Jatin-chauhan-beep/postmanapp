let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const port = process.env.PORT || 2450;
app.listen(port, () => console.log(`Listening on port ${port}!`));
let axios = require("axios");

app.post("/getData", async function (req, res) {
  let {
    method,
    url,
    data,
    headerKey1,
    headerValue1,
    headerKey2,
    headerValue2,
    headerKey3,
    headerValue3,
  } = req.body;

  try {
    let response;
    let header = { headers: {} };

    if (headerKey1) {
      header.headers[headerKey1.toLowerCase()] = headerValue1;
    } else if (headerKey2)
      header.headers[headerKey2.toLowerCase()] = headerValue2;
    else if (headerKey3)
      header.headers[headerKey3.toLowerCase()] = headerValue3;
    if (method === "GET") {
      response = await axios.get(url, header);
    } else if (method === "POST") {
      response = await axios.post(url, data, header);
    } else if (method === "PUT") {
      response = await axios.put(url, data, header);
    } else response = await axios.delete(url, header);
    res.send({
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    });
  } catch (err) {
    if (err.response) {
      let { status, statusText } = err.response;
      res.status(401).send({
        data: "Not Found",
        status: status,
        statusText: statusText,
      });
    } else res.status(401).send("Request Failed");
  }
});
