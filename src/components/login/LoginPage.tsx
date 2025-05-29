import { useState } from "react";
import Form, { LoginData } from "./Form";

function LoginPage() {
  const [submitMode, setSubmitMode] = useState(true);

  const guidance = submitMode ? "already have an account ?" : "back to submit";
  const button_text = submitMode ? "Submit" : "Login";

  const onRegister = (data: LoginData) => {
    console.log("should register", data);
  };

  const onLogin = (data: LoginData) => {
    console.log("should login", data);
    // window.location.href = "feed";
  };

  return (
    <div>
      <Form
        onSubmit={(data) => {
          if (submitMode) onRegister(data);
          else onLogin(data);
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
