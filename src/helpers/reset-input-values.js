export default function resetInputVals(...inputs) {
  for (let inp of inputs) {
    if (inp.reducer === "post-added") {
      inp.value({ type: inp.type, payload: inp.type !== "SET_TAGS" ? "" : [] });
    }
  }
}
