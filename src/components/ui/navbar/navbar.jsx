import { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    setUser(savedUser ? JSON.parse(savedUser) : null);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const loggedIn = Boolean(localStorage.getItem("token"));

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Iron Heroes
        </Link>
        <div className="navbar-nav me-auto">
          <NavLink className="nav-link" to="/heroes">
            <i className="fa fa-users" aria-hidden="true"></i> Heroes
          </NavLink>
        </div>
        <div className="navbar-nav align-items-center gap-2">
          {loggedIn ? (
            <>
              <span className="nav-link disabled">
                Hola, {user?.name || user?.username}
              </span>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
