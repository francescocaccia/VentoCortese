import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "aos/dist/aos.css";
import { FaTree, FaSeedling } from "react-icons/fa";
import { GiOlive, GiDandelionFlower } from "react-icons/gi";
import { IoIosFlower } from "react-icons/io";
function BoxLayout() {
  const [appartamentini, setAppartamentini] = useState([]);
  const colorClasses = ["color-1", "color-2", "color-3", "color-4", "color-5"];
  useEffect(() => {
    fetch("http://localhost:8080/appartamentini/all")
      .then((response) => response.json())
      .then((data) => {
        setAppartamentini(data);
      })

      .catch((err) => {});
  }, []);
  const ICON_MAP = {
    Ulivo: <GiOlive />,
    Pino: <FaTree />,
    Menta: <FaSeedling />,
    Rosmarino: <IoIosFlower />,
    Ginestra: <GiDandelionFlower />,
  };
  return (
    <>
      <h3 className="text-center mt-5">
        vieni a scoprire le nostre soluzioni con i nostri accoglienti
        appartamenti
      </h3>
      <Container className="box-container mt-2 ">
        <div className="grid ">
          {appartamentini.map((appartamento, index) => (
            <div
              className={`${colorClasses[index % colorClasses.length]}`}
              key={index}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <div className="d-flex flex-column text-center">
                <span className="mb-3">
                  {appartamento.nome}
                  {ICON_MAP[appartamento.nome]}{" "}
                  {/* Questo visualizzerà l'icona corrispondente al nome dell'appartamento */}
                </span>
                <img
                  className="rectangle-image img-fluid"
                  src={appartamento.immagini[0].immagine1}
                  alt={appartamento.nome}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default BoxLayout;
