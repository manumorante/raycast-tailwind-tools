import utilities from "../data/utilities.json";
import categories from "../data/categories.json";

import { useState } from "react";
import { ActionPanel, Action, List, Icon } from "@raycast/api";
import { Rule } from "../types";

export default function SearchUtility() {
  const [query, setQuery] = useState("");

  const results = (utilities as Rule[])
    .filter(([selector, declaration, category]) => {
      return selector.includes(query) || declaration.includes(query) || category.includes(query);
    })
    .slice(0, 100);

  return (
    <List searchText={query} onSearchTextChange={setQuery} searchBarPlaceholder="Search by name, css or cat...">
      {results.map(([selector, declaration, category]) => {
        return <Item key={selector} selector={selector} declaration={declaration} category={category} />;
      })}
    </List>
  );
}

const Item = ({ selector, declaration, category }: { selector: string; declaration: string; category: string }) => {
  const selectorNoDot = selector.replace(".", "");
  const cat = categories.find((c) => c.name === category);
  return (
    <List.Item
      icon={
        cat
          ? { source: Icon[cat.icon as keyof typeof Icon], tintColor: "#38BDF899" }
          : { source: Icon.Circle, tintColor: "#99999999" }
      }
      title={selectorNoDot}
      subtitle={{ value: declaration, tooltip: declaration }}
      accessories={cat ? [{ tag: { value: cat.name, color: "#999999" } }] : []}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Selector" content={selectorNoDot} />
          <Action.Paste title="Paste Selector" content={selectorNoDot} />
        </ActionPanel>
      }
    />
  );
};
