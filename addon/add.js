const tools = [
    "bold", 
    "italic", 
    "underline", 
    "strikethrough",
    "superscript",
    "subscript",
    "oblique",
    "expression"
];

tools.forEach(name => {
  const script = document.createElement("script");
  script.src = `./../logic/${name}.js`;
  document.head.appendChild(script);
});

const tag = [
    "oblique",
    "mainbackground",
    "expression"
];

tag.forEach(name => {
  const tagScript = document.createElement("script");
  tagScript.src = `./../functions/${name}.js`;
  document.head.appendChild(tagScript);
});