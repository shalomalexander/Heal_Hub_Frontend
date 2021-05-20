import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { loginContext, urlContext } from "../App";
import toast from "react-hot-toast";
import InputComponent from "../components/InputComponent";
import InputSelectComponent from "../components/InputSelectComponent";
import InputDateComponent from "../components/InputDateComponent";

const Profile = () => {
  const url = useContext(urlContext);

  const { state } = useContext(loginContext);

  const bloodGroups = [
    { label: "Choose", value: "" },
    { label: "A+", value: "A+" },
    { label: "B+", value: "B+" },
    { label: "AB+", value: "AB+" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: "A-", value: "A-" },
    { label: "B-", value: "B-" },
    { label: "AB-", value: "AB-" },
  ];

  const states = [
    { label: "Choose", value: "" },
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam" },
    { label: "Bihar", value: "Bihar" },
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh" },
    { label: "Jammu and Kashmir", value: "Jammu and Kashmir" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kerala", value: "Kerala" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Manipur", value: "Manipur" },
    { label: "Meghalaya", value: "Meghalaya" },
    { label: "Mizoram", value: "Mizoram" },
    { label: "Nagaland", value: "Nagaland" },
    { label: "Odisha", value: "Odisha" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Sikkim", value: "Sikkim" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Telangana", value: "Telangana" },
    { label: "Tripura", value: "Tripura" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "Uttarakhand", value: "Uttarakhand" },
    { label: "West Bengal", value: "West Bengal" },
  ];

  const genders = [
    { label: "Choose", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Others", value: "Others" },
  ];

  const [profile, setProfile] = useState({
    user: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    emailId: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    addressLine: "",
    cityOrTown: "",
    district: "",
    state: "",
    pin: "",
    aadhaarCardNumber: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevData) => {
      return { ...prevData, [name]: value, user: state.user.id };
    });
  };

  const handleSubmit = (event) => {
    //AXIOS POST Request
    axios
      .post(url + "/api/v1/PersonalInfo/", profile, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("Profile Updated Successfully.");
      })
      .catch((error) => {
        console.log(error.response.request);
      });
  };

  const handleUpdate = async (event) => {
    if (event) {
      event.preventDefault();
    }
    axios
      .patch(
        url + "/api/v1/PersonalInfoOfSpecificUser/" + state.user.id,
        profile,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // alert("Profile Updated Successfully.");
        toast.success("Profile Updated Successfully.");
        setShowUpdate(false);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error("Couldn't Update.");
      });
  };

  const handle_Submit = (event) => {
    event.preventDefault();
    if (event.nativeEvent.submitter.name === "PUT") {
      handleUpdate();
    } else {
      handleSubmit();
    }
  };

  const toggleUpdate = () => {
    setShowUpdate(!showUpdate);
    
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = null;
      try {
        response = await axios.get(
          url + "/api/v1/PersonalInfoOfSpecificUser/" + state.user.id
        );
        if (response.status === 200 ? setIsUpdate(true) : setIsUpdate(false));
        setProfile((prevData) => {
          return {
            ...prevData,
            firstName: response.data["firstName"],
            middleName: response.data["middleName"],
            lastName: response.data["lastName"],
            gender: response.data["gender"],
            dateOfBirth: response.data["dateOfBirth"],
            bloodGroup: response.data["bloodGroup"],
            emailId: response.data["emailId"],
            mobileNumber: response.data["mobileNumber"],
            alternateMobileNumber: response.data["alternateMobileNumber"],
            addressLine: response.data["addressLine"],
            cityOrTown: response.data["cityOrTown"],
            district: response.data["district"],
            state: response.data["state"],
            pin: response.data["pin"],
            aadhaarCardNumber: response.data["aadhaarCardNumber"],
          };
        });
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [state.user.id, url, isUpdate]);

  return (
    <>
      <div className="content-inner">
        <div className="profile-inner">
          <div className="row">
            <p className="bold-300">
              Profile{" "}
              {isUpdate ? (
                <>
                  <span
                    onClick={toggleUpdate}
                    className="clickable-icon material-icons"
                  >
                    edit
                  </span>
                </>
              ) : (
                <></>
              )}
            </p>
          </div>
          <hr />
          <form onSubmit={handle_Submit}>
            <div className="input-row">
              <div className="col">
                <InputComponent
                  label="First Name*"
                  name="firstName"
                  value={profile.firstName}
                  placeholder="required"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                  required="required"
                />
              </div>

              <div className="col">
                <InputComponent
                  label="Middle Name"
                  name="middleName"
                  value={profile.middleName}
                  placeholder="Optional"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>

              <div className="col">
                <InputComponent
                  label="Last Name"
                  name="lastName"
                  value={profile.lastName}
                  placeholder="Optional"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="col">
                <InputSelectComponent
                  label="Gender*"
                  name="gender"
                  value={profile.gender}
                  handleInputChange={handleInputChange}
                  list={genders}
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                />
              </div>

              <div className="col">
                <InputDateComponent
                  label="Date of Birth*"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  handleInputChange={handleInputChange}
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                />
              </div>

              <div className="col">
                <InputSelectComponent
                  label="Blood Group*"
                  name="bloodGroup"
                  value={profile.bloodGroup}
                  handleInputChange={handleInputChange}
                  list={bloodGroups}
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="col">
                <InputComponent
                  label="Email ID"
                  name="emailId"
                  value={profile.emailId}
                  placeholder="required"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>

              <div className="col">
                <InputComponent
                  label="Mobile Number"
                  name="mobileNumber"
                  value={profile.mobileNumber}
                  placeholder="required"
                  maxLength="10"
                  minLength="10"
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="col">
                <InputComponent
                  label="Alternate Mobile Number"
                  name="alternateMobileNumber"
                  value={profile.alternateMobileNumber}
                  placeholder="Optional"
                  maxLength="10"
                  minLength="10"
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="col">
                <InputComponent
                  label="Address Line*"
                  name="addressLine"
                  value={profile.addressLine}
                  placeholder="required"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="col">
                <InputComponent
                  label="City or Town*"
                  name="cityOrTown"
                  value={profile.cityOrTown}
                  placeholder="required"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="col">
                <InputComponent
                  label="District*"
                  name="district"
                  value={profile.district}
                  placeholder="required"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="col">
                <InputSelectComponent
                  label="State*"
                  name="state"
                  value={profile.state}
                  handleInputChange={handleInputChange}
                  list={states}
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                />
              </div>

              <div className="col">
                <InputComponent
                  label="Pin*"
                  name="pin"
                  value={profile.pin}
                  placeholder="required"
                  maxLength="6"
                  minLength="6"
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="col">
                <InputComponent
                  label="Aadhaar Card Number*"
                  name="aadhaarCardNumber"
                  value={profile.aadhaarCardNumber}
                  placeholder="required"
                  maxLength="12"
                  minLength="12"
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>

            <hr />
            <p className="font-small">
              <strong>Note:</strong> When you fill this form and submit it, The
              data will reflect in your dashboard.
            </p>

            {isUpdate ? (
              <>
                {showUpdate ? (
                  <>
                    <div className="input-row">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        name="PUT"
                        value="PUT"
                      >
                        Done
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={toggleUpdate}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
              </>
            ) : (
              <button
                // onClick={handleSubmit}
                className="btn btn-primary"
                type="submit"
                name="POST"
                value="POST"
              >
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
