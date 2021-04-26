import React from "react";
import { Link } from "react-router-dom";

import Card from "../../admin/shared/components/UIElements/Card"

const AlumnasTemas = () => {
  return (
    <ul className="inicio-list">
      <li className="inicio-item">
        <Card className="inicio-item__contenido test" style={{padding: "0"}}>
          <Link to={`user/temas`}>Temas</Link>
        </Card>
      </li>
    </ul>
  );
};

export default AlumnasTemas;
