// file created at 2019-9-19
// Auto-generated files tsneViewer.ts

import { Vue, Component } from 'vue-property-decorator';
import VIRE from '@/vire';
import { PointGroup } from '@/vire/group/point';

import _ from 'lodash';
import ColorConvert from 'color-convert';
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
import caseRawFile from './data/generated/case.json';
import ElementGroup from '@/vire/group/texts/textGroup.js';
import ElementObject from '@/vire/group/texts/textObject.js';

let caseRawData = _.cloneDeep(caseRawFile);
const multiCount = 0;
const nodeSize = 9;
for (let j = 0; j < multiCount; j++) {
  for (let i = 0; i < 500; i++) {
    const copied = _.cloneDeep(caseRawFile[i]);
    copied.id = copied.id + 500 * (j + 1);
    caseRawData.push(copied);
  }
}

interface Palette {
  [key: string]: string;
}

@Component({})
export default class TsneViewer extends Vue {
  public $refs!: { renderer: HTMLElement };
  private vl!: VIRE;
  private groupCase!: PointGroup;
  private groupHuman!: PointGroup;
  private groupCaseToHuman!: LineSegementGroup;
  private groupCaseToCase!: LineSegementGroup;
  private groupHumanToHuman!: LineSegementGroup;
  private textElementGroup!: ElementGroup;
  private textElementObjects!: ElementObject[];
  private palette: Palette = {};
  private nodeMinDate!: Date;
  private nodeMaxDate!: Date;
  private edgeCaseToCase: any[] = [];
  private worker = new Worker();
  private nodePositionNeedsUpdate: boolean = false;
  private linkes: Array<{
    from: number,
    to: number,
    weight: number,
  }> = [];
  private displayOptions = {
    distributionRadius: 400
  };
  private ui = {
    tab: {
      activate: ''
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
    },
    filter: {
      currentCategorize: 'crime7'
    },
    edges: {
      enableEdges: false,
      weight: [0.0, 1.0],
      opacity: 0.1,
    }
  };
  private clickControlFieldCommand(key: string) {
    if (this.ui.tab.activate === key) {
      this.ui.tab.activate = '';
    } else {
      this.ui.tab.activate = key;
    }
  }
  private getNodePositionInCell(
    cellIndex: number,
    cellMaxCount: number,
    nodeIndex: number,
    nodeMaxCount: number
  ): {
    x: number;
    y: number;
  } {
    const width = 1000;
    const height = 1000;
    const cellPos = this.makeCellCenterPosition(
      cellIndex,
      cellMaxCount,
      width,
      height
    );
    const cx = cellPos.x;
    const cy = cellPos.y;

    // 셀의 중점을 기준으로 노드의 위치를 구해야 한다.
    const nodeSplitCount = Math.ceil(Math.sqrt(nodeMaxCount));
    const nodeIndexX = (nodeIndex % nodeSplitCount) - nodeSplitCount / 2;
    const nodeIndexY =
      Math.floor(nodeIndex / nodeSplitCount) - nodeSplitCount / 2;

    return {
      x: nodeIndexX * nodeSize + cx,
      y: nodeIndexY * nodeSize + cy
    };
  }
  /**
   * text ElementObject를 위해 cellCenterPosition을 구하는 함수이다.
   * @param cellIndex
   * @param cellMaxCount
   * @param nodeMaxCount
   */
  private makeCellCenterPosition(
    cellIndex: number,
    cellMaxCount: number,
    width: number,
    height: number
  ) {
    const splitCount = Math.ceil(Math.sqrt(cellMaxCount));
    const x =
      width / splitCount / 2 +
      ((cellIndex % splitCount) * width) / splitCount -
      width / 2;
    const y =
      height / splitCount / 2 +
      cellIndex +
      (Math.floor(cellIndex / splitCount) * height) / splitCount -
      height / 2;

    return {
      x,
      y
    };
  }

  private applyNodePosition(category: string) {
    const caseObjects = this.groupCase.objects;
    const groups = _.groupBy(caseRawData, d => d[category]);
    console.warn('caseRawData', caseRawData);
    const groupLength = Object.keys(groups).length;

    if (!_.isNil(this.textElementGroup)) {
      this.vl.removeElementGroup(this.textElementGroup);
      // @ts-ignore
      this.textElementGroup = null;
    }
    if (category === '-') {
      caseObjects.forEach((d, i) => {
        const angle = Math.random() * Math.PI * 2;
        const coord = this.getNodePositionInCell(0, 1, i, 500);
        const r = Math.random();
        d.position = {
          x: coord.x,
          y: coord.y
        };
      });
      return;
    }
    this.textElementGroup = this.vl.createElementGroup();
    this.textElementObjects = [];

    _(groups)
      .map((v, k) => {
        return {
          name: k,
          items: v
        };
      })
      .sortBy(group => -group.items.length)
      .forEach((group, groupIndex) => {
        // 텍스트 위치를 부여한다.
        // const eg = this.vl.createElementGroup();
        const cellCenterPosition = this.makeCellCenterPosition(
          groupIndex,
          groupLength,
          1000,
          1000
        );
        // console.log('cellCenterPosition', cellCenterPosition);
        const txt = this.textElementGroup.addTextElement(group.name);
        txt.style = {
          textAlign: 'center',
          width: '100px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          fontWeight: '600',
          color: '#333',
          fontSize: '12px',
          left: `${cellCenterPosition.x + this.vl.width / 2 - 50}px`,
          top: `${cellCenterPosition.y + this.vl.height / 2 + 50}px`
        };
        this.textElementObjects.push(txt);
        // color group.name
        _.forEach(group.items, (item, itemIndex) => {
          const pos = this.getNodePositionInCell(
            groupIndex,
            groupLength,
            itemIndex,
            group.items.length
          );
          // console.log(pos);
          const node = caseObjects[item.id - 1];
          node.position = {
            x: pos.x,
            y: pos.y
          };
        });
      });
  }
  private changeCategorize(name) {
    this.nodePositionNeedsUpdate = true;
    const caseObjects = this.groupCase.objects;
    switch (name) {
      case '7대 중범죄':
        this.ui.filter.currentCategorize = 'crime7';
        this.applyNodePosition('crime7');
        break;
      case '범죄':
        this.ui.filter.currentCategorize = 'crime';
        this.applyNodePosition('crime');
        break;
      case '지역':
        this.ui.filter.currentCategorize = 'state';
        this.applyNodePosition('state');
        break;
      case '-':
        this.ui.filter.currentCategorize = '-';
        this.applyNodePosition('-');
        break;
    }
  }
  private changeColorByCategory(name: string) {
    const caseObjects = this.groupCase.objects;
    switch (name) {
      case '7대 중범죄':
        this.applyNodeColor('crime7');
        break;
      case '범죄':
        this.applyNodeColor('crime');
        break;
      case '지역':
        this.applyNodeColor('state');
        break;
      case '시간':
        this.applyNodeColor('date');
        break;
      case '-':
        this.applyNodeColor('-');
        break;
    }
  }
  private applyNodeColor(category: string) {
    const caseObjects = this.groupCase.objects;
    // caseRawData = _.sortBy(caseRawData, d => d[category]);

    if (category === '-') {
      this.palette = {};
      _.forEach(caseObjects, caseObject => {
        caseObject.setColorHex('#039be5');
      });
    } else if (category === 'date') {
      caseRawData = _.sortBy(
        caseRawData,
        d => -new Date(d[category] as string).getTime()
      );
      _.forEach(caseRawData, d => {
        let nodeOpacity: number = 0.1;
        if (!_.isNil(d.date)) {
          nodeOpacity = this.makeNodeOpacity(new Date(d.date));
        }
        const node = caseObjects[d.id - 1];
        node.setColorHex('#028ac5', nodeOpacity);
      });
    } else {
      caseRawData = _.sortBy(caseRawData, d => d[category]);
      const groups = _.groupBy(caseRawData, d => d[category]);
      this.palette = this.makePalette(Object.keys(groups));

      _(groups)
        .map((v, k) => {
          return {
            name: k,
            items: v
          };
        })
        .sortBy(group => -group.items.length)
        .forEach((group, groupIndex) => {
          _.forEach(group.items, (item, itemIndex) => {
            const node = caseObjects[item.id - 1];
            node.setColorHex(this.palette[group.name]);
          });
        });
    }
    if (this.nodePositionNeedsUpdate) {
      this.applyNodePosition(this.ui.filter.currentCategorize);
    }
  }

  private makeNodeOpacity(date: Date): number {
    const maxGap: number =
      this.nodeMaxDate.getTime() - this.nodeMinDate.getTime();

    return ((date.getTime() - this.nodeMinDate.getTime()) / maxGap) * 0.9 + 0.1;
  }

  /**
   * 색상을 보관하는 object(hash)를 만드는 함수이다.
   * @param keyArray
   */
  private makePalette(keyArray: string[]) {
    const palette: { [key: string]: string } = {};
    for (let i = 0; i < keyArray.length; i++) {
      palette[keyArray[i]] = `#${ColorConvert.hsl.hex([
        (360 / keyArray.length) * i,
        50,
        50
      ])}`;
      // palette[keyArray[i]] = {
      //   h: 1,
      //   s: 1,
      //   l: 1,
      //   a: 1
      // };
    }
    return palette;
  }

  private makeNodeMinMaxDate(caseRawData1: any) {
    const sortedCaseRawData = _(caseRawData1)
      .filter(caseDatum => caseDatum.date !== null)
      .sortBy(caseDatum => new Date(caseDatum.date).getTime())
      .value();
    console.log('sortedCaseRawData', sortedCaseRawData);

    return {
      min: new Date(sortedCaseRawData[0].date),
      max: new Date(sortedCaseRawData[sortedCaseRawData.length - 1].date)
    };
  }

  private mounted() {
    this.vl = new VIRE(this.$refs.renderer);
    this.vl.setBackgroundColor('#fff');
    this.vl.appendGridHelperWithRotate(10000, 100, '#ddd', '#eee', 90);
    this.vl.appendStats({
      position: 'absolute',
      left: 'auto',
      right: '0px'
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

    this.groupCase = this.vl.createGroup(PointGroup, caseRawData.length);
    const caseObjects = this.groupCase.objects;
    caseObjects.forEach((d, i) => {
      d.scale = nodeSize / 4;
      d.setColorHex('#039be5');
    });

    const minMaxDate = this.makeNodeMinMaxDate(caseRawData);
    this.nodeMinDate = minMaxDate.min;
    this.nodeMaxDate = minMaxDate.max;
    console.log('nodeMinDate', this.nodeMinDate);
    console.log('this.nodeMaxDate', this.nodeMaxDate);

    this.changeCategorize('7대 중범죄');

    return;

    console.log(caseRawData);
    return;

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
        x: (d[0] * this.vl.height) / 2,
        y: (d[1] * this.vl.height) / 2
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

    this.groupCaseToCase = this.vl.createGroup(
      LineSegementGroup,
      this.edgeCaseToCase.length
    );
    this.drawEdges();
  }


  private rendererUpdate() {
    // this.drawEdges();
    if (this.linkes.length !== 0) {
      this.updateEdges();
    }
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
    humanObjects.forEach(o => (o.scale = 0));
    const points = {};
    _(caseHumanEdges)
      .groupBy(h => h.from)
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
      const pts = _(humanEdge)
        .filter(c => true)
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
              z: c.position.z * c.weight
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
        y: y * this.displayOptions.distributionRadius
      };
    }
  }
  private startTSNE() {
    this.nodePositionNeedsUpdate = false;
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

  private drawEdges() {

    // @ts-ignore
    const edges: number[][] = caseEdges;
    this.linkes = [];
    for (let i = 0; i < edges.length; i++) {
      for (let j = i + 1; j < edges[i].length; j++) {
        const w = edges[i][j];
        if (w > this.ui.edges.weight[0] && w < this.ui.edges.weight[1]) {
          this.linkes.push({
            from: i,
            to: j,
            weight: w,
          });

        }

      }
    }


    if (this.groupCaseToCase) {
      this.vl.removeRenderGroup(this.groupCaseToCase);
      // @ts-ignore
      this.groupCaseToCase = null;
    }
    if (!this.ui.edges.enableEdges) {
      return;
    }

    this.groupCaseToCase = this.vl.createGroup(LineSegementGroup, this.linkes.length);
    // calc Edges
    return;
  }

  private updateEdges() {
    if (!this.groupCaseToCase) {
      return;
    }
    const linkObjects = this.groupCaseToCase.objects;
    const groupObjects = this.groupCase.objects;
    this.linkes.forEach((link, index) => {
      const from = groupObjects[link.from];
      const to = groupObjects[link.to];
      const currentLink = linkObjects[index];
      currentLink.position = {
        0: from.position,
        1: to.position,
      };
      const cf = from.color;
      cf.a = this.ui.edges.opacity;
      const ct = to.color;
      ct.a = this.ui.edges.opacity;

      currentLink.setColor({
        0: cf,
        1: cf
      });
    });
  }
}
