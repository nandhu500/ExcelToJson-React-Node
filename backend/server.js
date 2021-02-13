const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const app = express();
const excelToJson = require("convert-excel-to-json");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static("public")); //to access the files in public folder
app.use(fileUpload());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE,PUT, OPTIONS"
  );
  next();
});

app.post("/upload", (req, res) => {
  if (!req.files) {
    console.log("no fileeee");
    return res.status(500).send({ msg: "file is not found" });
  }

  const myFile = req.files.file;

  myFile.mv(`${__dirname}/uploads/${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      console.log("erooorrr");
      return res.status(500).send({ msg: "Error occured" });
    }

    const result = excelToJson({
      sourceFile: `${__dirname}/uploads/${myFile.name}`,
    });

    console.log(result);

    return res.send({
      result: result,
      name: myFile.name,
      path: `${__dirname}/uploads/${myFile.name}`,
    });
  });
});

app.listen(8000, () => {
  console.log("server is running at port 4500");
});
