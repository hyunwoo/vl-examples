// file created at 2019-9-19
// Auto-generated files tsneViewer.ts

import { Vue, Component } from 'vue-property-decorator';
import VIRE from '@/vire';
import { PointGroup } from '@/vire/group/point';

import raw from './data/case_edge.json';
import TSNE from 'tsne-js';
import caseEdges from './data/case_edge.json';
import humans from './data/tsne_human_edge_dim_2.json';
import cases from './data/tsne_case_edge_dim_2.json';
import { LineSegementGroup } from '@/vire/group/lineSegement';
import Worker from 'worker-loader!./tsne.worker.ts';
import { TSNEWorkerProps, TSNEWorkerData } from './index.js';

@Component({})
export default class TsneViewer extends Vue {
  public $refs!: { renderer: HTMLElement };
  private vl!: VIRE;
  private groupCase!: PointGroup;
  private groupHuman!: PointGroup;
  private groupCaseToHuman!: LineSegementGroup;
  private groupCaseToCase!: LineSegementGroup;
  private groupHumanToHuman!: LineSegementGroup;
  private edgeCaseToCase: any[] = [];
  private worker = new Worker();
  private displayOptions = {
    distributionRadius: 400,
  };
  private ui = {
    tsne: {
      perplexity: 15,
      earlyExaggeration: 2,
      learningRate: 180,
      iteration: 150,
      running: false,
      status: 'READY',
      currentIteration: '-',
      currentErrorRate: '-',
      currentGVN: '-'
    }
  };
  private mounted() {
    this.vl = new VIRE(this.$refs.renderer, true);
    this.vl.setBackgroundColor('#fff');
    this.vl.appendGridHelperWithRotate(10000, 100, '#ddd', '#eee', 90);
    // this.vl.appendGridHelperWithRotate(10000, 100, '#ddd', '#eee');
    // this.vl.appendGridHelperWithRotate(10000, 100, '#ccc', '#ddd', 0, 0, 90);
    this.vl.appendStats();
    this.vl.onUpdate = this.rendererUpdate;


    this.worker.onmessage = event => {
      const received: TSNEWorkerData = event.data;
      switch (received.action) {
        case 'progressStatus':
          this.ui.tsne.status = received.deliver;
          break;
        case 'progressIter':
          this.ui.tsne.currentErrorRate = received.deliver.error;
          this.ui.tsne.currentIteration = received.deliver.iter;
          this.ui.tsne.currentGVN = received.deliver.gvn;
          break;
        case 'progressData':
          this.updateCases(received.deliver);
          break;
        case 'result':
          this.ui.tsne.running = false;
          this.ui.tsne.status = 'READY';
          break;
      }
    };

    this.groupCase = this.vl.createGroup(PointGroup, cases.length);
    const caseObjects = this.groupCase.objects;

    caseObjects.forEach((d, i) => {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random();
      d.position = {
        x: Math.sin(angle) * this.displayOptions.distributionRadius * r,
        y: Math.cos(angle) * this.displayOptions.distributionRadius * r,
      };
      d.scale = 3;
      d.setColorHex('#039be5');
    });

    // return;

    return;
    this.groupHuman = this.vl.createGroup(PointGroup, 1295);
    const humanObjects = this.groupHuman.objects;
    humans.forEach((d, i) => {
      humanObjects[i].position = {
        x: d[0] * this.vl.height / 2,
        y: d[1] * this.vl.height / 2,
        // z: d[2] * this.vl.height / 2,
      };
      humanObjects[i].scale = 1;
      humanObjects[i].setColorHex('#039be5');
    });
    // this.vl.removeRenderGroup(this.groupHuman);
    const arr = caseEdges as any[];

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i][j] > 0.9) {
          this.edgeCaseToCase.push({
            from: i,
            to: j,
            weight: arr[i][j]
          });
        }
      }
    }

    this.groupCaseToCase = this.vl.createGroup(LineSegementGroup,
      this.edgeCaseToCase.length);
    this.drawEdges();
  }

  private drawEdges() {
    const lines = this.groupCaseToCase.objects;
    const caseObjects = this.groupCase.objects;
    this.edgeCaseToCase.forEach((edge, i) => {
      lines[i].position = {
        0: caseObjects[edge.from].position,
        1: caseObjects[edge.to].position,
      };
      lines[i].color = {
        0: {
          r: 1,
          g: 0.3,
          b: 0,
          a: 0.2,
        }
      };
    });
  }
  private rendererUpdate() {
    // this.drawEdges();
  }
  private updateCases(arr: number[][]) {
    const groupObjects = this.groupCase.objects;
    for (let i = 0; i < arr.length; i++) {
      const x = arr[i][0];
      const y = arr[i][1];
      groupObjects[i].position = {
        x: x * this.displayOptions.distributionRadius,
        y: y * this.displayOptions.distributionRadius,
      };
    }
  }
  private startTSNE() {
    this.ui.tsne.running = true;
    console.log('?');
    const d: TSNEWorkerData = {
      action: 'generate',
      // @ts-ignore
      props: {
        perplexity: this.ui.tsne.perplexity,
        earlyExaggeration: this.ui.tsne.earlyExaggeration,
        learningRate: this.ui.tsne.learningRate,
        iternation: this.ui.tsne.iteration,
        raw: caseEdges
      }
    };
    this.worker.postMessage(d);
  }
}
