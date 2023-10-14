import { useParams, Link } from "react-router-dom";

const Encuesta = ({ listaEncuestas, responderEncuesta }) => {
  const { id } = useParams(); // Obtiene el ID de la encuesta desde la URL
  console.log(listaEncuestas);
  const encuesta = listaEncuestas.find((enc) => enc.id === parseInt(id));
  console.log("Preguntas: " + encuesta?.preguntas); // Usar encuesta?.preguntas para verificar si existe

  return (
    <div>
      <div className="encuesta-item-container">
        <div className="encuesta-item">
          <h2>{encuesta?.titulo}</h2>{" "}
          {/* Usar encuesta?.titulo para verificar si existe */}
          <p>{encuesta?.descripcion}</p>{" "}
          {/* Usar encuesta?.descripcion para verificar si existe */}
          <br />
        </div>
      </div>
      <div className="encuesta-item-container">
        <div className="encuesta-item">
          <h2>Preguntas</h2>
          <p>
            {!encuesta?.preguntas && <p>Sin preguntas definidas.</p>}
            {encuesta?.preguntas &&
              encuesta.preguntas.map((pregunta) => (
                <div key={pregunta.id}>
                  <p>{pregunta.pregunta}</p>
                  <ol>
                    {pregunta.opciones.map((opcion) => (
                      <div key={opcion.id}>
                        <label>
                          <li>{opcion.texto}</li>
                        </label>
                      </div>
                    ))}
                  </ol>
                </div>
              ))}
          </p>
          <br />
        </div>
      </div>
      <Link to="/">Volver</Link>
    </div>
  );
};

export default Encuesta;
