import "./style.css";

function PeticionSearch() {
  return (
    <div className="container-2">
      <div className="card">
        <h2>Peticion con identificador 1</h2>
        <p>fecha de envió</p>
        <p>
          estado de la peticion<span>sin procesar</span>
        </p>
        <button className="button">Regresar</button>
      </div>
    </div>
  );
}

export { PeticionSearch };
