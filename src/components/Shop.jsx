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
import { GiShoppingCart } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/action";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../logoColleponi.png";

const Shop = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentMielery, setCurrentMielery] = useState(null);
  const [mieleries, setMieleries] = useState([]);
  const dispatch = useDispatch();

  const handleCardClick = (mielery) => {
    setCurrentMielery(mielery);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentMielery(null);
    setShowModal(false);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert("Prodotto aggiunto correttamente al carrello");
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });

    fetch("http://localhost:8080/mieleries/all")
      .then((response) => response.json())
      .then((data) => setMieleries(data))
      .catch((error) => console.error("Errore nella richiesta:", error));
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
          {mieleries.map((mielery) => (
            <Col
              md={3}
              key={mielery.id}
              onClick={() => handleCardClick(mielery)}
            >
              <Card
                className="mb-3 shop-card uniqueShopCard"
                data-aos="zoom-in-up"
              >
                <Card.Img
                  variant="top"
                  src={mielery.imageUrl}
                  className="shop-card-img"
                />
                <Card.Body>
                  <Card.Title>
                    <h3>{mielery.name}</h3>
                  </Card.Title>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{mielery.location}</span>
                    <span>{mielery.prezzo}€</span>
                  </div>
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
              <p className="d-flex justify-content-between align-items-center">
                <span className="fs-4 text-info">
                  Rating: {currentMielery.rating}
                </span>{" "}
                <span className="fs-4 text-info">
                  Prezzo: {currentMielery.prezzo}€
                </span>{" "}
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
            onClick={() => handleAddToCart(currentMielery)}
          >
            <GiShoppingCart /> Agg. al carrello
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Shop;
