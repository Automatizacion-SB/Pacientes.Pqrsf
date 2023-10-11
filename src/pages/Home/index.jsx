import { Layout } from "../../components/Layout";

import logo from "../../assets/logos/logo.jpg";

import document from "../../assets/icons/document.svg";
import danger from "../../assets/icons/danger-circle.svg";
// import danger from "../../assets/icons/danger-circle.svg";
import goodJob from "../../assets/icons/like.svg";
import bomb from "../../assets/icons/bomb-emoji.svg";
import sadCircle from "../../assets/icons/sad-circle.svg";

import "./style.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Layout>
      <div className="home">
        <img src={logo} alt="" className="logo" />
        <h1 className="title">Te escuchamos</h1>

        <p className="subtitle">
          Escribe aquí felicitaciones, quejas, reclamo, sugerencias o
          felicitaciones para el Hospital Infantil Santa Ana en aras de mejorar
          el servicio al usuario estableciendo el procedimiento a seguir para la
          atención y respuesta a las peticiones, quejas, reclamos, solicitudes y
          felicitaciones que le sean interpuestas o presentadas
        </p>

        <div className="details-group">
          <article className="detail">
            <img src={document} alt="" className="detail__logo" />
            <p className="detail__text">
              <span>Petición:</span> Solicitud a través de la cual una persona
              por motivos de interés general o particular solicita la
              intervención del hospital para la resolución de una situación, la
              prestación de un servicio, la información o requerimiento de copia
              de documentos, entre otros.
              {
                <Link reloadDocument to="/send-peticion">
                  {" "}
                  Redactar aquí
                </Link>
              }
            </p>
          </article>

          <article className="detail">
            <img src={danger} alt="" className="detail__logo" />
            <p className="detail__text">
              <span>Queja:</span> Manifestación de una persona, a través de la
              cual expresa inconformidad con el actuar del hospital.
              {
                <Link reloadDocument to="/send-peticion">
                  {" "}
                  Redactar aquí
                </Link>
              }
            </p>
          </article>

          <article className="detail">
            <img src={sadCircle} alt="" className="detail__logo" />
            <p className="detail__text">
              <span>Reclamo:</span> Solicitud a través de la cual los usuarios
              del hospital dan a conocer su insatisfacción con la prestación del
              servicio de salud por parte del personal hospitalario o solicita
              el reconocimiento del derecho fundamental a la salud.
              {
                <Link reloadDocument to="/send-peticion">
                  {" "}
                  Redactar aquí
                </Link>
              }
            </p>
          </article>

          <article className="detail">
            <img src={bomb} alt="" className="detail__logo" />
            <p className="detail__text">
              <span>Sugerencia:</span> Es un consejo, recomendación o
              insinuación que formula una persona para el mejoramiento de las
              funciones y servicios ofrecidos por la Institución, así como
              propuestas para mejorar procedimientos internos y en algunos casos
              racionalizar el empleo de los recursos disponibles y hacer más
              participativa la gestión.{" "}
              {
                <Link reloadDocument to="/send-peticion">
                  {" "}
                  Redactar aquí
                </Link>
              }
            </p>
          </article>

          <article className="detail">
            <img src={goodJob} alt="" className="detail__logo" />
            <p className="detail__text">
              <span>Felicitación:</span> Es la manifestación que expresa el
              agrado o satisfacción que experimenta un usuario con un empleado,
              dependencia o con el proceso que genera la prestación de un
              servicio.{" "}
              {
                <Link reloadDocument to="/send-peticion">
                  {" "}
                  Redactar aquí
                </Link>
              }
            </p>
          </article>
        </div>

        <div className="flex-group">
          <Link to reloadDocument="/send-peticion">
            <button className="button">Redactar PQRSF</button>
          </Link>
          <Link to reloadDocument="./search-peticion">
            <button className="button">Consultar PQRSF</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export { Home };
