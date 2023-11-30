import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function MainNav() {
  const { pathname } = useLocation();
  const links = [
    { to: "/main/welcome", label: "Welcome" },
    { to: "/main/signin", label: "Sign in" },
    { to: "/main/signup", label: "Sign up" },
  ];
  const active = (path) => (pathname.includes(path) ? "active" : "");
  return (
    <div className="list-group">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`list-group-item ${active(link.to)}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default MainNav;
