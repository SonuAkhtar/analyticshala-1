import "./trustedBy.css";

const employers = [
  "TCS", "Deloitte", "Accenture", "Wipro",
  "Infosys", "Amazon", "Genpact", "EY",
];

const TrustedBy = () => (
  <div className="trusted-by">
    <div className="container trusted-by__inner">
      <span className="trusted-by__label">Our alumni work at</span>
      <div className="trusted-by__list">
        {employers.map((name) => (
          <span key={name} className="trusted-by__item">{name}</span>
        ))}
      </div>
    </div>
  </div>
);

export default TrustedBy;
