import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function AppNav() {
  const { pathname } = useLocation();

  const user = useSelector((state) => state.userReducer.user);

  const links = [
    { to: `/app/home`, label: "Home" },
    { to: `/app/profile/${user._id}`, label: "Profile" },
    { to: `/app/search`, label: "Search" },
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

export default AppNav;
