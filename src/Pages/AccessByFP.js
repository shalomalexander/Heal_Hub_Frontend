import { useState } from "react";
import "../css/AccessByFP.css";
import img from "../assets/Images/default.jpg";
import profile_img from "../assets/Images/profile.png";
import { genders } from "../LabelValue";
import toast from "react-hot-toast";

const AccessByFP = () => {
  const [data, setData] = useState({
    fingerprint: "",
    gender:""
  });

  const [temp, setTemp] = useState("");

  const patients = [
    {
      name: "Shalom T Alexander",
      age: "21",
      pid: "98",
      phoneNumber: "9873738859", 
      alternateNumber: "9899129257" 
    }
  ];

  const handleInputChange = (event) => {
    const { name } = event.target;
    const value = event.target.files[0];

    setData((prevData) => {
      return { ...prevData, [name]: value };
    });

    //To show the image temporarly
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setTemp(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleClear = () => {
    setData({ fingerprint: "", gender:"" });
    console.log(data);
    window.location.reload(false);
  
  };

  const handleSubmit = () => {
    toast.success("Submitted");
    console.log(data);
  };

  const handleRequest = () => {
    toast.success("Requested");
  }


  return (
    <>
      <div className="content-inner">
        <p className="bold-300">Access by Fingerprint</p>
        <hr />
        <div className="table-responsive-sm">
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th scope="col">Fingerprint Image</th>
                <th scope="col" className="w-10">Upload Fingerprint</th>
                <th scope="col">Gender</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {data.fingerprint !== "" ? (
                    <>
                      <img className="image-container" src={temp} alt="#" />
                    </>
                  ) : (
                    <>
                      <img
                        className="table-image-container"
                        src={img}
                        alt="#"
                      />
                    </>
                  )}
                </td>
                <td className="w-10">
                  <input
                    name="fingerprint"
                    onChange={handleInputChange}
                    type="file"
                    accept="image/*"
                  />
                </td>
                <td>
                  <select className="form-control">
                    {genders.map((gender, index) => (
                      <option key={index} value={gender.value}>
                        {gender.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button className="btn btn-secondary" onClick={handleClear}>
                    Clear
                  </button>
                </td>
                <td>
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Search
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <strong style={{ fontSize: "25px",}}>
          Best Match
        </strong>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Photo</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Patient ID</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Alternate Number</th>
                <th scope="col">Request</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>
                      <img
                        className="table-image-container"
                        src={profile_img}
                        alt="#"
                      />
                    </td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.pid}</td>
                    <td>{patient.phoneNumber}</td>
                    <td>{patient.alternateNumber}</td>
                    <td>
                      <button onClick={handleRequest} className="btn btn-warning">Request</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AccessByFP;
