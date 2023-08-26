/**
 * Utility Rule
 * ===========================================
 * Rule         .hidden { display: none }
 * Selector     .hidden
 * Declaration  { display: none }
 *   Property   display
 *   Value      none
 * ===========================================
 */
export type Rule = {
  selector: string;
  declaration: string;
};

type Selector = string;

type Declaration = {
  property: Property;
  value: Value;
};

type Property = string;
type Value = string | number;
