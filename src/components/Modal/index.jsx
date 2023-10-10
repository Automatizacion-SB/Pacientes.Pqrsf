import { useContext } from "react";
import "./style.css";
import { PeticionContext } from "../../Context";

// eslint-disable-next-line react/prop-types
function Modal({ data }) {
  // eslint-disable-next-line react/prop-types
  const { id } = data;

  const { isModalOpen } = useContext(PeticionContext);
  return (
    <div className="container">
      <div className={`${isModalOpen ? "" : "hidden"}  card modal`}>
        <h4>
          La Peticion con identificador a sido guardada exitosamente con el
          identificador {id}
        </h4>
        <a href="./" className="button">
          Regresar
        </a>
      </div>
    </div>
  );
}

export { Modal };
