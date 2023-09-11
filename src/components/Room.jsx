import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

const Room = () => {
  return (
    <>
      <h3 className="text-center mt-5">Dimore Cortesi</h3>
      <Container>
        <div className="room-container">
          <div className="room-card">
            <h2 className="text-center">DolceBrezza</h2>
            <Carousel className="mt-3">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.hotelmozart.com/data/1024/Hotel-Mozart-Roma-Foto-Camere-2022-Vivaldi-Camera-Elegance-2.jpg"
                  alt="camera1"
                />
                <Carousel.Caption>
                  <h3>Prima diapositiva</h3>
                  <p>Descrizione della prima diapositiva.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.febalcasa.com/wp-content/uploads/2022/08/FEBAL-NOTTE-PAG-010-011-1080x648.jpg"
                  alt="camera1"
                />
                <Carousel.Caption>
                  <h3>Prima diapositiva</h3>
                  <p>Descrizione della prima diapositiva.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.febalcasa.com/wp-content/uploads/2020/06/FEBAL-NOTTE-PAG-032-033-1080x648.jpg"
                  alt="camera1"
                />
                <Carousel.Caption>
                  <h3>Prima diapositiva</h3>
                  <p>Descrizione della prima diapositiva.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="room-card">
            <h2 className="text-center">SussurriVenti</h2>
            <Carousel className="mt-3">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="data:image/jpeg;base64,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"
                  alt="camera2"
                />
                <Carousel.Caption>
                  <h3>Prima diapositiva</h3>
                  <p>Descrizione della prima diapositiva.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.grazia.it/content/uploads/2018/03/cover-camera-da-letto-affitto-mobile-800x600.jpg"
                  alt="camera2"
                />
                <Carousel.Caption>
                  <h3>Prima diapositiva</h3>
                  <p>Descrizione della prima diapositiva.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.irenepeainterior.it/wp-content/uploads/2022/03/Illuminazioni-camera-da-letto-idee-originali-e-funzionali-sospensioni-e-faretti-incassati-min.jpg"
                  alt="camera2"
                />
                <Carousel.Caption>
                  <h3>Prima diapositiva</h3>
                  <p>Descrizione della prima diapositiva.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="room-card">
            <h2 className="text-center">AriaAurora</h2>
            <Carousel className="mt-3">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://mondodesign.it/wp-content/uploads/2017/08/Camera-Da-Letto-Legno.jpg"
                  alt="camera3"
                />
                <Carousel.Caption>
                  <h3>Prima diapositiva</h3>
                  <p>Descrizione della prima diapositiva.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="data:image/jpeg;base64,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"
                  alt="camera3"
                />
                <Carousel.Caption>
                  <h3>Prima diapositiva</h3>
                  <p>Descrizione della prima diapositiva.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.instapro.it/images/cms/original/83734a3f-c241-4d69-8a4f-2277a60e0fbb.jpeg"
                  alt="camera3"
                />
                <Carousel.Caption>
                  <h3>Prima diapositiva</h3>
                  <p>Descrizione della prima diapositiva.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="room-card">
            <h2 className="text-center">CantoVento</h2>
            <Carousel className="mt-3">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.hotelmozart.com/data/1024/Hotel-Mozart-Roma-Foto-Camere-2022-Vivaldi-Camera-Elegance-2.jpg"
                  alt="camera1"
                />
                <Carousel.Caption>
                  <h3>Prima diapositiva</h3>
                  <p>Descrizione della prima diapositiva.</p>
                </Carousel.Caption>
              </Carousel.Item>
              {/* Aggiungi ulteriori diapositive qui */}
            </Carousel>
          </div>
        </div>

        <div className="price-list">
          <h3 className="text-center mt-5">Listino Prezzi</h3>
          <div className="price-item">
            <h4>Camera Singola</h4>
            <p>Prezzo a notte: $100</p>
          </div>
          <div className="price-item">
            <h4>Camera Doppia</h4>
            <p>Prezzo a notte: $150</p>
          </div>
          <div className="price-item">
            <h4>Suite Deluxe</h4>
            <p>Prezzo a notte: $250</p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Room;
