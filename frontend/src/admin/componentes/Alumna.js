import React, { useCallback, useReducer } from "react";
import { useHistory } from "react-router-dom";

import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../shared/components/FormElements/ImageUpload"
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../shared/utils/validators";
import { useHttpClient } from "../../hooks/http-hook";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const Alumna = () => {
  const { cargando, error, sendRequest, clearError } = useHttpClient();

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const navegacion = useHistory();

  const alumnaSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/admin//nueva-alumna",
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          apellidos: formState.inputs.apellidos.value,
          telefono: formState.inputs.telefono.value,
          email: formState.inputs.email.value,
          contraseña: formState.inputs.password.value,
          cuerda: formState.inputs.cuerda.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      navegacion.push('/alumnas')
    } catch (err) {}
  };

  const errorHandler = () => {
    clearError();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="form-control">
        {cargando && <LoadingSpinner asOverlay />}
        <h2>Introduce los datos de la nueva alumna</h2>
        <hr />
        <form onSubmit={alumnaSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            placeholder="Nombre de la alumna"
            errorText="Por favor, introduce un nombre"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          ></Input>
          <ImageUpload center id="image" onInput={inputHandler} />
          <Input
            id="apellidos"
            element="input"
            type="text"
            placeholder="Apellidos de la alumna"
            errorText="Por favor, introduce unos apellidos"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          ></Input>
          <Input
            id="email"
            element="input"
            type="email"
            placeholder="Email"
            errorText="Por favor, introduce un email válido"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          ></Input>
          <Input
            id="telefono"
            element="input"
            type="text"
            placeholder="Teléfono"
            errorText="Por favor, introduce un número de teléfono"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          ></Input>
          <Input
            id="password"
            element="input"
            type="password"
            placeholder="Contraseña"
            errorText="Por favor, introduce una contraseña"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          ></Input>
          <Input
            id="cuerda"
            element="input"
            type="text"
            placeholder="Cuerda"
            errorText="Por favor, introduce una cuerda"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          ></Input>
          <Button type="submit" inverse disabled={!formState.isValid}>
            Aceptar
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Alumna;
