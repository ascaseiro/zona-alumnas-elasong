import React, { useCallback, useReducer, useContext } from "react";

import "./Auth.css";
import Card from "../components/UIElements/Card";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../utils/validators";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import Input from "../components/FormElements/Input";
import Button from "../components/FormElements/Button";
import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../context/auth-context";

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

const Auth = () => {
  const auth = useContext(AuthContext);
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

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://206.189.105.11:5000/api/login",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          contraseña: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login();
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
        <h2>Identifícate para acceder CAMBIADO</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
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
            id="password"
            element="input"
            type="password"
            placeholder="Contraseña"
            errorText="Por favor, introduce tu contraseña"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          ></Input>
          <div className="center">
            <Button type="submit" inverse disabled={!formState.isValid}>
              Aceptar
            </Button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
