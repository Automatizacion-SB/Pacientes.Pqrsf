/* eslint-disable react/prop-types */
import { useContext } from "react";
import "./style.css";
import { PeticionContext } from "../../Context";
import { Link } from "react-router-dom";

function PeticionSearch({ data }) {
  const { id, fechaRecepcion: isoDate, estado } = data;
  const { id: estadoId, nombre: estadoPeticion } = estado;

  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0");

  const fechaRecepcion = `${month}/${day}/${year}`;

  const context = useContext(PeticionContext);

  const status = {
    1: " status-not-started",
    2: "status-in-progress",
    3: "status-in-progress",
    4: "status-in-progress",
    5: "status-done",
    6: "status-refused",
  };
  return (
    <div className="container">
      <div className={`${context.isPeticionDetailOpen ? "" : "hidden"}  card`}>
        <h2>Peticion con identificador {id}</h2>
        <p className="card__text">fecha de envió: {fechaRecepcion}</p>
        <div className="">
          <p className="card__text">estado de la peticion</p>
          <span className={`status ${status[estadoId]} `}>
            {estadoPeticion}
          </span>
        </div>
        <Link to="/">
          <button className="button">Regresar a inicio</button>
        </Link>
      </div>
    </div>
  );
}

export { PeticionSearch };
