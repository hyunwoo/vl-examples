// file created at 2019-9-19
// Auto-generated files index.ts

import TsneViewer from './tsneViewer';

export type TSNEWorkerAction =
  'generate' |
  'stop' |
  'error' |
  'result' |
  'progressStatus' |
  'progressIter' |
  'progressData';
export interface TSNEWorkerData {
  action: TSNEWorkerAction;
  props?: TSNEWorkerProps;
  deliver?: any;
}
export interface TSNEWorkerProps {
  raw: number[][];
  perplexity: number;
  earlyExaggeration: number;
  learningRate: number;
  iternation: number;

}
export default TsneViewer;
