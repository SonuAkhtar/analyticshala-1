"use client";

import Marquee from "react-fast-marquee";
import type { MarqItem as MarqItemType } from "@/data/appData";
import styles from "./Marq.module.css";

interface MarqItemProps {
  item: MarqItemType;
}

const MarqItem = ({ item }: MarqItemProps) => (
  <div className={styles.item}>
    <div
      className={styles.iconWrap}
      style={
        {
          "--brand": item.color,
          background: `${item.color}18`,
        } as React.CSSProperties
      }
    >
      {item.img ? (
        <img
          src={item.img}
          alt={item.name}
          className={`${styles.logo}${item.darkLogo ? ` ${styles.logoDark}` : ""}`}
        />
      ) : (
        <i className={item.icon} style={{ color: item.color }} />
      )}
    </div>
    <span className={styles.label}>{item.name}</span>
  </div>
);

interface MarqProps {
  data: MarqItemType[];
  dual?: boolean;
}

const Marq = ({ data, dual = false }: MarqProps) => {
  if (!data || data.length === 0) return null;

  return (
    <div className={`${styles.marq}${dual ? ` ${styles.dual}` : ""}`}>
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
