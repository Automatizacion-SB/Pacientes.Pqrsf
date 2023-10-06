/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";

import { Layout } from "../../components/Layout";

import "./style.css";

function SendPeticion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // TODO
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
          <select className="input" {...register("tipoPeticionId")}>
            <option value=""></option>
          </select>
        </div>

        <h2 className="section__title">Información peticionario</h2>
        <div className="section">
          <div className="input-box">
            <label htmlFor="peticionario.tipId" className="label">
              Tipo de documento
            </label>
            <select className="input" {...register("peticionario.tipoId")}>
              <option value=""></option>
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
              <option value="op1"></option>
              <option value="op2"></option>
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
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="paciente.regimenId" className="label">
              Regimen
            </label>
            <select className="input" {...register("paciente.regimenId", {})}>
              <option value=""></option>
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="paciente.departamentoId" className="label">
              Departamento
            </label>
            <select
              className="input"
              {...register("paciente.departamentoId", {})}
            >
              <option value=""></option>
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="paciente.municipioId" className="label">
              Municipio
            </label>
            <select className="input" {...register("paciente.municipioId", {})}>
              <option value=""></option>
            </select>
          </div>
        </div>

        <h2 className="section__title">Información de la petición</h2>
        <div className="section">
          <div className="input-box">
            <label htmlFor="areaId" className="label">
              Area
            </label>
            <select className="input" {...register("areaId", {})}>
              <option value=""></option>
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="servicioId" className="label">
              Servicio
            </label>
            <select className="input" {...register("servicioId", {})}>
              <option value=""></option>
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="dirigidaA" className="label">
              Dirigida A
            </label>
            <input type="text" className="input" {...register("dirigidaA")} />
          </div>

          <div className="input-box__all">
            <label htmlFor="motivo" className="label">
              Motivo
            </label>
            <textarea
              cols="30"
              rows="10"
              className="input"
              {...register("motivo")}
            ></textarea>
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
