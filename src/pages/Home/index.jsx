import { Layout } from "../../components/Layout";

import "./style.css";

function Home() {
  return (
    <Layout>
      <div className="home">
        <img
          src="https://www.socialancer.com/wp-content/uploads/2022/03/logos-para-empresas.png"
          alt=""
          className="logo"
        />
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
            <img
              src="https://www.svgrepo.com/show/478992/good-job-hand.svg"
              alt=""
              className="detail__logo"
            />
            <p className="detail__text">
              <span>Petición:</span> Solicitud a través de la cual una persona
              por motivos de interés general o particular solicita la
              intervención del hospital para la resolución de una situación, la
              prestación de un servicio, la información o requerimiento de copia
              de documentos, entre otros.
            </p>
          </article>

          <article className="detail">
            <img
              src="https://www.svgrepo.com/show/478992/good-job-hand.svg"
              alt=""
              className="detail__logo"
            />
            <p className="detail__text">
              <span>Queja:</span> Manifestación de una persona, a través de la
              cual expresa inconformidad con el actuar del hospital.
            </p>
          </article>

          <article className="detail">
            <img
              src="https://www.svgrepo.com/show/478992/good-job-hand.svg"
              alt=""
              className="detail__logo"
            />
            <p className="detail__text">
              <span>Reclamo:</span> Solicitud a través de la cual los usuarios
              del hospital dan a conocer su insatisfacción con la prestación del
              servicio de salud por parte del personal hospitalario o solicita
              el reconocimiento del derecho fundamental a la salud.
            </p>
          </article>

          <article className="detail">
            <img
              src="https://www.svgrepo.com/show/478992/good-job-hand.svg"
              alt=""
              className="detail__logo"
            />
            <p className="detail__text">
              <span>Sugerencia:</span> Es un consejo, recomendación o
              insinuación que formula una persona para el mejoramiento de las
              funciones y servicios ofrecidos por la Institución, así como
              propuestas para mejorar procedimientos internos y en algunos casos
              racionalizar el empleo de los recursos disponibles y hacer más
              participativa la gestión.
            </p>
          </article>

          <article className="detail">
            <img
              src="https://www.svgrepo.com/show/478992/good-job-hand.svg"
              alt=""
              className="detail__logo"
            />
            <p className="detail__text">
              <span>Felicitación:</span> Es la manifestación que expresa el
              agrado o satisfacción que experimenta un usuario con un empleado,
              dependencia o con el proceso que genera la prestación de un
              servicio. Consultar solicitud Enviar solicitud
            </p>
          </article>
        </div>

        <div className="flex-group">
          <a href="./send-peticion" className="button">
            Redactar PQRSF
          </a>
          <a href="./search-peticion" className="button">
            Consultar PQRSF
          </a>
        </div>
      </div>
    </Layout>
  );
}

export { Home };
