import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import logo from "../logoColleponi.png";
const restaurants = [
  {
    name: "Al Vecchio Rio",
    location: "Venezia",
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/photo-s/0e/a2/1a/96/20170310-201130-largejpg.jpg",
  },
  {
    name: "Rosso Piccante",
    location: "Torino",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipP1-W6Wvw4iVgQOjoeKlNpwBNHoaC0Kj8Lec1Xj",
  },
  {
    name: "Warsa",
    location: "Milano",
    imageUrl:
      "https://media-assets.wired.it/photos/62d04a525f6dbea809efde55/3:2/w_1200,h_800,c_limit/1200px-Red_Oil_Bobo-Chicken.jpg",
  },
  {
    name: "Namaste",
    location: "Teramo",
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/photo-s/11/16/4b/d2/piatti-e-spiedini.jpg",
  },
  {
    name: "Pang",
    location: "Jesi (AN)",
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/photo-s/1c/6f/7c/fb/i-nostri-piatti.jpg",
  },
  {
    name: "Passaggio in India",
    location: "Torino",
    imageUrl:
      "https://assets.eatintime.it/eatintime/img/media/2196-passaggio-in-india-ristorante-indiano-torino-md.jpg",
  },
  {
    name: "Peperoncino Nostro",
    location: "Catanzaro Lido (CZ)",
    imageUrl:
      "https://www.ilgiornaledelcibo.it/wp-content/uploads/2016/09/pasta-piccante.jpg",
  },
  {
    name: "Pipàzzu",
    location: "Squillace (CZ)",
    imageUrl:
      "https://www.finedininglovers.it/sites/g/files/xknfdk1106/files/styles/im_landscape_100/public/fdl_content_import_it/cibi-piccanti-rimedi.jpg.webp?itok=-rg77S8M",
  },
];

const Shop = () => {
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
        <p className="my-4 text-center fw-semibold">
          Benvenuti nella sezione dedicata agli amanti del peperoncino! Qui
          troverai informazioni sui ristoranti che offrono piatti piccanti,
          suggerimenti su come ordinare cibo piccante e curiosità sui diversi
          tipi di peperoncino e come vengono utilizzati nella cucina.
        </p>
        <p className="text-center">
          Il peperoncino è un ingrediente versatile che può aggiungere sapore e
          piccantezza a molti piatti. Che tu preferisca il calore delicato del
          peperoncino jalapeño o il fuoco intenso del habanero, c'è un
          peperoncino adatto a ogni palato. E con così tanti ristoranti che
          offrono opzioni piccanti, non c'è mai stato un momento migliore per
          essere un amante del peperoncino!
        </p>
        <Row className="my-4">
          {restaurants.map((restaurant, index) => (
            <Col md={3} key={index}>
              <Card className="mb-3">
                <Card.Img
                  variant="top"
                  src={restaurant.imageUrl}
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title>{restaurant.name}</Card.Title>
                  <Card.Text>{restaurant.location}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container>
        <h3 className="mb-3">Il nostro Salumi...</h3>
        <Row>
          <Col md={5}>
            <Image
              src="https://salumificiodigenga.it/wp-content/uploads/2022/09/LE_TRADIZIONI.jpg"
              fluid
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          </Col>
          <Col md={2}>
            <Image src={logo} fluid />
          </Col>
          <Col md={5}>
            <Image
              src="https://www.mark-up.it/wp-content/uploads/sites/3/2021/06/Famiglia_prodotti-696x464.jpg"
              fluid
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          </Col>
        </Row>
        <p className="my-4 text-center fw-semibold">
          Benvenuti nella sezione dedicata agli amanti del peperoncino! Qui
          troverai informazioni sui ristoranti che offrono piatti piccanti,
          suggerimenti su come ordinare cibo piccante e curiosità sui diversi
          tipi di peperoncino e come vengono utilizzati nella cucina.
        </p>
        <p className="text-center">
          Il peperoncino è un ingrediente versatile che può aggiungere sapore e
          piccantezza a molti piatti. Che tu preferisca il calore delicato del
          peperoncino jalapeño o il fuoco intenso del habanero, c'è un
          peperoncino adatto a ogni palato. E con così tanti ristoranti che
          offrono opzioni piccanti, non c'è mai stato un momento migliore per
          essere un amante del peperoncino!
        </p>
        <Row className="my-4">
          {restaurants.map((restaurant, index) => (
            <Col md={3} key={index}>
              <Card className="mb-3">
                <Card.Img
                  variant="top"
                  src={restaurant.imageUrl}
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title>{restaurant.name}</Card.Title>
                  <Card.Text>{restaurant.location}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Shop;
