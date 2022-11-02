import { Fragment } from "react";

export default function Input({
  id,
  labelClasses,
  labelContent,
  inputClasses,
  inputType,
  inputPlaceholder,
  rows,
  value,
  onSetValue,
}) {
  let derRows = rows ? rows : inputType === "textarea" && 5;

  return (
    <Fragment>
      <label htmlFor={id} className={labelClasses}>
        {labelContent}
      </label>
      {inputType === "text" ? (
        <input
          type={inputType}
          className={inputClasses}
          id={id}
          placeholder={inputPlaceholder}
          value={value}
          onChange={(e) => onSetValue(e.target.value)}
        />
      ) : (
        <textarea
          rows={derRows}
          className={inputClasses}
          id={id}
          value={value}
          onChange={(e) => onSetValue(e.target.value)}
        ></textarea>
      )}
    </Fragment>
  );
}
