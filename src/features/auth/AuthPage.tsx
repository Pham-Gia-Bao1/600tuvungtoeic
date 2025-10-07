import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/common/Button";

const AuthPage: React.FC = () => {
  const { user, login, logout } = useAuth();
  const [name, setName] = useState("");

  if (user) {
    return (
      <div>
        <div>Welcome, {user.name}</div>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    );
  }

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} className="border p-2" />
      <Button onClick={() => login(name)}>Login</Button>
    </div>
  );
};

export default AuthPage;
