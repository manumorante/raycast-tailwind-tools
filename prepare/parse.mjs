import css from "css";

export function parse(file) {
  return css
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

      return { selector, declaration };
    });
}