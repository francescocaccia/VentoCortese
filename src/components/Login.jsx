import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
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
      console.log(data);

      if (response.ok) {
        const { token, idCliente, nome } = data;
        console.log("Token ricevuto:", token);
        console.log("ID del cliente ricevuto:", idCliente);
        localStorage.setItem("userID", idCliente);
        if (token) {
          localStorage.setItem("authToken", token);
          console.log("Token salvato in localStorage");

          if (idCliente) {
            console.log("UserID salvato in localStorage e Redux:", idCliente);
          }

          alert(`Benvenuto ${nome}! Accesso effettuato con successo.`);
        } else {
          alert("Token non ricevuto.");
        }
      } else {
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
