import React, { Fragment } from "react";

const Input = React.forwardRef(
  (
    {
      id,
      labelClasses,
      labelContent,
      inputClasses,
      inputType,
      inputPlaceholder,
      rows,
      value,
      onSetValue,
    },
    ref
  ) => {
    let derRows = rows ? rows : inputType === "textarea" && 5;

    return (
      <Fragment>
        <label htmlFor={id} className={labelClasses}>
          {labelContent}
        </label>
        {inputType === "text" ? (
          <input
            ref={ref}
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
);

export default Input;

// export default function Input({
//   id,
//   labelClasses,
//   labelContent,
//   inputClasses,
//   inputType,
//   inputPlaceholder,
//   rows,
//   value,
//   onSetValue,
// }) {}
