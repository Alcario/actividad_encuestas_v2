import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CrearEncuestaBasica = ({ agregarEncuesta }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [preguntas, setPreguntas] = useState([]);

  const agregarPregunta = () => {
    setPreguntas([...preguntas, { pregunta: "", opciones: [{ texto: "" }] }]);
  };

  const agregarRespuesta = (preguntaIndex) => {
    const newPreguntas = [...preguntas];
    newPreguntas[preguntaIndex].opciones.push({ texto: "" });
    setPreguntas(newPreguntas);
  };

  const eliminarPregunta = (preguntaIndex) => {
    const newPreguntas = [...preguntas];
    newPreguntas.splice(preguntaIndex, 1);
    setPreguntas(newPreguntas);
  };

  const eliminarRespuesta = (preguntaIndex, respuestaIndex) => {
    const newPreguntas = [...preguntas];
    newPreguntas[preguntaIndex].opciones.splice(respuestaIndex, 1);
    setPreguntas(newPreguntas);
  };

  const onSubmit = () => {
    const nuevasPreguntas = preguntas.length > 0 ? preguntas : [];
    const nuevaEncuesta = {
      titulo,
      descripcion,
      preguntas: nuevasPreguntas,
    };
    agregarEncuesta(nuevaEncuesta);
    navigate("/");
  };

  return (
    <div className="form-card">
      <h1>Crear Nueva Encuesta</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="titulo">Título:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        {errors.titulo && <p>{errors.titulo.message}</p>}
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        {errors.descripcion && <p>{errors.descripcion.message}</p>}

        {preguntas.map((pregunta, preguntaIndex) => (
          <div key={preguntaIndex}>
            <hr />
            <div class="containerPreguntas">
              <label
                htmlFor={`preguntas[${preguntaIndex}].pregunta`}
                className="pregunta-label item-left"
              >
                Pregunta {preguntaIndex + 1}:
              </label>
              {/* Botón para eliminar la pregunta */}
              <button
                type="button"
                className="eliminarPregunta item-right"
                onClick={() => eliminarPregunta(preguntaIndex)}
              >
                Eliminar Pregunta
              </button>
            </div>
            <input
              type="text"
              id={`preguntas[${preguntaIndex}].pregunta`}
              className="txtPregunta"
              value={pregunta.pregunta}
              onChange={(e) => {
                const newPreguntas = [...preguntas];
                newPreguntas[preguntaIndex].pregunta = e.target.value;
                setPreguntas(newPreguntas);
              }}
            />
            {/* Respuestas */}
            {pregunta.opciones &&
              pregunta.opciones.map((opcion, respuestaIndex) => (
                <div key={respuestaIndex} className="form-group">
                  <label htmlFor={`respuestas[${respuestaIndex}].respuesta`}>
                    Respuesta {respuestaIndex + 1}:
                  </label>
                  <input
                    type="text"
                    id={`respuestas[${respuestaIndex}].respuesta`}
                    className="txtRespuesta"
                    value={opcion.texto}
                    onChange={(e) => {
                      const newPreguntas = [...preguntas];
                      newPreguntas[preguntaIndex].opciones[
                        respuestaIndex
                      ].texto = e.target.value;
                      setPreguntas(newPreguntas);
                    }}
                  />
                  <button
                    type="button"
                    className="eliminarRepuesta"
                    onClick={() =>
                      eliminarRespuesta(preguntaIndex, respuestaIndex)
                    }
                  >
                    Eliminar Respuesta
                  </button>
                </div>
              ))}

            {/* Botón para agregar respuesta a la pregunta */}
            <button
              type="button"
              className="agregarRespuesta"
              onClick={() => agregarRespuesta(preguntaIndex)}
            >
              Agregar Respuesta
            </button>
          </div>
        ))}
        <div className="containerBotones">
          {/* Agregar pregunta */}
          <button
            type="button"
            onClick={agregarPregunta}
            className="agregarPregunta"
          >
            Agregar Pregunta
          </button>

          <button type="submit" className="guardarEncuesta">
            Guardar Encuesta
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearEncuestaBasica;
