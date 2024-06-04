import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className=" text-fuchsia-300 flex flex-row shadow-xl justify-between items-center w-full h-16 px-5 bg-fuchsia-900">
      <div>Logo</div>
      <div className="flex flex-row gap-5">
        <Link to="/">Accueil</Link>
      </div>
    </div>
  );
}
