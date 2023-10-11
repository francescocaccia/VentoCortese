import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    password: "",
  });
  const [errore, setErrore] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const login = async (emailUtente) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailUtente,
          password: formData.password,
        }),
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
          navigate("/login");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        let data = await response.json();
        setErrore("");
        login(data.email);
      } else {
        let data = await response.json();
        setErrore(data.message || "Errore durante la registrazione.");
      }
    } catch (error) {
      console.error("Si è verificato un errore:", error);
      setErrore("Errore durante la registrazione.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Registrazione Cliente</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
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
                <Form.Group controlId="telefono">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
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
                {errore !== "" && <p className="text-danger mt-3">{errore}</p>}
                <Button variant="primary" type="submit">
                  Registrati
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
