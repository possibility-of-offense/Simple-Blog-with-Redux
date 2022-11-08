import { Fragment, useEffect, useState } from "react";

export default function MultiSelectInput({
  onAddTags,
  toClearTags,
  onSetCachedTagsContent,
  isEdited,
  tags,
}) {
  const dispacher = onAddTags();
  const [inputVal, setInputVal] = useState("");

  const handleAddTag = (e) => {
    setInputVal(e.target.value);
  };
  useEffect(() => {
    if (inputVal) {
      onSetCachedTagsContent(inputVal);
      if (inputVal[inputVal.length - 1] === ",") {
        const splitInputVal = inputVal.split(/,\s*/);
        if (isEdited.type === "edited") {
          const merged = inputVal + tags.join(",");
          setInputVal(merged);
        } else {
          dispacher.cb({ type: dispacher.type, payload: splitInputVal });
        }
      }
    }
  }, [inputVal, isEdited, tags, onSetCachedTagsContent, dispacher]);

  useEffect(() => {
    if (toClearTags) {
      setInputVal("");
    }
  }, [toClearTags]);

  return (
    <Fragment>
      <label htmlFor="blogTags" className="form-label label-text text-primary">
        Add some tags (separate them by comma)
      </label>
      <input
        value={inputVal}
        onChange={handleAddTag}
        type="text"
        className="form-control"
        placeholder="Add some tags"
        id="blogTags"
      />
    </Fragment>
  );
}
