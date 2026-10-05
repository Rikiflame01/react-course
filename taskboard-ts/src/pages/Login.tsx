// Lab 6.3: login form and redirect
// Lab 7.1: useAuth from AuthContext
import { useState } from "react";
import type { SubmitEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    login(name.trim() || "Demo user");
    navigate(from, { replace: true });
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <label htmlFor="login-name">Your name</label>
      <input
        id="login-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
      />
      <button type="submit">Log in</button>
    </form>
  );
}
