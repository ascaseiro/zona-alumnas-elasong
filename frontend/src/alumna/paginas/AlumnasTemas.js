import React, { useEffect, useState } from "react";

import ListaTemas from '../componentes/ListaTemas'
import ErrorModal from "../../admin/shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../admin/shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";

const AlumnasTemas = () => {
  const { cargando, error, sendRequest, clearError } = useHttpClient();
  const [TemasCargados, setTemasCargados] = useState();

  useEffect(() => {
    const fetchTemas = async () => {
      try {
        const responseData = await sendRequest(
          "http://206.189.105.11:5000/admin/temas"
        );

        setTemasCargados(responseData.temas);
      } catch (err) {}
    };
    fetchTemas();
  }, [sendRequest]);

  const errorHandler = () => {
    clearError();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {cargando && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!cargando && TemasCargados && <ListaTemas items={TemasCargados} />}
    </React.Fragment>
  );
};

export default AlumnasTemas;