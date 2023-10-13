import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSuccess, setCurrentUser } from "../Redux/action";
import { RiLoginCircleLine } from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Per ottenere i parametri URL

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, idCliente, nome } = data;

        // Salva i dati dell'utente in Redux
        dispatch(loginSuccess({ id: idCliente, nome, email: formData.email }));

        localStorage.setItem("userID", idCliente);
        if (token) {
          localStorage.setItem("authToken", token);

          alert(`Benvenuto ${nome}! Accesso effettuato con successo.`);
          // Dopo l'accesso dell'utente
          const user = nome; // Può anche essere un oggetto con più dettagli sull'utente
          dispatch(setCurrentUser(user));

          const redirect = new URLSearchParams(location.search).get("redirect");
          if (redirect) {
            navigate(redirect);
          } else {
            navigate("/");
          }
        } else {
          alert("Token non ricevuto.");
        }
      } else {
        dispatch(loginError(data.message || "Errore durante l'accesso.")); // Qui notifichi Redux dell'errore
        alert(data.message || "Errore durante l'accesso.");
      }
    } catch (error) {
      console.error("Si è verificato un errore:", error);
      alert("Errore durante l'accesso.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Accesso Cliente</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <div className="text-center fs-5 mt-2 mb-3">
                  <Link to="/register" className="text-decoration-none">
                    <RiLoginCircleLine /> se non sei ancora registrato clicca
                    qui
                  </Link>
                </div>
                <Button variant="primary" type="submit">
                  Accedi
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
