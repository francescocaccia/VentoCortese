import React from "react";
import Carousel from "react-bootstrap/Carousel";
import genga from "../genga.png";
import pieroSara from "../Pierosara.png";
import grotte from "../grotte.png";
import logo from "../logoColleponi.png";
import VideoSfondo from "../VideoSfondo.mp4";
import { Button, Col, Container, Row } from "react-bootstrap";
import BoxLayout from "./BoxLayout";
import Mapp from "./Mapp";
const HomePage = () => {
  return (
    <>
      <Row>
        <Col xs={12} sm={12} md={12}>
          <div className="background">
            <video
              autoPlay
              loop
              muted
              style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
                objectFit: "cover",
              }}
            >
              <source src={VideoSfondo} type="video/mp4" />
            </video>
            <div className="background__text size-5">
              <div className="d-flex justify-content-center">
                <img
                  src={logo}
                  alt="logo"
                  width={310}
                  height={310}
                  className="img-with-shadow"
                />
              </div>
              <p className="fs-1">
                Benvenuti a VentoCortese, il vostro rifugio ideale per una
                vacanza rilassante immersa nella natura
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <Container>
        <div>
          <h1 className="text-center mt-5 fs-1"> Vieni a conoscerci</h1>
          <p>
            Il VentoCortese accoglie i viaggiatori e i suoi ospiti con un
            affascinante Bed and breakfast. Gli appartamenti e le camere,
            arredati con gusto, sono la nostra offerta per coloro che desiderano
            soggiornare a Colleponi-Genga, godendo di una vacanza in totale
            tranquillità. La nostra casa vacanze VentoCortese è il luogo ideale
            per chi cerca un rifugio sereno e rilassante.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 0",
              marginRight: "20px",
            }}
          >
            <div data-aos="fade-down">
              <img
                src="https://www.waterair.com/wp-content/uploads/2021/09/piscine-rectangle-emilie-2-jour_1.jpg"
                alt="Foro"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  marginBottom: "20px",
                }}
              />
            </div>
            <div data-aos="fade-down-left">
              <img
                src="https://www.planetasrl.net/blog/wp-content/uploads/2019/05/giardino-emozionale.jpg"
                alt="tempio"
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          <div data-aos="fade-left" style={{ flex: "1 1 0" }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bergkirchlein_-_Flickr_-_Stiller_Beobachter.jpg"
              alt="abbazia"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
        <hr className="text-success" />
        <BoxLayout />
        <hr className="text-success" />
      </Container>

      <h2 className="text-center mt-3">
        C'è un modo ricco di cultura intorno a noi da poter visitare in pieno
        relax. Organizziamo escursioni per i vari luoghi di interesse che ci
        sono intorno a noi
      </h2>
      {/* carosello illustrativo genga */}
      <Carousel className="illustrative-carousel mt-5">
        <Carousel.Item className="illustrative-carousel-item">
          <img className="d-block w-100" src={genga} alt="First slide" />
          <Carousel.Caption className="illustrative-carousel-caption">
            <Button className="illustrative-carousel-button">
              <h3>Prima diapositiva</h3>
            </Button>
            <p>Descrizione della prima diapositiva.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={pieroSara} alt="second slide" />
          <Carousel.Caption>
            <Button className="text-decoration-none">
              <h3>Prima diapositiva</h3>
            </Button>
            <p>Descrizione della seconda diapositiva.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={grotte} alt="First slide" />
          <Carousel.Caption>
            <Button>
              <h3>Prima diapositiva</h3>
            </Button>
            <p>Descrizione della terza diapositiva.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className="mt-5">
        <hr className="text-success" />
        <h3 className="text-center mb-3">Dove siamo</h3>
        <div className="custom-map-container">
          <Mapp lat={43.4373176} lng={12.9091765} />
        </div>
        <hr className="text-success" />
      </Container>
    </>
  );
};

export default HomePage;
