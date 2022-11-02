export default function resetInputVals(...inputs) {
  for (let inp of inputs) {
    inp.value(inp.type);
  }
}
