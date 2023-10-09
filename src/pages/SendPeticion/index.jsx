import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { Layout } from "../../components/Layout";

import "./style.css";

function SendPeticion() {
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
    formState: { errors },
    reset,
  } = useForm();

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
      .then(() => {
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
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
            {...register("tipoPeticionId", {
              required: {
                value: true,
                message: "campo obligatorio",
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
              {...register("peticionario.tipoId", {
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
              {...register("peticionario.id", {
                required: {
                  value: isRequiredPeticionario,
                  message: "campo requerido",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Por favor, ingresa solo números",
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
              {...register("peticionario.nombre", {
                required: {
                  value: isRequiredPeticionario,
                  message: "campo requerido",
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
              {...register("peticionario.apellido", {
                required: {
                  value: isRequiredPeticionario,
                  message: "campo requerido",
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
              {...register("peticionario.telefono", {
                required: {
                  value: isRequiredPeticionario,
                  message: "campo requerido",
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
              {...register("peticionario.email", {
                pattern: {
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
              {...register("paciente.tipoId", {
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
              {...register("paciente.id", {
                required: {
                  value: isRequiredPaciente,
                  message: "campo requerido",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Por favor, ingresa solo números",
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
              {...register("paciente.nombre", {
                required: {
                  value: isRequiredPaciente,
                  message: "campo requerido",
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
              {...register("paciente.apellido", {
                required: {
                  value: isRequiredPaciente,
                  message: "campo requerido",
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
              {...register("paciente.epsId", {
                required: {
                  value: isRequiredPaciente,
                  message: "campo requerido",
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
              className="input"
              {...register("paciente.regimenId", {
                required: {
                  value: isRequiredPaciente,
                  message: "campo requerido",
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
              {...register("paciente.departamentoId", {
                required: {
                  value: isRequiredPaciente,
                  message: "campo requerido",
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
              {...register("paciente.municipioId", {
                required: {
                  value: isRequiredPaciente,
                  message: "campo requerido",
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
              {...register("areaId", {
                required: {
                  value: true,
                  message: "campo requerido",
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
              {...register("servicioId", {
                required: {
                  value: true,
                  message: "campo requerido",
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
              {...register("dirigidaA", {
                required: {
                  value: true,
                  message: "campo obligatorio",
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
              {...register("motivo", {
                required: {
                  value: true,
                  message: "campo requerido",
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
    </Layout>
  );
}

export { SendPeticion };
