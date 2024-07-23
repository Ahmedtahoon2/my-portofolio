import { remarkEmbedder } from "./core";
import { transformer } from "./transformer-oembed";

export const remarkEmbedderPreset = [
  remarkEmbedder,
  {
    transformers: [transformer],
  },
];
