import { Link } from "react-router-dom";
import "./breadcrumb.css";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="breadcrumb__inner">
        <Link to="/" className="breadcrumb__home" aria-label="Home">
          <i className="fas fa-home" />
        </Link>
        {items.map((item, i) => (
          <span key={i} className="breadcrumb__segment">
            <i className="fas fa-chevron-right breadcrumb__chevron" />
            {item.href ? (
              <Link to={item.href} className="breadcrumb__link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumb__current" aria-current="page">
                {item.label}
              </span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;
