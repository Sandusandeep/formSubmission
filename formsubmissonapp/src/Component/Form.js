import { useState, useEffect } from "react";

const Form = () => {
  const API_URL = "http://localhost:5000/users";
  const [selectedList, setSelectedList] = useState("");
  const [mobile, setMobile] = useState("");
  const listData = ["answer1", "answer2", "answer3", "answer4"];
  const [check, setChecked] = useState("Male");
  const [subject, setSubject] = useState("English");
  const [urlMessage, setUrlMessage] = useState("url can not be empty");
  const [flagUrl, setFlagUrl] = useState(true);
  const [flagSubmit, setFlagSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    gender: check,
    subject: subject,
    Resume: "",
    url: "",
    answer: "",
    about: "",
  });
  const handleChange = (textName, e) => {
    let value = "";
    setFlagSubmit(false);
    if (textName === "contact") {
      if (e.target.value.length <= 10) {
        setMobile(e.target.value);
        setFormData({ ...formData, [textName]: e.target.value });
      }
    } else if (textName === "Resume") {
      value = e.target.files[0];
    } else if (textName === "url") {
      const strictUrlRegex =
        /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(:\d{2,5})?(\/[\w.-]*)*(\?.*)?(#.*)?$/i;
      value = e.target.value;
      if (value === "") {
        setUrlMessage("url can not be empty");
        setFlagUrl(true);
      } else {
        const regexFlag = strictUrlRegex.test(value);
        if (!regexFlag) {
          setUrlMessage("url is not valid!!!");
          setFlagUrl(true);
        } else {
          setFlagUrl(false);
        }
      }
    } else if (textName === "answer") {
      setSelectedList(e.target.value);
      value = e.target.value;
    } else {
      value = e.target.value;
    }
    if (textName !== "contact") {
      setFormData({ ...formData, [textName]: value });
    }
  };

  async function saveUserData(userData) {
    if (isSubmitting) return; // Prevent multiple calls
    setIsSubmitting(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      console.log("response: ", response);
      return await response.json();
    } catch (error) {
      console.log("error saving user data", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function onSubmitData() {
    setFlagSubmit(Object.values(formData).some((value) => value === ""));
    if (!flagSubmit) {
      saveUserData(formData);
      alert("Form submitted successfully!!!");
    }
  }
  function onReset() {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      gender: check,
      subject: subject,
      Resume: "",
      url: "",
      answer: "",
      about: "",
    });
    alert("Form reset done!");
  }
  return (
    <div className="formMain">
      <header className="mainHeader">
        <h1>Form in React</h1>
      </header>
      <div className="division1">
        <label htmlFor="FirstName">
          <b>First Name*</b>
          {formData.firstName === "" && (
            <label className="errorMessage">
              &nbsp; first name can not be empty
            </label>
          )}
        </label>
        <input
          type="text"
          value={formData.firstName}
          placeholder="Enter First Name"
          onChange={(e) => handleChange("firstName", e)}
        />
        <label htmlFor="LastName">
          <b>Last Name*</b>
          {formData.lastName === "" && (
            <label className="errorMessage">
              &nbsp; last name can not be empty
            </label>
          )}
        </label>
        <input
          type="text"
          placeholder="Enter Last Name"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e)}
        />
        <label htmlFor="Enter Email">
          <b>Enter Email*</b>
          {formData.email === "" && (
            <label className="errorMessage">
              &nbsp; email can not be empty
            </label>
          )}
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e)}
        />
        <label htmlFor="Contact">
          <b>Contact*</b>
          {formData.contact === "" && (
            <label className="errorMessage">
              &nbsp; contact can not be empty
            </label>
          )}
        </label>
        <input
          type="number"
          className="inputContact"
          maxLength={10}
          value={formData.mobile}
          placeholder="Enter Mobile number"
          onChange={(e) => handleChange("contact", e)}
        />
      </div>
      <div className="division2">
        <label htmlFor="Gender">
          <b>Gender*</b>
          {formData.gender === "" && (
            <label className="errorMessage">
              &nbsp; gender can not be empty
            </label>
          )}
        </label>
        <div className="divisonInput">
          <input
            type="radio"
            value="Male"
            className="inputGender1"
            checked={check === "Male"}
            onChange={(e) => setChecked(e.target.value)}
          />
          <b>Male</b>
          <input
            type="radio"
            value="Female"
            className="inputGender1"
            checked={check === "Female"}
            onChange={(e) => setChecked(e.target.value)}
          />
          <b>Female</b>
          <input
            type="radio"
            value="Other"
            className="inputGender1"
            checked={check === "Other"}
            onChange={(e) => setChecked(e.target.value)}
          />
          <b>Other</b>
        </div>
        <label htmlFor="your Subject">
          <b>Your Best Subject*</b>
          {formData.subject === "" && (
            <label className="errorMessage">
              &nbsp; subject can not be empty
            </label>
          )}
        </label>
        <div className="divisonInput">
          <input
            type="checkbox"
            value="English"
            className="inputGender1"
            checked={subject === "English"}
            onChange={(e) => setSubject(e.target.value)}
          />
          <b>English</b>
          <input
            type="checkbox"
            value="Maths"
            className="inputGender1"
            checked={subject === "Maths"}
            onChange={(e) => setSubject(e.target.value)}
          />
          <b>Maths</b>
          <input
            type="checkbox"
            value="Physics"
            className="inputGender1"
            checked={subject === "Physics"}
            onChange={(e) => setSubject(e.target.value)}
          />
          <b>Physics</b>
        </div>
        <label htmlFor="UploadResume">
          <b>Upload Resume*</b>
          {formData.Resume === "" && (
            <label className="errorMessage">
              &nbsp; Resume can not be empty
            </label>
          )}
        </label>
        <div className="divisonInput2">
          <input
            type="file"
            className="inputFile"
            value={formData ? formData.Resume : ""}
            onChange={(e) => handleChange("Resume", e)}
          />
          <label htmlFor="Enter Url">
            <b>Enter URL*</b>
            {flagUrl && (
              <label className="errorMessage">&nbsp; {urlMessage}</label>
            )}
          </label>
          <input
            type="text"
            placeholder="Enter url"
            value={formData.url}
            onChange={(e) => handleChange("url", e)}
          />
          <label htmlFor="Select choice">
            <b>Select your choice*</b>
            {formData.answer === "" && (
              <label className="errorMessage">
                &nbsp; choice can not be empty
              </label>
            )}
          </label>
          <select
            className="dropdown"
            value={formData.answer}
            onChange={(e) => handleChange("answer", e)}
          >
            <option value="">Select your Ans</option>
            {listData.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="Gender">
            <b>About</b>
          </label>
          <textarea
            name="About"
            id="About"
            value={formData.about}
            placeholder="About your self"
            onChange={(e) => handleChange("about", e)}
          ></textarea>
        </div>
      </div>
      {flagSubmit && (
        <p className="errorMessage">Please fill all the fields*</p>
      )}
      <div className="division3">
        <button onClick={onReset}>Reset</button>
        <button onClick={onSubmitData} disabled={isSubmitting}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
