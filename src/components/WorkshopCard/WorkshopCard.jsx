import { Link } from "react-router-dom";
import "./workshopCard.css";

const WorkshopCard = (props) => {
  const {
    id,
    type,
    image,
    title,
    desc,
    category,
    categoryColor,
    level,
    tags,
    date,
    time,
    duration,
    eventMode,
    instructor,
    seatsLeft,
    totalSeats,
    price,
    originalPrice,
    attendees,
    rating,
  } = props;

  const seatsUrgent = seatsLeft != null && seatsLeft <= 5;
  const seatFillPct =
    seatsLeft != null && totalSeats
      ? Math.round(((totalSeats - seatsLeft) / totalSeats) * 100)
      : null;

  if (type === "previous") {
    return (
      <div className="workshop-card workshop-card--previous">
        <div className="workshop-card__img">
          <img src={image} alt={title} loading="lazy" />
          <div className="workshop-card__img-overlay" />
          {category && (
            <span
              className="workshop-card__cat-badge"
              style={{ "--cc": categoryColor || "var(--accent-indigo)" }}
            >
              {category}
            </span>
          )}
        </div>
        <div className="workshop-card__body">
          <h4 className="workshop-card__title">{title}</h4>
          <div className="workshop-card__meta">
            <span>
              <i className="fas fa-calendar-alt" /> {date}
            </span>
            {duration && (
              <span>
                <i className="fas fa-clock" /> {duration}
              </span>
            )}
          </div>
          <div className="workshop-card__footer">
            <div className="workshop-card__mode-row">
              {eventMode &&
                eventMode.map((m, i) => (
                  <span key={i} className="workshop-card__mode-badge">
                    {m}
                  </span>
                ))}
            </div>
            <div className="workshop-card__stats">
              {attendees && (
                <span className="workshop-card__stat">
                  <i className="fas fa-users" /> {attendees}
                </span>
              )}
              {rating && (
                <span className="workshop-card__stat workshop-card__stat--rating">
                  <i className="fas fa-star" /> {rating}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="workshop-card">
      <div className="workshop-card__img-wrap">
        <img src={image} alt={title} loading="lazy" />

        <div className="workshop-card__img-badges">
          {category && (
            <span
              className="workshop-card__cat-badge"
              style={{ "--cc": categoryColor || "var(--accent-indigo)" }}
            >
              {category}
            </span>
          )}
          {level && (
            <span className={`workshop-card__level-badge workshop-card__level-badge--${level.toLowerCase().replace(" ", "-")}`}>
              {level}
            </span>
          )}
        </div>

        {seatsUrgent && (
          <div className="workshop-card__urgency-banner">
            <i className="fas fa-fire" /> Only {seatsLeft} seats left!
          </div>
        )}
      </div>

      <div className="workshop-card__body">
        <h3 className="workshop-card__title">{title}</h3>

        {desc && <p className="workshop-card__desc">{desc}</p>}

        {tags && tags.length > 0 && (
          <div className="workshop-card__tags">
            {tags.slice(0, 3).map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        )}

        <div className="workshop-card__meta">
          <span>
            <i className="fas fa-calendar-alt" /> {date}
          </span>
          {time && (
            <span>
              <i className="fas fa-clock" /> {time}
            </span>
          )}
          {duration && (
            <span>
              <i className="fas fa-hourglass-half" /> {duration}
            </span>
          )}
        </div>

        <div className="workshop-card__row">
          {eventMode && (
            <div className="workshop-card__mode-row">
              {eventMode.map((m, i) => (
                <span key={i} className="workshop-card__mode-badge">
                  {m}
                </span>
              ))}
            </div>
          )}
          {instructor && (
            <span className="workshop-card__instructor">
              <i className="fas fa-user-tie" /> {instructor}
            </span>
          )}
        </div>

        {seatsLeft != null && totalSeats && (
          <div className="workshop-card__seats">
            <div className="workshop-card__seats-track">
              <div
                className={`workshop-card__seats-fill${seatsUrgent ? " workshop-card__seats-fill--urgent" : ""}`}
                style={{ width: `${seatFillPct}%` }}
              />
            </div>
            <span className={`workshop-card__seats-txt${seatsUrgent ? " workshop-card__seats-txt--urgent" : ""}`}>
              {seatsLeft} of {totalSeats} seats remaining
            </span>
          </div>
        )}
      </div>

      <div className="workshop-card__footer">
        <div className="workshop-card__price">
          <span className="workshop-card__price-now">{price}</span>
          {originalPrice && (
            <span className="workshop-card__price-was">{originalPrice}</span>
          )}
        </div>
        <Link to={`/workshop-details?id=${id}`} className="workshop-card__enroll-btn">
          Enroll Now <i className="fas fa-arrow-right" />
        </Link>
      </div>
    </div>
  );
};

export default WorkshopCard;
