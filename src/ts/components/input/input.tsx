import React, { useState } from "react";
import styles from "./style.module.scss";


const Input = ({ error, label, touch = false, ...rest }: any) => {
  const [touched, setTouched] = useState(false);

  return (
    <>
		<label className={styles.labelText} htmlFor={rest.name}>{label}</label>
		<input className={`form-control ${styles.input_default}`} {...rest} onBlur={() => setTouched(true)} />
		<span className={styles.text_danger}>{(touched || touch) && error}</span>
    </>
  )
}

export default Input;
