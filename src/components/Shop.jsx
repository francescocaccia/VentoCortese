import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Modal,
  Button,
} from "react-bootstrap";
import logo from "../logoColleponi.png";
import { GiShoppingCart } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import { connect } from "react-redux";
import { addToCart } from "../Redux/action";
import AOS from "aos";
import "aos/dist/aos.css";

const mieleries = [
  {
    name: "Miele Dolcezza",
    location: "Toscana",
    description: "Un'azienda apistica specializzata in miele biologico e puro.",
    rating: 4.7,
    imageUrl:
      "https://www.fattoriascalabrini.it/167-large_default/kit-regalo-miele-2-vasetti-gr-110.jpg",
  },
  {
    name: "Miele Fiorito",
    location: "Piemonte",
    description:
      "Produttori di miele aromatico e delizioso, direttamente dalle colline piemontesi.",
    rating: 4.5,
    imageUrl:
      "https://www.gustosesapores.com/wp-content/uploads/miele-anedda-asfodelo-1.png",
  },
  {
    name: "Miele delle Alpi",
    location: "Lombardia",
    description:
      "Scelto tra i migliori alpeggi delle Alpi, questo miele offre un sapore unico.",
    rating: 4.8,
    imageUrl:
      "https://shop.negozioleggero.it/5842-large_default/miele-di-tiglio.jpg",
  },
  {
    name: "Miele d'Arancia",
    location: "Sicilia",
    description: "Un'esplosione di gusto con il miele d'arancia della Sicilia.",
    rating: 4.6,
    imageUrl:
      "https://rauartedolciariashop.com/wp-content/uploads/2021/07/miele-asfodelo.jpg",
  },
  {
    name: "Miele delle Colline Verdi",
    location: "Umbria",
    description:
      "Il miele perfetto per gli amanti della natura, raccolto tra le colline umbre.",
    rating: 4.9,
    imageUrl:
      "https://www.prodottitipicivalledaosta.it/2286-large_default/miele-di-millefiori-100-italiano-750-g.jpg",
  },
  {
    name: "Miele del Bosco",
    location: "Trentino-Alto Adige",
    description: "Una delizia selvatica, raccolta nei boschi delle Dolomiti.",
    rating: 4.7,
    imageUrl:
      "https://www.agrigal.com/negozio-bio-online/2242-large_default/api-experience-box-limited-edition.jpg",
  },
];

const Shop = ({ addToCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentMielery, setCurrentMielery] = useState(null);

  const handleCardClick = (mielery) => {
    setCurrentMielery(mielery);
    setShowModal(true);
  };

  const [cartItems, setCartItems] = useState([]);

  const handleCloseModal = () => {
    setCurrentMielery(null);
    setShowModal(false);
  };
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durata dell'animazione in millisecondi
    });
  }, []);
  return (
    <>
      <Container>
        <h2 className="text-center my-4">Il nostro shop...</h2>
        <h3 className="mb-3">Il nostro Miele...</h3>

        <Row>
          <Col md={5}>
            <Image
              src="https://www.my-personaltrainer.it/2017/12/22/miele-di-acacia-orig.jpeg"
              fluid
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          </Col>
          <Col md={2}>
            <Image src={logo} fluid />
          </Col>
          <Col md={5}>
            <Image
              src="https://www.melarossa.it/wp-content/uploads/2022/12/miele-d-acacia-che-cos-e-proprieta-benefic-calorie-usi-terapeutici-e-in-cucina.jpg"
              fluid
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          </Col>
        </Row>
        <p className="my-4 text-center fw-semibold fs-3">
          Benvenuti nella sezione dedicata agli amanti del miele! Qui troverete
          informazioni sulle aziende apistiche che producono miele di alta
          qualità, consigli su come scegliere il miglior miele e curiosità sulle
          diverse varietà di miele e sul loro utilizzo.
        </p>
        <p className="text-center fs-4">
          Il miele è un tesoro naturale con una vasta gamma di sapori e aromi.
          Che tu prediliga il miele di acacia delicato o il miele di castagno
          robusto, ci sono varietà di miele adatte a ogni gusto. Con aziende
          apistiche provenienti da diverse regioni, avrete l'opportunità di
          esplorare il mondo del miele come mai prima d'ora!
        </p>
        <Row className="my-4">
          {mieleries.map((mielery, index) => (
            <Col md={3} key={index} onClick={() => handleCardClick(mielery)}>
              <Card className="mb-3" data-aos="zoom-in-up">
                <Card.Img
                  variant="top"
                  src={mielery.imageUrl}
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title>
                    <h3>{mielery.name}</h3>
                  </Card.Title>
                  <Card.Text>{mielery.location}</Card.Text>
                  <Card.Text>{mielery.rating}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Dettagli Miele</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentMielery && (
            <>
              <h2>{currentMielery.name}</h2>
              <p>
                <span className="fs-4 text-info">Location:</span>{" "}
                {currentMielery.location}
              </p>
              <p>
                <span className="fs-4 text-info">Description:</span>{" "}
                {currentMielery.description}
              </p>
              <p>
                <span className="fs-4 text-info">Rating:</span>{" "}
                {currentMielery.rating}
              </p>
              <Image src={currentMielery.imageUrl} fluid />
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="info" onClick={handleCloseModal} className="mr-2">
            <IoIosClose /> Chiudi
          </Button>
          <Button
            variant="info"
            onClick={() => {
              addToCart(currentMielery);
              setCartItems([...cartItems, currentMielery]);
              alert("Prodotto aggiunto correttamente al carrello");
            }}
          >
            <GiShoppingCart /> Agg. al carrello
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(null, { addToCart })(Shop);
