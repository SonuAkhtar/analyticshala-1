"use client";

import { useRef, useCallback } from "react";
import { teamData } from "@/data/appData";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import styles from "./HomeTeam.module.css";

const MEMBER_CONFIG = [
  { accent: "#bb1b21", tags: ["Founder", "Analytics Mentor"] },
  { accent: "#f97316", tags: ["ISB Alumnus", "500+ Alumni"] },
  { accent: "#bb1b21", tags: ["Business Dev", "Partnerships"] },
  { accent: "#7c3aed", tags: ["Business Dev", "Placements"] },
  { accent: "#f97316", tags: ["Web Dev", "Instructor"] },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

interface TeamCardProps {
  member: (typeof teamData)[0];
  index: number;
  isInView: boolean;
}

const TeamCard = ({ member, index, isInView }: TeamCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const config = MEMBER_CONFIG[index % MEMBER_CONFIG.length];
  const isFeatured = index < 2;

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
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
      cardRef.current!.style.setProperty(
        "--mx",
        `${(((e.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`
      );
      cardRef.current!.style.setProperty(
        "--my",
        `${(((e.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`
      );
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.card}${isFeatured ? ` ${styles.cardFeatured}` : ""}`}
      style={
        {
          "--accent": config.accent,
          rotateX,
          rotateY,
          transformPerspective: 900,
        } as React.CSSProperties
      }
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
      {/* Background photo */}
      {member.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.image}
          alt={member.name}
          className={styles.photo}
        />
      )}

      <div className={styles.tint} />
      <div className={styles.orb} />
      <div className={styles.spotlight} />
      <div className={styles.shine} />

      {/* Large faded watermark number */}
      <span className={styles.cardNum}>0{index + 1}</span>

      {/* College badge */}
      {member.college && (
        <span className={styles.collegeBadge}>
          <i className="fas fa-award" />
          {member.college}
        </span>
      )}

      {/* Footer: always visible */}
      <div className={styles.footer}>
        {!member.image && (
          <div className={styles.avatar}>{getInitials(member.name)}</div>
        )}
        <div className={styles.footerId}>
          <h3 className={styles.name}>{member.name}</h3>
          <p className={styles.role}>{member.position}</p>
        </div>
        <div className={styles.footerLine} />
      </div>

      {/* Reveal panel: slides up on hover */}
      <div className={styles.reveal}>
        <div className={styles.revealTags}>
          {config.tags.map((tag, t) => (
            <span key={t} className={styles.revealTag}>
              {tag}
            </span>
          ))}
        </div>

        {member.bio && <p className={styles.revealBio}>{member.bio}</p>}

        {member.social && member.social.length > 0 && (
          <div className={styles.socials}>
            {member.social.map((link, j) => (
              <a
                key={j}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                style={{ "--delay": `${j * 0.08 + 0.18}s` } as React.CSSProperties}
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={styles.homeTeam} id="homeTeam">
      <div className="container">
        <SectionHeader
          eyebrow="OUR TEAM"
          title="Learn from the Best"
          subtitle="Industry experts and practitioners who've been there, done that — and are now here to fast-track your journey."
        />
        <div className={styles.grid} ref={ref}>
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
