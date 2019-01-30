import React from "react";
import Link from "react-router-dom/Link";

const MainMenu = () => {
  return (
    <div className="main-menu">
      <Link to="/">Formulaire</Link>
      <Link to="/prompter">Prompter</Link>
    </div>
  );
};

export default MainMenu;
