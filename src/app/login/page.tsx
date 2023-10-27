"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, Button,  } from 'react-bootstrap';

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
  };

  return (
<div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: 'url(./backLogin.jpg)', backgroundSize: 'cover' }}>
        <Card className="text-center">
        <Card.Header>
          <img
            src="./Logo.png"
            alt="Logo"
            style={{ width: '70px', borderRadius: '50%' }}
          />
        </Card.Header>
        <Card.Body>
          <h2>Ingresar</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo Electrónico"
              name="email"
              className="form-control mb-2"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control mb-2"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <style type='text/css'>
                    {`
                    .btn-flat {
                      background-color: purple;
                      color: white;
                    }

                    .btn-xxl {
                      padding: 0.4rem 1rem;
                      font-size: 1rem;
                    }
                  `}
                  </style>
            <Button type="submit" variant="flat" size="xxl">
              Login
            </Button>
          </form>
          {errors.length > 0 && (
            <div className="alert alert-danger mt-2">
              <ul className="mb-0">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
export default LoginPage;
