import React from "react";
import { Link } from "react-router-dom";

import "./AdminInicio.css";
import Card from "../shared/components/UIElements/Card";

const AdminInicio = () => {
  return (
    <ul className="inicio-list">
      <li className="inicio-item">
        <Card className="inicio-item__contenido" style={{padding: "0"}}>
          <Link to={`alumnas`}>Alumnas</Link>
        </Card>
      </li>
      <li className="inicio-item">
        <Card className="inicio-item__contenido test" style={{padding: "0"}}>
          <Link to={`temas`}>Temas</Link>
        </Card>
      </li>
    </ul>
  );
};

export default AdminInicio;
