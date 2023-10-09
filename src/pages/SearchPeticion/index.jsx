import { useState } from "react";

import { Layout } from "../../components/Layout";
import { PeticionSearch } from "../../components/PeticionSearch";

import "./style.css";

function fetchPeticion(value) {
  alert(value);
  return value;
}

function SearchPeticion() {
  const [radicado, setRadicado] = useState("");

  return (
    <Layout>
      <div className="container">
        <div className="container-send">
          <h1>Consultar PQRSF</h1>
          <p>Digite el numero de radicado de la peticion</p>
          <input
            type="text"
            className="input"
            onChange={(e) => setRadicado(e.target.value)}
          />
          <button onClick={fetchPeticion}>Consultar</button>
        </div>
        <p>{radicado}</p>

        <PeticionSearch />
      </div>
    </Layout>
  );
}

export { SearchPeticion };
