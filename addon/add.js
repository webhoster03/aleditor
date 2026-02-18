const tools = [
    "bold", 
    "italic", 
    "underline", 
    "strikethrough",
    "superscript",
    "subscript",
    "oblique"
];

tools.forEach(name => {
  const script = document.createElement("script");
  script.src = `./../logic/${name}.js`;
  document.head.appendChild(script);
});