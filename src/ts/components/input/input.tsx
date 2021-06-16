import React, { useState } from "react";
import styles from "./style.module.scss";


const Input = ({ error, label, touch = false, ...rest }: any) => {
  const [touched, setTouched] = useState(false);

  return (
    <>
		<label htmlFor={rest.name}>{label}</label>
		<input className="form-control" {...rest} onBlur={() => setTouched(true)} />
		<span className={styles.text_danger}>{(touched || touch) && error}</span>
    </>
  )
}

export default Input;
