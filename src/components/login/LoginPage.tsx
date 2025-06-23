import { useState } from "react";
import Form, { LoginData } from "./Form";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router";
import { useAlert } from "../../context/AlertContext";

function LoginPage() {
  const navigate = useNavigate();
  const [submitMode, setSubmitMode] = useState(true);
  const { setUser } = useUser();
  const { showAlert } = useAlert();

  const guidance = submitMode ? "already have an account ?" : "back to submit";
  const button_text = submitMode ? "Submit" : "Login";

  const showErrorAlert = (data: any) => {
    console.log(data);
    showAlert(data.error, "error");
  };

  const onRegister = (inData: LoginData, endpoint = "register") => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inData),
    };

    fetch(`http://localhost:3000/api/auth/${endpoint}`, requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          showErrorAlert(await response.json());
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        localStorage.setItem("article-leen-token", data.token);
        showAlert("Successful Login!", "success");
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
    </div>
  );
}

export default LoginPage;
