import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";
import * as XLSX from "xlsx";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [items, setItems] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [searchCategory, setSearchCategory] = useState("first_name");
  const [filter, setFilter] = useState("");

  const onChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFilename(file.name);
    readExcel(file);
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  const onSubmit = async (e) => {
    setSubmitted(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });

      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setMessage("Resume Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }
  };

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {searchCategory}
          </button>
          <div className="dropdown-menu">
            <button
              className="dropdown-item"
              type="button"
              onClick={() => setSearchCategory("first_name")}
            >
              first_name
            </button>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => setSearchCategory("last_name")}
            >
              last_name
            </button>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => setSearchCategory("company")}
            >
              company
            </button>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => setSearchCategory("job")}
            >
              job
            </button>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => setSearchCategory("skill")}
            >
              skill
            </button>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => setSearchCategory("city")}
            >
              city
            </button>
          </div>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Text input with dropdown button"
          onChange={changeFilter}
        />
      </div>
      {submitted ? (
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">first_name</th>
              <th scope="col">last_name</th>
              <th scope="col">company</th>
              <th scope="col">job</th>
              <th scope="col">skill</th>
              <th scope="col">city</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter(
                (item) =>
                  item[`${searchCategory}`]
                    .substring(0, filter.length)
                    .toLowerCase() === filter.toLowerCase()
              )
              .map((d) => (
                <tr key={d.id}>
                  <th>{d.first_name}</th>
                  <th>{d.last_name}</th>
                  <th>{d.company}</th>
                  <th>{d.job}</th>
                  <td>{d.skill}</td>
                  <td>{d.city}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <h5 className="display-5 text-center mb-4">No Resume Data Uploaded</h5>
      )}
    </Fragment>
  );
};

export default FileUpload;
