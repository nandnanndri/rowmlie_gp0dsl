export interface TableData {
  id: number;
  type: "foosball" | "snooker" | "air-hockey";
  category: "normal" | "competition" | "kids";
  color: string;
  status: number;
  position: { x: number; y: number };
  name?: string;
  "is-locked": boolean;
}
