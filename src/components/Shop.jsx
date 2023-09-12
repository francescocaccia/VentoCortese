import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import logo from "../logoColleponi.png";
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

const salumeries = [
  {
    name: "Salumeria Italiana",
    location: "Roma",
    description:
      "Un negozio storico che offre una vasta selezione di salumi italiani di alta qualità.",
    rating: 4.7,
    imageUrl:
      "https://salumificiodigenga.it/wp-content/uploads/2022/01/Salumificio-di-Genga-02335.jpg",
  },
  {
    name: "Salumi del Piemonte",
    location: "Torino",
    description:
      "Specialisti dei salumi piemontesi tradizionali, perfetti per gli amanti del gusto autentico.",
    rating: 4.6,
    imageUrl:
      "https://www.storienogastronomiche.it/wp-content/uploads/2019/09/copertina-articoli-19.jpg",
  },
  {
    name: "Salumi Toscani",
    location: "Firenze",
    description:
      "Un paradiso per chi ama i salumi toscani, con una varietà di opzioni deliziose.",
    rating: 4.8,
    imageUrl:
      "https://www.ilmangiaweb.it/immagini/prodotti/2018_09/36/364978747884/gallery/salame-morbido-di-genga_p364978747884_02.jpg",
  },
  {
    name: "Salumi della Sicilia",
    location: "Palermo",
    description:
      "Scopri i segreti dei salumi siciliani artigianali, pieni di sapore mediterraneo.",
    rating: 4.5,
    imageUrl:
      "https://www.adriamarket.com/wp-content/uploads/2020/06/SALAME_MARCHIGIANO.jpg",
  },
  {
    name: "Salumi delle Alpi",
    location: "Trento",
    description:
      "I migliori salumi delle Alpi italiane, con ingredienti di alta qualità da montagna.",
    rating: 4.9,
    imageUrl:
      "https://www.foodfind.it/media/anagrafica/14/Bassa_Salumificio-di-Genga-Sentinum06008-Il-Gigante.jpg",
  },
  {
    name: "Salumi della Campania",
    location: "Napoli",
    description:
      "Prova i salumi tradizionali della Campania e goditi il sapore dell'Italia meridionale.",
    rating: 4.7,
    imageUrl:
      "https://salumificiodigenga.it/wp-content/uploads/2022/09/LE_TRADIZIONI.jpg",
  },
];

function renderRatingStars(rating) {
  const maxRating = 5;
  const starArray = [];

  for (let i = 1; i <= maxRating; i++) {
    if (i <= rating) {
      // Se la stella è inferiore o uguale al rating, colorala di giallo
      starArray.push(
        <span key={i} className="star yellow-star">
          &#9733;
        </span>
      );
    } else {
      // Altrimenti, lascia la stella grigia
      starArray.push(
        <span key={i} className="star">
          &#9733;
        </span>
      );
    }
  }

  return <div className="rating">{starArray}</div>;
}
const SalumerieList = ({ salumeries }) => (
  <Row className="my-4">
    {salumeries.map((salumeria, index) => (
      <Col md={3} key={index}>
        <Card className="mb-3">
          <Card.Img
            variant="top"
            src={salumeria.imageUrl}
            className="card-img"
          />
          <Card.Body>
            <Card.Title>{salumeria.name}</Card.Title>
            <Card.Text>{salumeria.location}</Card.Text>
            {renderRatingStars(salumeria.rating)}{" "}
            {/* Visualizza il rating con stelle colorate */}
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);
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
          {mieleries.map((mieleries, index) => (
            <Col md={3} key={index}>
              <Card className="mb-3">
                <Card.Img
                  variant="top"
                  src={mieleries.imageUrl}
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title>
                    <h3>{mieleries.name}</h3>
                  </Card.Title>
                  <Card.Text>{mieleries.location}</Card.Text>
                  <Card.Text>{mieleries.rating}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container>
        <h3 className="mb-3">I nostri Salumi...</h3>
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
          Benvenuti nella sezione dedicata agli amanti dei salumi! Qui troverete
          informazioni su salumerie di alta qualità che offrono una vasta
          selezione di salumi italiani. Scoprirete le delizie dei salumi
          tradizionali provenienti da diverse regioni italiane e troverete
          consigli su come apprezzarli al meglio.
        </p>
        <p className="text-center">
          I salumi italiani sono famosi in tutto il mondo per la loro varietà di
          gusti e sapori unici. Che tu preferisca il prosciutto crudo, la coppa,
          o la salame, c'è un salume perfetto per ogni occasione. Con negozi
          specializzati in diverse città italiane, avrete l'opportunità di
          esplorare l'arte dei salumi come mai prima d'ora!
        </p>

        <SalumerieList salumeries={salumeries} />
      </Container>
    </>
  );
};

export default Shop;
