import { generaPixels } from './piedra';
import type { MaterialId } from '../data/empresa';

self.onmessage = (e: MessageEvent<{ n: number; W: number; H: number; id: MaterialId; seed: number }>) => {
  const { n, W, H, id, seed } = e.data;
  const data = generaPixels(W, H, id, seed);
  (self as unknown as Worker).postMessage({ n, data }, [data.buffer]);
};
