import React, { FC } from "react";
import styles from "./Section.module.scss";

interface SectionProps {
  label: string;
  children: React.ReactNode;
}

const Section: FC<SectionProps> = ({ label, children }) => {
  return (
    <div className={styles.Section}>
      <h2>{label}</h2>
      {children}
    </div>
  );
};
export default Section;
