import { TSNEWorkerProps, TSNEWorkerData } from './';

const ctx: Worker = self as any;
import TSNE from 'tsne-js';

// Post data to parent thread
// ctx.postMessage({ foo: 'foo' });
class TSNEWorker {
  private props: TSNEWorkerProps | undefined;
  private model: TSNE | undefined;
  public constructor() {
    console.log('create worker');
    ctx.addEventListener('message', event => {
      const data: TSNEWorkerData = event.data;
      console.log('receive data', data);
      switch (data.action) {
        case 'generate':
          this.props = data.props;
          this.generate();
          break;
        case 'stop':
          break;
      }

    });
  }

  public generate() {
    let post: TSNEWorkerData;

    if (this.props === undefined) {
      post = {
        action: 'error',
        deliver: 'props is undefined'
      };
      ctx.postMessage(post);
      return;
    }
    console.log('start TSNE Worker');
    this.model = new TSNE({
      dim: 2,
      perplexity: this.props.perplexity,
      earlyExaggeration: this.props.earlyExaggeration,
      learningRate: this.props.learningRate,
      nIter: this.props.iternation,
      metric: 'euclidean'
    });
    this.model.init({
      data: this.props.raw,
      type: 'dense'
    });
    console.log(this.model);

    this.model.on('progressIter', iter => {
      post = {
        action: 'progressIter',
        deliver: {
          iter: iter[0] * 1 + 1,
          error: iter[1].toPrecision(7),
          gvn: iter[2].toPrecision(5)
        }
      };
      ctx.postMessage(post);
    });

    this.model.on('progressStatus', status => {
      post = {
        action: 'progressStatus',
        deliver: status,
      };
      ctx.postMessage(post);
    });

    this.model.on('progressData', data => {
      post = {
        action: 'progressData',
        deliver: data,
      };
      ctx.postMessage(post);
    });

    this.model.run();
    console.log(this.model);
    const output = this.model.getOutputScaled();
    post = {
      action: 'result',
      deliver: output
    };
    ctx.postMessage(post);
  }

}

const tsneWorker = new TSNEWorker();

// Respond to message from parent thread





// ctx.addEventListener('data', event => console.log(event));
