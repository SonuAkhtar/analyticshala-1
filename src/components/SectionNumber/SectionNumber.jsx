import "./sectionNumber.css";

const SectionNumber = ({ current, total, color }) => {
  return (
    <div className={`section_number ${color}`}>
      <span className="current">{current}</span>
      <i className="fas fa-solid fa-minus" />
      <span>{total}</span>
    </div>
  );
};

export default SectionNumber;
