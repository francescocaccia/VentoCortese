import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Contacts = () => {
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
  return (
    <Container>
      <div data-aos="fade-down-left">
        <h2 className="text-center my-4">Contattaci</h2>
      </div>
      <Row>
        <Col md={4} data-aos="fade-down-right">
          <ContactCard
            icon={<FiPhone size={40} />}
            title="Telefono"
            info="+1 123-456-7890"
          />
        </Col>
        <Col md={4} data-aos="fade-down-up">
          <ContactCard
            icon={<FiMail size={40} />}
            title="Email"
            info="info@example.com"
          />
        </Col>
        <Col md={4} data-aos="flip-left">
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

export default Contacts;
