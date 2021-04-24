import React, { useEffect, useState } from "react";

import ListaAlumnas from "../componentes/ListaAlumnas";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../hooks/http-hook";

const AdminAlumnas = () => {
  const { cargando, error, sendRequest, clearError } = useHttpClient();
  const [alumnasCargadas, setAlumnasCargadas] = useState();

  useEffect(() => {
    const fetchAlumnas = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/admin/alumnas"
        );

        setAlumnasCargadas(responseData.alumnas);
      } catch (err) {}
    };
    fetchAlumnas();
  }, [sendRequest]);

  const errorHandler = () => {
    clearError();
  };

  const alumnaBorradaHandler = (alumnaBorradaId) => {
    setAlumnasCargadas((alumnasPrev) =>
      alumnasPrev.filter((alumna) => alumna.id !== alumnaBorradaId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {cargando && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!cargando && alumnasCargadas && (
        <ListaAlumnas
          items={alumnasCargadas}
          onDeleteAlumna={alumnaBorradaHandler}
        />
      )}
    </React.Fragment>
  );
};

export default AdminAlumnas;
