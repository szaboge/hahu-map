export interface Layer {
  id: string;
  url?: string;
  html?: string;
  type: LayerType;
}

export enum LayerType {
  HTML,
  URL
}
