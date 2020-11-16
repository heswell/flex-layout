export default function isContainer(node) {
  if (typeof node !== "string") {
    node =
      node.type?.name ||
      node.type?.displayName ||
      node.constructor?.displayName;
  }
  console.log(node);
  return node === "Flexbox";
}
