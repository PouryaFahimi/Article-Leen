import { useState } from "react";
import Form, { LoginData } from "./Form";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();
  const [submitMode, setSubmitMode] = useState(true);
  const [message, setMessage] = useState();
  const { setUser } = useUser();

  const guidance = submitMode ? "already have an account ?" : "back to submit";
  const button_text = submitMode ? "Submit" : "Login";

  const onRegister = (inData: LoginData, endpoint = "register") => {
    console.log("should register", inData);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inData),
    };

    fetch(`http://localhost:3000/api/auth/${endpoint}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        if (endpoint === "login")
          localStorage.setItem("article-leen-token", data.token);
        else setMessage(data.message);
        setUser({ username: inData.username });
        navigate("/" + inData.username);
      })
      .catch((error) => {
        console.error("Request failed:", error);
      });
  };

  return (
    <div className="flex-rowed login-form">
      <Form
        onSubmit={(data) => {
          if (submitMode) onRegister(data);
          else onRegister(data, "login");
        }}
      >
        {button_text}
      </Form>
      <button
        className="btn btn-secondary"
        onClick={() => setSubmitMode(!submitMode)}
      >
        {guidance}
      </button>
      {message ? <p>{message}</p> : null}
    </div>
  );
}

export default LoginPage;
