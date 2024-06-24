import { Parent, Literal } from "unist";

// Define the structure of an ImageNode
export interface ImageNode extends Parent {
  url: string;
  alt: string;
  name: string;
  attributes: (Literal & { name: string })[];
  parent?: Parent;
}

// Define the structure of the BlurResult
export interface BlurResult {
  width: number;
  height: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

// Configuration interface for optional logging and quality customization
export interface Config {
  showLogs: boolean;
  webpQuality?: number; // Optional quality setting for WebP conversion
}
