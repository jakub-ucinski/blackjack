import React, { FC } from "react";
import Section from "../Section";
import styles from "./PlayerValues.module.scss";

interface PlayerValuesProps {
  possibleValues: number[];
}

const PlayerValues: FC<PlayerValuesProps> = ({ possibleValues }) => {
  return (
    <Section label="Possible Values">
      <div className={styles.Values}>
        {possibleValues.map((val) => (
          <div key={val} className={styles.Value}>
            {val}
          </div>
        ))}
      </div>
    </Section>
  );
};
export default PlayerValues;
