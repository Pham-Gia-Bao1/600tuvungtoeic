import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/common/Button/Button";

const AuthPage: React.FC = () => {
  const { user, login, logout, loading, initializationError } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return (
      <div>
        <div>Welcome, {user.name}</div>
        <Button onClick={() => void logout().catch((logoutError: unknown) => {
          setError(logoutError instanceof Error ? logoutError.message : "Unable to log out.");
        })}>Logout</Button>
        {error && <p role="alert">{error}</p>}
      </div>
    );
  }

  const handleGoogleLogin = async () => {
    setError("");
    setSubmitting(true);

    try {
      await login();
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : "Google login failed.");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-12 w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="mb-2 text-2xl font-semibold">Sign in</h1>
      <p className="mb-6 text-sm text-gray-600">Continue with your Google account.</p>
      {initializationError && <p className="mb-4 text-red-600" role="alert">{initializationError}</p>}
      {error && <p className="mb-4 text-red-600" role="alert">{error}</p>}
      <Button
        className="w-full"
        disabled={loading || Boolean(initializationError)}
        loading={submitting}
        onClick={() => void handleGoogleLogin()}
        type="button"
        variant="light"
      >
        <span aria-hidden="true" className="mr-2 font-bold text-blue-600">G</span>
        Continue with Google
      </Button>
    </div>
  );
};

export default AuthPage;
