import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import "./AdminModificarAlumna.css";
import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../shared/utils/validators";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";

const ModificarAlumna = () => {
  const { cargando, error, sendRequest, clearError } = useHttpClient();
  const [alumnaCargada, setAlumnaCargada] = useState();
  const alumnaId = useParams().userId;
  const navegacion = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      apellidos: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      contraseña: {
        value: "",
        isValid: false,
      },
      telefono: {
        value: "",
        isValid: false,
      },
      cuerda: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    const fetchAlumna = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/admin/alumnas/${alumnaId}/modificar-alumna`
        );
        setAlumnaCargada(responseData.alumna);
        setFormData(
          {
            name: {
              value: responseData.alumna.name,
              isValid: true,
            },
            apellidos: {
              value: responseData.alumna.apellidos,
              isValid: true,
            },
            email: {
              value: responseData.alumna.email,
              isValid: true,
            },
            contraseña: {
              value: responseData.alumna.contraseña,
              isValid: true,
            },
            telefono: {
              value: responseData.alumna.telefono,
              isValid: true,
            },
            cuerda: {
              value: responseData.alumna.cuerda,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchAlumna();
  }, [sendRequest, alumnaId, setFormData]);

  const modificarAlumnaSubmitHandler = async (event) => {
    console.log("ENVIANDO")
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/admin/alumnas/${alumnaId}/modificar-alumna`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          apellidos: formState.inputs.apellidos.value,
          contraseña: formState.inputs.contraseña.value,
          email: formState.inputs.email.value,
          telefono: formState.inputs.telefono.value,
          cuerda: formState.inputs.cuerda.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      navegacion.push('/alumnas');
    } catch (err) {}
  };

  if (cargando) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!alumnaCargada && !error) {
    return (
      <div className="center">
        <Card>
          <h2>No se ha podido encontrar a esta alumna</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!cargando && alumnaCargada && (
        <form className="form-control" onSubmit={modificarAlumnaSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Nombre"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un nombre"
            onInput={inputHandler}
            initialValue={alumnaCargada.name}
            initialValid={true}
          />
          <Input
            id="apellidos"
            element="input"
            type="text"
            label="Apellidos"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce unos apellidos"
            onInput={inputHandler}
            initialValue={alumnaCargada.apellidos}
            initialValid={true}
          />
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL]}
            errorText="Por favor, introduce un email válido"
            onInput={inputHandler}
            initialValue={alumnaCargada.email}
            initialValid={true}
          />
          <Input
            id="telefono"
            element="input"
            type="text"
            label="Teléfono"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un teléfono"
            onInput={inputHandler}
            initialValue={alumnaCargada.telefono}
            initialValid={true}
          />
          <Input
            id="contraseña"
            element="input"
            type="text"
            label="Contraseña"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce una contraseña"
            onInput={inputHandler}
            initialValue={alumnaCargada.contraseña}
            initialValid={true}
          />
          <Input
            id="cuerda"
            element="input"
            type="text"
            label="Cuerda"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce una cuerda"
            onInput={inputHandler}
            initialValue={alumnaCargada.cuerda}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Aceptar
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default ModificarAlumna;
