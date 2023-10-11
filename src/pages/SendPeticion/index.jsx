import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";

import { Layout } from "../../components/Layout";

import "./style.css";
import { PeticionContext } from "../../Context";
import { Modal } from "../../components/Modal";

function SendPeticion() {
  const { openModal } = useContext(PeticionContext);

  const URL_API = "http://172.16.1.184:3000/api/v1/";
  const URL_REFERENCIAS = `${URL_API}referencias/`;

  const [tiposPeticion, setTiposPeticion] = useState([]);
  const [tiposIdentificacion, setTiposIdentificacion] = useState([]);
  const [eps, setEps] = useState([]);
  const [regimenes, setRegimenes] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [servicios, setServicios] = useState([]);

  const [departamentoSelected, setDepartamentoSelected] = useState(0);
  const [municipios, setMunicipios] = useState([]);

  const [isRequiredPeticionario, setIsRequiredPeticionario] = useState(false);
  const [isRequiredPaciente, setIsRequiredPaciente] = useState(false);

  useState(null);

  // const mostrarPaciente = () => {
  //   const tipoPeticoin = watch("tipoPeticionId");

  //   if (tipoPeticoin)
  // };
  const [peticion, setPeticion] = useState({});

  const [pacienteRegimenId, setPacienteRegimenId] = useState("");

  useEffect(() => {
    fetch(`${URL_REFERENCIAS}tipos_peticion`)
      .then((response) => response.json())
      .then((data) => setTiposPeticion(data));

    fetch(`${URL_REFERENCIAS}tipos_identificacion`)
      .then((response) => response.json())
      .then((data) => setTiposIdentificacion(data));

    fetch(`${URL_REFERENCIAS}eps`)
      .then((response) => response.json())
      .then((data) => setEps(data));

    fetch(`${URL_REFERENCIAS}regimenes`)
      .then((response) => response.json())
      .then((data) => setRegimenes(data));

    fetch(`${URL_REFERENCIAS}departamentos`)
      .then((response) => response.json())
      .then((data) => setDepartamentos(data));

    fetch(`${URL_REFERENCIAS}areas`)
      .then((response) => response.json())
      .then((data) => setAreas(data));

    fetch(`${URL_REFERENCIAS}servicios`)
      .then((response) => response.json())
      .then((data) => setServicios(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(`${URL_REFERENCIAS}departamentos/${departamentoSelected}/municipios`)
      .then((response) => response.json())
      .then((data) => setMunicipios(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departamentoSelected]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0); // Se desplaza al principio cuando se carga la página
  }, []);

  // Efecto para establecer el valor predeterminado de paciente.regimenId
  useEffect(() => {
    if (watch("paciente.epsId") === "15") {
      setPacienteRegimenId("1"); // Establece el valor predeterminado como 1
    } else {
      setPacienteRegimenId(""); // Restablece el valor predeterminado si no es igual a 1
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("paciente.epsId")]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // Desplazamiento suave
    });
  };

  const onSubmit = (data) => {
    const URL = "http://172.16.1.184:3000/api/v1/pqrsf";

    if (!data.peticionario.id) {
      delete data.peticionario;
    }
    if (!data.paciente.id) {
      delete data.paciente;
    }

    console.log(data);

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setPeticion(data);
        reset();
      })
      .catch((error) => {
        console.error(error);
      });

    openModal();
    setTimeout(scrollToBottom);
  };

  return (
    <Layout>
      <h1 className="title">Redactar una peticion</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="input-box">
          <label htmlFor="tipoPeticionId" className="label">
            Tipo de petición
          </label>
          <select
            className="input"
            id="tipoPeticionId"
            {...register("tipoPeticionId", {
              required: {
                value: true,
                message: "Campo requerido",
              },
            })}
          >
            <option value=""></option>
            {tiposPeticion.map(({ id, nombre }) => (
              <option key={id} value={id}>
                {nombre}
              </option>
            ))}
          </select>
          {errors.tipoPeticionId && (
            <p role="alert" className="alert">
              {errors.tipoPeticionId.message}
            </p>
          )}
        </div>

        <h2 className="section__title">Información peticionario</h2>
        <div className="section">
          <div className="input-box">
            <label htmlFor="peticionario.tipId" className="label">
              Tipo de documento
            </label>
            <select
              className="input"
              id="peticionario.tipoId"
              {...register("peticionario.tipoId", {
                maxLength: {
                  value: 17,
                  message: "Máximo 17 caracteres",
                },
                validate: (value) => {
                  value
                    ? setIsRequiredPeticionario(true)
                    : setIsRequiredPeticionario(false);
                },
              })}
            >
              <option value=""></option>
              {tiposIdentificacion.map(({ id, nombre }) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="peticionario.id" className="label">
              Numero de documento
            </label>
            <input
              type="text"
              className="input"
              id="peticionario.id"
              {...register("peticionario.id", {
                required: {
                  value: isRequiredPeticionario,
                  message: "Campo requerido",
                },
                pattern: {
                  value: /^(\d+|[a-zA-Z0-9]+)$/, // Patrón que permite alfanuméricos
                  message: "Ingresa solo números o caracteres alfanuméricos",
                },
                validate: (value) => {
                  // Validación condicional basada en peticionario.tipoId
                  if (
                    watch("peticionario.tipoId") === "PA" &&
                    !/^[a-zA-Z0-9]+$/.test(value)
                  ) {
                    return "Este campo debe contener solo caracteres alfanuméricos";
                  }
                  return true;
                },
              })}
            />
            {errors.peticionario?.id && (
              <p role="alert" className="alert">
                {errors.peticionario?.id.message}
              </p>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="peticionario.nombre" className="label">
              Nombre
            </label>
            <input
              type="text"
              className="input"
              id="peticionario.nombre"
              {...register("peticionario.nombre", {
                required: {
                  value: isRequiredPeticionario,
                  message: "Campo requerido",
                },
              })}
            />
            {errors.peticionario?.nombre && (
              <p role="alert" className="alert">
                {errors.peticionario?.nombre.message}
              </p>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="peticionario.apellido" className="label">
              Apellido(s)
            </label>
            <input
              type="text"
              className="input"
              id="peticionario.apellido"
              {...register("peticionario.apellido", {
                required: {
                  value: isRequiredPeticionario,
                  message: "Campo requerido",
                },
              })}
            />
            {errors.peticionario?.apellido && (
              <p role="alert" className="alert">
                {errors.peticionario?.apellido.message}
              </p>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="peticionario.telefono" className="label">
              Telefono
            </label>
            <input
              type="text"
              className="input"
              id="peticionario.telefono"
              {...register("peticionario.telefono", {
                minLength: {
                  value: 7,
                  message: "mínimo 7 caracteres",
                },
                maxLength: {
                  value: 10,
                  message: "máximo 10 caracteres",
                },
                required: {
                  value: isRequiredPeticionario,
                  message: "Campo requerido",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Por favor, ingresa solo números",
                },
              })}
            />
            {errors.peticionario?.telefono && (
              <p role="alert" className="alert">
                {errors.peticionario?.telefono.message}
              </p>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="peticionario.email" className="label">
              Correo electrónico
            </label>
            <input
              type="text"
              className="input"
              id="peticionario.email"
              {...register("peticionario.email", {
                pattern: {
                  maxLength: {
                    value: 125,
                    message: "Máximo 125 caracteres",
                  },
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message:
                    "Por favor, ingresa una dirección de correo electrónico válida",
                },
              })}
            />
          </div>
        </div>

        <h2 className="section__title">Información paciente</h2>
        <div className="section">
          <div className="input-box">
            <label htmlFor="paciente.tipoId" className="label">
              Tipo de documento
            </label>
            <select
              className="input"
              id="paciente.tipoId"
              {...register("paciente.tipoId", {
                maxLength: {
                  value: 17,
                  message: "Máximo 17 caracteres",
                },
                validate: (value) => {
                  value
                    ? setIsRequiredPaciente(true)
                    : setIsRequiredPaciente(false);
                },
              })}
            >
              <option value=""></option>
              {tiposIdentificacion.map(({ id, nombre }) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="paciente.id" className="label">
              Numero de documento
            </label>
            <input
              type="text"
              className="input"
              id="paciente.id"
              {...register("paciente.id", {
                required: {
                  value: isRequiredPaciente,
                  message: "Campo requerido",
                },
                pattern: {
                  value: /^(\d+|[a-zA-Z0-9]+)$/, // Patrón que permite alfanuméricos
                  message: "Ingresa solo números o caracteres alfanuméricos",
                },
                validate: (value) => {
                  // Validación condicional basada en paciente.tipoId
                  if (
                    watch("paciente.tipoId") === "PA" &&
                    !/^[a-zA-Z0-9]+$/.test(value)
                  ) {
                    return "Este campo debe contener solo caracteres alfanuméricos";
                  }
                  return true;
                },
              })}
            />
            {errors.paciente?.id && (
              <p role="alert" className="alert">
                {errors.paciente?.id.message}
              </p>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="paciente.nombre" className="label">
              Nombre
            </label>
            <input
              type="text"
              className="input"
              id="paciente.nombre"
              {...register("paciente.nombre", {
                required: {
                  value: isRequiredPaciente,
                  message: "Campo requerido",
                },
              })}
            />
            {errors.paciente?.nombre && (
              <p role="alert" className="alert">
                {errors.paciente?.nombre.message}
              </p>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="paciente.apellido" className="label">
              Apellido(s)
            </label>
            <input
              type="text"
              className="input"
              id="paciente.apellido"
              {...register("paciente.apellido", {
                required: {
                  value: isRequiredPaciente,
                  message: "Campo requerido",
                },
              })}
            />
            {errors.paciente?.apellido && (
              <p role="alert" className="alert">
                {errors.paciente?.apellido.message}
              </p>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="paciente.epsId" className="label">
              EPS
            </label>
            <select
              className="input"
              id="paciente.epsId"
              {...register("paciente.epsId", {
                required: {
                  value: isRequiredPaciente,
                  message: "Campo requerido",
                },
              })}
            >
              <option value=""></option>
              {eps.map(({ id, nombre }) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
            {errors.paciente?.epsId && (
              <p role="alert" className="alert">
                {errors.paciente?.epsId.message}
              </p>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="paciente.regimenId" className="label">
              Regimen
            </label>
            <select
              disabled={pacienteRegimenId == 15}
              value={pacienteRegimenId}
              onChange={(e) => setPacienteRegimenId(e.target.value)}
              className="input"
              id="paciente.regimenId"
              {...register("paciente.regimenId", {
                required: {
                  value: isRequiredPaciente,
                  message: "Campo requerido",
                },
              })}
            >
              <option value=""></option>
              {regimenes.map(({ id, nombre }) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
            {errors.paciente?.regimenId && (
              <p role="alert" className="alert">
                {errors.paciente?.regimenId.message}
              </p>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="paciente.departamentoId" className="label">
              Departamento:{" "}
            </label>
            <select
              className="input"
              id="paciente.departamentoId"
              {...register("paciente.departamentoId", {
                required: {
                  value: isRequiredPaciente,
                  message: "Campo requerido",
                },
              })}
              onChange={(e) => setDepartamentoSelected(e.target.value)}
            >
              <option value=""></option>
              {departamentos.map(({ id, nombre }) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
            {errors.paciente?.departamentoId && (
              <p role="alert" className="alert">
                {errors.paciente?.departamentoId.message}
              </p>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="paciente.municipioId" className="label">
              Municipio
            </label>
            <select
              className="input"
              id="paciente.municipioId"
              {...register("paciente.municipioId", {
                required: {
                  value: isRequiredPaciente,
                  message: "Campo requerido",
                },
              })}
            >
              <option value=""></option>
              {municipios.map(({ id, nombre }) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
            {errors.paciente?.municipioId && (
              <p role="alert" className="alert">
                {errors.paciente?.municipioId.message}
              </p>
            )}
          </div>
        </div>

        <h2 className="section__title">Información de la petición</h2>
        <div className="section">
          <div className="input-box">
            <label htmlFor="areaId" className="label">
              Area
            </label>
            <select
              className="input"
              id="areaId"
              {...register("areaId", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            >
              <option value=""></option>
              {areas.map(({ id, nombre }) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
            {errors.areaId && (
              <p role="alert" className="alert">
                {errors.areaId.message}
              </p>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="servicioId" className="label">
              Servicio
            </label>
            <select
              className="input"
              id="servicioId"
              {...register("servicioId", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            >
              <option value=""></option>
              {servicios.map(({ id, nombre }) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
            {errors.servicioId && (
              <p role="alert" className="alert">
                {errors.servicioId.message}
              </p>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="dirigidaA" className="label">
              Dirigida A
            </label>
            <input
              type="text"
              className="input"
              id="dirigidaA"
              {...register("dirigidaA", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />
            {errors.dirigidaA && (
              <p role="alert" className="alert">
                {errors.dirigidaA.message}
              </p>
            )}
          </div>

          <div className="input-box__all">
            <label htmlFor="motivo" className="label">
              Motivo
            </label>
            <textarea
              cols="30"
              rows="10"
              className="input"
              id="motivo"
              {...register("motivo", {
                minLength: {
                  value: 20,
                  message: "Mínimo 20 caracteres",
                },
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            ></textarea>
            {errors.motivo && (
              <p role="alert" className="alert">
                {errors.motivo.message}
              </p>
            )}
          </div>

          <div className="grid-group">
            <input
              type="submit"
              value="Enviar petición"
              className="form-submit"
            />
          </div>
        </div>
      </form>
      <Modal data={peticion} />
    </Layout>
  );
}

export { SendPeticion };
