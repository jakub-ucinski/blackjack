import React, { FC, useState } from "react";
import Button from "../../../../Button/Button";
import Input from "../../../../Input/Input";
import styles from "./HumanPlayerInput.module.scss";

interface HumanPlayerInputProps {
  onAdd: (name: string) => void;
}

const HumanPlayerInput: FC<HumanPlayerInputProps> = ({ onAdd }) => {
  const [name, setName] = useState("");

  const clickHandler = () => {
    onAdd(name);
    setName("");
  };

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  return (
    <div className={styles.HumanPlayerInput}>
      <Input type={"text"} value={name} onChange={changeHandler} />
      <Button onClick={clickHandler}>Add Human Player</Button>
    </div>
  );
};

export default HumanPlayerInput;
