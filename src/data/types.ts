export interface QueryBlock {
  id: string;
  operator: string;
  value: string;
}

export type OperatorType = "prefix" | "separator" | "modifier" | "logical";

export interface Operator {
  id: string;
  label: string;
  syntax: string;
  placeholder?: string;
  category: string;
  type: OperatorType;
  description?: string;
}

export interface SavedDork {
  id: string;
  name: string;
  description: string;
  category: string;
  query: string;
  blocks: QueryBlock[];
  createdAt: string;
}
