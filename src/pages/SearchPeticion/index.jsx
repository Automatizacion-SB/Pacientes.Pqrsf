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
        <div className="container-send">
          <h1>Consultar PQRSF</h1>
          <p>Diligencie el numero de radicado de la peticion</p>
          <input
            type="text"
            className="input"
            onChange={(e) => setRadicado(e.target.value)}
          />
          <button
            onClick={async () => {
              await searchPQRSF();
              context.openPeticionDetail();
            }}
          >
            Consultar
          </button>
        </div>
        <p>{radicado}</p>

        <PeticionSearch data={peticion} />
      </div>
    </Layout>
  );
}

export { SearchPeticion };
