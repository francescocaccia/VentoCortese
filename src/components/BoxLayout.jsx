import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
function BoxLayout() {
  const [appartamentini, setAppartamentini] = useState([]);
  const colorClasses = ["color-1", "color-2", "color-3", "color-4", "color-5"];
  useEffect(() => {
    AOS.init({
      duration: 2000, // Durata dell'animazione
      once: false, // Se vuoi che l'animazione si verifichi una sola volta
    });
    fetch("http://localhost:8080/appartamentini/all")
      .then((response) => response.json())
      .then((data) => {
        setAppartamentini(data);
      })

      .catch((err) => {});
  }, []);

  return (
    <>
      <h3 className="text-center mt-5">
        vieni a scoprire le nostre soluzioni con i nostri accoglienti
        appartamenti
      </h3>
      <Container className="box-container mt-2 ">
        <div className="grid">
          {appartamentini.map((appartamento, index) => (
            <div
              className={`${colorClasses[index % colorClasses.length]}`}
              key={index}
              data-aos="fade-up" // Animazione di esempio: "fade-up"
              data-aos-delay={`${index * 100}`} // Questo aggiunge un ritardo incrementale per ogni elemento
            >
              <img
                className="rectangle-image"
                src={appartamento.immagini[0].immagine1}
                alt={appartamento.nome}
              />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default BoxLayout;
