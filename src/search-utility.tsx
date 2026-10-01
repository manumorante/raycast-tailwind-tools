import utilities from "../data/utilities.json";

import { useState } from "react";
import { ActionPanel, Action, List } from "@raycast/api";
import { Rule } from "../types";

export default function SearchUtility() {
  const [query, setQuery] = useState("");

  if(!utilities || !utilities?.length) return

  const results = (utilities as Rule[])
    .filter(([selector, declaration, category]) => {
      return selector.includes(query) || declaration.includes(query) || category.includes(query);
    })
    .slice(0, 100);

  return (
    <List searchText={query} onSearchTextChange={setQuery} searchBarPlaceholder="Search by name, css or cat...">
      {results.map(([selector, declaration]) => {
        return <Item key={selector} selector={selector} declaration={declaration}  />;
      })}
    </List>
  );
}

const Item = ({ selector, declaration }: { selector: string; declaration: string; }) => {
  const selectorNoDot = selector.replace(".", "");
  return (
    <List.Item
      
      title={selectorNoDot}
      subtitle={{ value: declaration, tooltip: declaration }}
      // accessories={cat ? [{ tag: { value: cat.name, color: "#999999" } }] : []}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Selector" content={selectorNoDot} />
          <Action.Paste title="Paste Selector" content={selectorNoDot} />
        </ActionPanel>
      }
    />
  );
};
