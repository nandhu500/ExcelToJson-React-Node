import React, { useState, useRef } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [data, getFile] = useState({ name: "", path: "" });
  const [result, setResult] = useState([]);
  const [progress, setProgess] = useState(0);
  const el = useRef();

  const handleChange = (e) => {
    setProgess(0);
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:8000/upload", formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress =
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
            "%";
          setProgess(progress);
        },
      })
      .then((res) => {
        console.log(res);
        getFile({
          name: res.data.name,
          path: "http://localhost:8000" + res.data.path,
        });
        setResult(res.data.result.Sheet1);
      })
      .catch((err) => {
        console.log(err);
        console.log("inside error");
      });
  };

  return (
    <div>
      <div className="file-upload">
        <input type="file" ref={el} onChange={handleChange} />
        <div className="progessBar" style={{ width: progress }}>
          {progress}
        </div>
        <button onClick={uploadFile} className="upbutton">
          Upload
        </button>
        <hr />

        {data.path &&
          result.map((resu) => {
            return (
              <div className="json_data">
                <h4 style={{ color: "black" }}>{resu.A}</h4>
                <h4 style={{ color: "black" }}>{resu.B}</h4>
                <h4 style={{ color: "black" }}>{resu.C}</h4>
                <h4 style={{ color: "black" }}>{resu.D}</h4>
                <h4 style={{ color: "black" }}>{resu.E}</h4>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FileUpload;
