import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Contacts = () => {
  return (
    <Container>
      <h2 className="text-center my-4">Contattaci</h2>
      <Row>
        <Col md={4}>
          <ContactCard
            icon={<FiPhone size={40} />}
            title="Telefono"
            info="+1 123-456-7890"
          />
        </Col>
        <Col md={4}>
          <ContactCard
            icon={<FiMail size={40} />}
            title="Email"
            info="info@example.com"
          />
        </Col>
        <Col md={4}>
          <ContactCard
            icon={<FiMapPin size={40} />}
            title="Indirizzo"
            info="123 Via delle Vacanze, Località, 12345"
          />
        </Col>
      </Row>
    </Container>
  );
};

const ContactCard = ({ icon, title, info }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="contact-icon">{icon}</div>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{info}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Contacts;
