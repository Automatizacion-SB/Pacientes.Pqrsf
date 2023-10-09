import { useContext, useState } from "react";

import { Layout } from "../../components/Layout";
import { PeticionSearch } from "../../components/PeticionSearch";

import "./style.css";
import { PeticionContext } from "../../Context";

function SearchPeticion() {
  const [radicado, setRadicado] = useState("");
  const [peticion, setPeticion] = useState({
    id: "",
    fechaRecepcion: "",
    estado: {
      nombre: "sin gestionar",
    },
  });
  const context = useContext(PeticionContext);

  const searchPQRSF = () => {
    const URL = "http://172.16.1.184:3000/api/v1/pqrsf";
    fetch(`${URL}/${radicado}`)
      .then((response) => response.json())
      .then((data) => setPeticion(data));
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Consultar PQRSF</h1>
        <p>Diligencie el numero de radicado de la peticion</p>
        <input
          type="text"
          className="input"
          placeholder="Ingrese el identificador de la petición"
          onChange={(e) => setRadicado(e.target.value)}
        />
        <button
          className="button"
          onClick={async () => {
            searchPQRSF();
            context.openPeticionDetail();
          }}
        >
          Consultar
        </button>
      </div>

      <PeticionSearch data={peticion} />
    </Layout>
  );
}

export { SearchPeticion };
