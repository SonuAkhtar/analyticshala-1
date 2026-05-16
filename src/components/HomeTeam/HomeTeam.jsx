import "./homeTeam.css";
import { teamData } from "../../../appData";
import SectionHeader from "../SectionHeader/SectionHeader";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useCallback } from "react";

const MEMBER_CONFIG = [
  { accent: "#bb1b21", tags: ["Founder", "Analytics Mentor"] },
  { accent: "#f97316", tags: ["ISB Alumnus", "500+ Alumni"] },
  { accent: "#bb1b21", tags: ["Business Dev", "Partnerships"] },
  { accent: "#7c3aed", tags: ["Business Dev", "Placements"] },
  { accent: "#f97316", tags: ["Web Dev", "Instructor"] },
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const TeamCard = ({ member, index, isInView }) => {
  const cardRef = useRef(null);
  const config = MEMBER_CONFIG[index % MEMBER_CONFIG.length];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 240,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 240,
    damping: 26,
  });

  const handleMouseMove = useCallback(
    (e) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
      cardRef.current.style.setProperty(
        "--mx",
        `${(((e.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`,
      );
      cardRef.current.style.setProperty(
        "--my",
        `${(((e.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`,
      );
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      className={`home-team__card${index < 2 ? " home-team__card--featured" : ""}`}
      style={{
        "--accent": config.accent,
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      initial={{ opacity: 0, y: 56 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={member.image}
        alt={member.name}
        className="home-team__card-photo"
      />

      <div className="home-team__card-tint" />
      <div className="home-team__card-orb" />
      <div className="home-team__card-spotlight" />
      <div className="home-team__card-shine" />

      <span className="home-team__card-num">0{index + 1}</span>

      {member.college && (
        <span className="home-team__card-college-badge">
          <i className="fas fa-award" />
          {member.college}
        </span>
      )}

      <div className="home-team__card-footer">
        {!member.image && (
          <div className="home-team__card-avatar">
            {getInitials(member.name)}
          </div>
        )}
        <div className="home-team__card-id">
          <h3 className="home-team__card-name">{member.name}</h3>
          <p className="home-team__card-role">{member.position}</p>
        </div>
        <div className="home-team__card-line" />
      </div>

      <div className="home-team__card-reveal">
        <div className="home-team__card-tags">
          {config.tags.map((tag, t) => (
            <span key={t} className="home-team__card-tag">
              {tag}
            </span>
          ))}
        </div>

        {member.bio && <p className="home-team__card-bio">{member.bio}</p>}

        {member.social && member.social.length > 0 && (
          <div className="home-team__card-social">
            {member.social.map((link, j) => (
              <a
                key={j}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="home-team__card-social-btn"
                style={{ "--delay": `${j * 0.08 + 0.18}s` }}
                onClick={(e) => e.stopPropagation()}
              >
                <i className={link.iconClass} />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const HomeTeam = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="home-team" id="homeTeam">
      <div className="container">
        <SectionHeader
          eyebrow="OUR TEAM"
          title="Learn from the Best"
          subtitle="Industry experts and practitioners who've been there, done that - and are now here to fast-track your journey."
        />
        <div className="home-team__grid" ref={ref}>
          {teamData.map((member, i) => (
            <TeamCard
              key={member.id}
              member={member}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTeam;
