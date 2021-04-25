import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./admin/shared/components/Navigation/MainNavigation";
import AdminInicio from "./admin/paginas/AdminInicio";
import AdminAlumnas from "./admin/paginas/AdminAlumnas";
import AdminRecursos from "./admin/paginas/AdminRecursos";
import AdminTemas from "./admin/paginas/AdminTemas";
import NuevaAlumna from "./admin/paginas/NuevaAlumna";
import NuevoTema from "./admin/paginas/NuevoTema";
import AdminModificarAlumna from "./admin/paginas/AdminModificarAlumna";
import AdminModificarTema from "./admin/paginas/AdminModificarTema";
import NuevoRecurso from "./admin/paginas/NuevoRecurso"
import Auth from "./admin/shared/paginas/Auth";
import { AuthContext } from "./admin/shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/admin" exact>
          <AdminInicio />
        </Route>
        <Route path="/alumnas" exact>
          <AdminAlumnas />
        </Route>
        <Route path="/temas" exact>
          <AdminTemas />
        </Route>
        <Route path="/:temaId/recursos" exact>
          <AdminRecursos />
        </Route>
        <Route path="/temas/:temaId/nuevo-recurso" exact>
          <NuevoRecurso />
        </Route>
        <Route path="/nueva-alumna" exact>
          <NuevaAlumna />
        </Route>
        <Route path="/nuevo-tema" exact>
          <NuevoTema />
        </Route>
        <Route path="/alumnas/:userId/modificar-alumna" exact>
          <AdminModificarAlumna />
        </Route>
        <Route path="/temas/:temaId/modificar-tema" exact>
          <AdminModificarTema />
        </Route>
        <Redirect to="/admin" />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Switch>{routes}</Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
