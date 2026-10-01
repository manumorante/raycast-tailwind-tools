import css from "css";

export function parse(file) {
  const parsed = css
    .parse(file)
    .stylesheet.rules.filter((rule) => !!rule.selectors)
    .map((rule) => {
      if (!rule.selectors) return;

      const selector = rule.selectors[0].split(" ")[0];
      if (selector.includes("\\")) return;

      const declaration = css
        .stringify({ stylesheet: { rules: [rule] } })
        .split("\n")
        .slice(1, -1)
        .map((line) => line.trim())
        .join(" ");
      
      return [
        selector,
        declaration,
      ];
    });
     
  return parsed
}