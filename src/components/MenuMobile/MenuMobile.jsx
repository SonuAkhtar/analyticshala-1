import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./menuMobile.css";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
  { name: "About Us", to: "/aboutUs", num: "01" },
  { name: "Courses", to: "/courses", num: "02" },
  { name: "Workshops", to: "/workshops", num: "03" },
  { name: "Testimony", to: "/testimony", num: "04" },
  { name: "Contact", contact: true, num: "05" },
];

const MenuMobile = ({ expand, setExpand }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleContact = () => {
    setExpand(false);
    if (location.pathname === "/") {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "#contact" } });
    }
  };

  return (
    <>
      <div
        className={`mob-nav__overlay ${expand ? "mob-nav__overlay--active" : ""}`}
        onClick={() => setExpand(false)}
      />

      <div className={`mob-nav ${expand ? "mob-nav--open" : ""}`}>
        {/* Nav links */}
        <nav className="mob-nav__links">
          {navLinks.map((link, i) =>
            link.contact ? (
              <div
                key={i}
                className="mob-nav__link mob-nav__link--btn"
                role="button"
                tabIndex={0}
                onClick={handleContact}
                onKeyDown={(e) => e.key === "Enter" && handleContact()}
                style={{ "--delay": `${i * 0.12 + 0.05}s` }}
              >
                <span className="mob-nav__num">{link.num}</span>
                <span className="mob-nav__name">{link.name}</span>
                <i className="fas fa-arrow-right mob-nav__arrow" />
              </div>
            ) : (
              <NavLink
                key={i}
                to={link.to}
                className={({ isActive }) =>
                  `mob-nav__link${isActive ? " mob-nav__link--active" : ""}`
                }
                onClick={() => setExpand(false)}
                style={{ "--delay": `${i * 0.12 + 0.05}s` }}
              >
                <span className="mob-nav__num">{link.num}</span>
                <span className="mob-nav__name">{link.name}</span>
                <i className="fas fa-arrow-right mob-nav__arrow" />
              </NavLink>
            ),
          )}
        </nav>

        {/* Footer CTA */}
        <div className="mob-nav__footer">
          <NavLink
            to="/courses"
            className="mob-nav__cta"
            onClick={() => setExpand(false)}
          >
            Enroll Now <i className="fas fa-arrow-right" />
          </NavLink>

          <button className="mob-nav__theme-toggle" onClick={toggleTheme}>
            <i className={theme === "light" ? "fas fa-moon" : "fas fa-sun"} />
            <span>
              {theme === "light"
                ? "Switch to Dark Mode"
                : "Switch to Light Mode"}
            </span>
          </button>

          <p className="mob-nav__tagline">
            India's most hands-on data education
          </p>
        </div>
      </div>
    </>
  );
};

export default MenuMobile;
