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

type Selector = string;
type Declaration = string;
type Category = string | "";

export type Rule = [Selector, Declaration, Category];
