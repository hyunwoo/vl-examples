// file created at 2019-9-19
// Auto-generated files tsneViewer.ts

import { Vue, Component } from 'vue-property-decorator';
import VIRE from '@/vire';
import { PointGroup } from '@/vire/group/point';

import _ from 'lodash';
import raw from './data/case_edge.json';
import TSNE from 'tsne-js';
import caseEdges from './data/case_edge.json';
import humanEdges from './data/human_edge.json';
import caseHumanEdges from './data/human_case_edge.json';
import humans from './data/tsne_human_edge_dim_2.json';
import cases from './data/tsne_case_edge_dim_2.json';
// import humanCaseEdges from './data/'
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
    tab: {
      activate: '',
    },
    human: {
      weight: [0.0, 1.0],
    },
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
  private clickControlFieldCommand(key: string) {
    if (this.ui.tab.activate === key) {
      this.ui.tab.activate = '';
    } else {
      this.ui.tab.activate = key;
    }
  }
  private mounted() {
    this.vl = new VIRE(this.$refs.renderer, true);
    this.vl.setBackgroundColor('#fff');
    this.vl.appendGridHelperWithRotate(10000, 100, '#ddd', '#eee', 90);
    // this.vl.appendGridHelperWithRotate(10000, 100, '#ddd', '#eee');
    // this.vl.appendGridHelperWithRotate(10000, 100, '#ccc', '#ddd', 0, 0, 90);
    this.vl.appendStats({
      position: 'absolute',
      left: 'auto',
      right: '0px',
    });
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

    console.warn('case human edge : ', caseHumanEdges.length);
    console.warn('cases edge : ', cases.length);
    console.warn('human edge : ', humans.length);

    // console.log(humans.length);
    // return;
    // setTimeout(this.createHumanGroup, 3000);
    // this.createHumanGroup();

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

  private updateEdgeHumanNode() {
    // TODO Update
  }


  private createHumanGroup() {
    if (this.groupHuman !== undefined) {
      this.vl.removeRenderGroup(this.groupHuman);
    }
    this.groupHuman = this.vl.createGroup(PointGroup, humans.length);
    this.updatePeoplePosition();
  }

  private updatePeoplePosition() {
    const humanObjects = this.groupHuman.objects;
    const caseObjects = this.groupCase.objects;
    humanObjects.forEach(o => o.scale = 0);
    const points = {};
    _(caseHumanEdges).groupBy(h => h.from)
      .forEach(ws => {
        // TODO weight position check
        const ws0 = ws[0];
        points[ws0.from] = {
          from: ws0.from,
          to: ws0.to,
          position: caseObjects[ws0.to].position,
          weight: ws0.weight
        };
      });

    _.forEach(humanEdges, (humanEdge, i) => {
      // TODO here weight gap;
      const pts = _(humanEdge).filter(c => true)
        .map((c, index) => {
          if (points[index] === undefined) {
            return undefined;
          }
          return Object.assign(points[index], { value: c });
        })
        .filter(c => c !== undefined)
        .map(c => {
          return {
            weight: c.value,
            position: {
              x: c.position.x * c.weight,
              y: c.position.y * c.weight,
              z: c.position.z * c.weight,
            }
          };
        })
        .value();
      const w = _.sumBy(pts, p => p.weight);
      const x = _.sumBy(pts, p => p.position.x) / w;
      const y = _.sumBy(pts, p => p.position.y) / w;
      const z = _.sumBy(pts, p => p.position.z) / w;

      const obj = humanObjects[Number(i)];
      obj.position = {
        x,
        y,
        z
      };
      obj.scale = 2;
      obj.setColorHex('#f00');

    });




    // objs.forEach((o, i )=>{
    //   o.po
    // })
  }

  // CASES 분석
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
