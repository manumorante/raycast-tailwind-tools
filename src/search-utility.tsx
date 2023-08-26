import utilities from "../data/utilities.json";
import categories from "../data/categories.json";

import { useState } from "react";
import { ActionPanel, Action, List, Icon } from "@raycast/api";
import { Rule } from "../types";

export default function SearchUtility() {
  const [query, setQuery] = useState("");

  const results = (utilities as Rule[])
    .filter((c) => c.selector.includes(query) || c.declaration.includes(query))
    .slice(0, 200);

  return (
    <List
      searchText={query}
      onSearchTextChange={setQuery}
      searchBarPlaceholder="Search by utility name or css props ..."
    >
      {results.map(({ selector, declaration }) => {
        const selectorNoDot = selector.replace(".", "");
        const prop = declaration.split(":")[0];
        const cat = categories.find((item) => item.props.includes(prop));
        const icon = Icon[(cat ? cat.icon : "Circle") as keyof typeof Icon];

        return (
          <List.Item
            key={selector}
            icon={{ source: icon, tintColor: "#38BDF899" }}
            title={selectorNoDot}
            subtitle={{ value: declaration, tooltip: declaration }}
            accessories={[{ tag: { value: `${cat?.name || "Default"}`, color: "#999999" } }]}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard title="Copy Selector" content={selectorNoDot} />
                <Action.Paste title="Paste Selector" content={selectorNoDot} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
