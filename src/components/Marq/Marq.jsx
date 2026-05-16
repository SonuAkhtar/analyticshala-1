import Marquee from "react-fast-marquee";
import "./marq.css";

const MarqItem = ({ item }) => (
  <div className="marq__item">
    <div
      className="marq__icon-wrap"
      style={{
        "--brand": item.color,
        background: `${item.color}18`,
      }}
    >
      {item.img ? (
        <img
          src={item.img}
          alt={item.name}
          className={`marq__logo${item.darkLogo ? " marq__logo--dark" : ""}`}
        />
      ) : (
        <i className={item.icon} style={{ color: item.color }} />
      )}
    </div>
    <span className="marq__label">{item.name}</span>
  </div>
);

const Marq = ({ data, dual = false }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className={`marq${dual ? " marq--dual" : ""}`}>
      <Marquee speed={38} pauseOnHover gradient={false}>
        {data.map((item) => (
          <MarqItem key={item.id} item={item} />
        ))}
      </Marquee>
      {dual && (
        <Marquee speed={28} pauseOnHover gradient={false} direction="right">
          {[...data].reverse().map((item) => (
            <MarqItem key={`r-${item.id}`} item={item} />
          ))}
        </Marquee>
      )}
    </div>
  );
};

export default Marq;
