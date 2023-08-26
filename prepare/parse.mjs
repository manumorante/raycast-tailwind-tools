import css from "css";
import categories from "../data/categories.json" assert { type: "json" };

export function parse(file) {
  const parsed = css
    .parse(file)
    .stylesheet.rules.filter((rule) => !!rule.selectors)
    .map((rule) => {
      if (!rule.selectors) return;

      const selector = rule.selectors[0].replace("\\", "").split(" ")[0];
      const declaration = css
        .stringify({ stylesheet: { rules: [rule] } })
        .split("\n")
        .slice(1, -1)
        .map((line) => line.trim())
        .join(" ");
      
      const props = declaration.split(";")
        .map((prop) => prop.split(":")[0].trim())
        .filter((prop) => prop !== "")

      const category = categories.find((category) => {
        return props.some((prop) => category.props.includes(prop))
      })

      return [
        selector,
        declaration,
        (category?.name || "")
      ];
    });
    
  // Sort by category considering empty as z and move to the end
  parsed.sort((a, b) => {
    if (a[2] === "") return 1;
    if (b[2] === "") return -1;
    if (a[2] < b[2]) return -1;
    if (a[2] > b[2]) return 1;
    return 0;
  });
  
  return parsed
}