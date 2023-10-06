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
  } = useForm();

  const onSubmit = (data) => {
    console.log("hola");
    console.log(data);
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
            <select className="input" {...register("peticionario.tipoId")}>
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
                pattern: {
                  value: /^\d+$/,
                  message: "Por favor, ingresa solo números",
                },
              })}
            />
          </div>

          <div className="input-box">
            <label htmlFor="peticionario.nombre" className="label">
              Nombre
            </label>
            <input
              type="text"
              className="input"
              {...register("peticionario.nombre")}
            />
          </div>

          <div className="input-box">
            <label htmlFor="peticionario.apellido" className="label">
              Apellido(s)
            </label>
            <input
              type="text"
              className="input"
              {...register("peticionario.apellido")}
            />
          </div>

          <div className="input-box">
            <label htmlFor="peticionario.telefono" className="label">
              Telefono
            </label>
            <input
              type="text"
              className="input"
              {...register("peticionario.telefono", {
                pattern: {
                  value: /^\d+$/,
                  message: "Por favor, ingresa solo números",
                },
              })}
            />
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
            <select className="input" {...register("paciente.tipoId")}>
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
                pattern: {
                  value: /^\d+$/,
                  message: "Por favor, ingresa solo números",
                },
              })}
            />
          </div>

          <div className="input-box">
            <label htmlFor="paciente.nombre" className="label">
              Nombre
            </label>
            <input
              type="text"
              className="input"
              {...register("paciente.nombre")}
            />
          </div>

          <div className="input-box">
            <label htmlFor="paciente.apellido" className="label">
              Apellido(s)
            </label>
            <input
              type="text"
              className="input"
              {...register("paciente.apellido")}
            />
          </div>

          <div className="input-box">
            <label htmlFor="paciente.epsId" className="label">
              EPS
            </label>
            <select className="input" {...register("paciente.epsId", {})}>
              <option value=""></option>
              {eps.map(({ id, nombre }) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="paciente.regimenId" className="label">
              Regimen
            </label>
            <select className="input" {...register("paciente.regimenId", {})}>
              <option value=""></option>
              {regimenes.map(({ id, nombre }) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="paciente.departamentoId" className="label">
              Departamento:{" "}
            </label>
            <select
              className="input"
              {...register("paciente.departamentoId", {})}
              onChange={(e) => setDepartamentoSelected(e.target.value)}
            >
              <option value=""></option>
              {departamentos.map(({ id, nombre }) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="paciente.municipioId" className="label">
              Municipio
            </label>
            <select className="input" {...register("paciente.municipioId", {})}>
              <option value=""></option>
              {municipios.map(({ id, nombre }) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
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
