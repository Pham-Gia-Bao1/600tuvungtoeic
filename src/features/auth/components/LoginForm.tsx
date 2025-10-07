import React, { useState } from "react";
import { Button } from "../../../components/common/Button";

export const LoginForm: React.FC<{ onSubmit: (name: string) => void }> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(name); }}>
      <input className="border p-2 mb-2 w-full" value={name} onChange={e => setName(e.target.value)} />
      <Button type="submit">Login</Button>
    </form>
  );
};
