import styles from "./TrustedBy.module.css";

const employers = [
  "TCS",
  "Deloitte",
  "Accenture",
  "Wipro",
  "Infosys",
  "Amazon",
  "Genpact",
  "EY",
];

const TrustedBy = () => {
  return (
    <div className={styles.trustedBy}>
      <div className={styles.inner}>
        <span className={styles.label}>Our alumni work at</span>
        <ul className={styles.list}>
          {employers.map((emp) => (
            <li key={emp} className={styles.item}>
              {emp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrustedBy;
