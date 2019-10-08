import { Vue, Component, Watch } from 'vue-property-decorator';
import VIRE from '@/vire';
import { PointGroup } from '@/vire/group/point';
import * as THREE from 'three';
import LineSegementGroup from '@/vire/group/lineSegement/lineSegementGroup';
import { ThreeDimensionValue } from '@/vire/dimensionValues';
import { Font, BooleanKeyframeTrack } from 'three';
import { SmokeText } from '@/vire/group/smoke';


interface Movement {
  direction: {
    x: number,
    y: number,
    z: number,
  };
  velocity: number;
}
interface NodeLinker {
  from: number;
  to: number;
}



@Component({})
export default class Main extends Vue {
  public $refs!: { renderer: HTMLElement };
  private vire!: VIRE;
  private pointGroup!: PointGroup;
  private lineGroup!: LineSegementGroup;
  private pointCount: number = 60;
  private pointMovements: Movement[] = [];
  private nodeLinker: NodeLinker[] = [];
  private lineCount!: number;
  private moveStatus: number = 0;
  private smokeText!: SmokeText;

  private mounted() {
    this.vire = new VIRE(this.$refs.renderer);

    for (let i = 0; i < this.pointCount; i++) {
      const dir = new THREE.Vector3(Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        0).normalize();
      this.pointMovements.push({
        direction: {
          x: dir.x,
          y: dir.y,
          z: dir.z,
        },
        velocity: (Math.random() * 50 + 15)
      });
    }
    this.vire.setBackgroundColor(0, 0, 0);
    this.pointGroup = this.vire.createGroup(PointGroup, this.pointCount);

    for (let i = 0; i < this.pointCount; i++) {
      for (let j = i; j < this.pointCount; j++) {
        const index = i * this.pointCount + j;
        this.nodeLinker.push({
          from: i,
          to: j,
        });
      }
    }
    this.lineCount = this.nodeLinker.length;
    this.lineGroup = this.vire.createGroup(LineSegementGroup, this.lineCount);

    console.log(this.lineCount, this.pointCount);
    this.alignTwist(0);

    this.lineGroup.objects.forEach((object, index) => {
      const fromPos = this.pointGroup.objects[this.nodeLinker[index].from].getPosition();
      const toPos = this.pointGroup.objects[this.nodeLinker[index].to].getPosition();

      object.position = {
        0: fromPos,
        1: toPos,
      };
      object.colorHex = {
        0: {
          hex: '#fff',
          a: 0,
        },
        1: {
          hex: '#fff',
          a: 0,
        }
      };
    });

    // this.smokeText = new SmokeText(this.vire, { maxParticleCount: 20000, canvasWidth: 1200, canvasHeight: 500 });
    // this.smokeText.addText('VIRE', 100, 400,
    //   { font: '800 100px Roboto', fillStyle: '#fff' });
    // this.smokeText.play(8);

    this.vire.onUpdate = this.onUpdate;
  }

  private onUpdate(time: number, deltaTime: number) {

    this.moveStatus = Math.floor(time / 8 % 4);

    switch (this.moveStatus) {
      case 0:
        // this.alignTwist(time);
        this.alignWaveform(time);
        break;
      case 1:
        this.alignEllipse(time);
        break;
      case 2:
        this.alignInnerEllipse(time);
        break;
      case 3:
        this.alignTwist(time);
        break;
    }
    this.lineGroup.objects.forEach((object, index) => {
      const fromPos = this.pointGroup.objects[this.nodeLinker[index].from].getPosition();
      const toPos = this.pointGroup.objects[this.nodeLinker[index].to].getPosition();

      const dist =
        Math.sqrt((fromPos.x - toPos.x) * (fromPos.x - toPos.x) +
          (fromPos.y - toPos.y) * (fromPos.y - toPos.y) +
          (fromPos.z - toPos.z) * (fromPos.z - toPos.z));


      const a = Math.min(Math.max((this.vire.height / 3 - dist) * 0.01, 0) * 0.5, 1);

      object.position = {
        0: fromPos,
        1: toPos,
      };

      object.colorHSL = {
        0: {
          h: fromPos.x / this.vire.width * 0.2 + 0.8 + time * 0.03,
          s: 0.9 * a,
          l: 0.6,
          a,
        },
        1: {
          h: toPos.x / this.vire.width * 0.2 + 0.72 + time * 0.03,
          s: 0.9 * a,
          l: 0.6,
          a
        },
      };
    });
  }


  private alignWaveform(t: number) {
    const halfCount = Math.floor(this.pointCount / 2);
    this.pointGroup.objects.forEach((object, index) => {
      const y = Math.sin(index * 0.1 + t) * 70;
      object.position = {

        x: -this.vire.width / 2 + this.vire.width / (halfCount - 3) * (index % halfCount),
        y: index < halfCount ? -100 - y : 100 - y,
        z: 0,

      };
      object.colorHSL = {

        h: 1,
        s: 1,
        l: 1,
        a: 0.4,

      };
      object.update();
    });
  }
  private alignRectangle(t: number) {
    const sqrtCount = Math.floor(Math.sqrt(this.pointCount));
    const gridX = this.vire.width / sqrtCount + 10;
    this.pointGroup.objects.forEach((object, index) => {

      object.position = {

        x: index % sqrtCount * gridX - this.vire.width / 2 + Math.sin(t + index * 0.1) * 10,
        y: Math.floor(index / sqrtCount) * gridX - this.vire.height / 2 + Math.sin(t + index * 0.1) * 10,
        z: 0,

      };
      object.colorHSL = {

        h: 1,
        s: 1,
        l: 1,
        a: 0.4,

      };
      object.update();
    });
  }

  private alignTwist(t: number) {
    const stepCount = 2;
    const stepInner = Math.floor(this.pointGroup.objects.length / stepCount);
    this.pointGroup.objects.forEach((object, index) => {
      const angle = index * stepCount / this.pointCount * Math.PI * 2;
      const r = this.vire.height * index / stepInner / 3 +
        index % 2 * 40 + Math.sin(t + index * 0.13) * 60;

      object.position = {

        x: Math.sin(angle) * r,
        y: Math.cos(angle) * r,
        z: 0,

      };
      object.colorHSL = {

        h: 1,
        s: 1,
        l: 1,
        a: 0.4,

      };
      object.update();
    });
  }

  private alignInnerEllipse(t: number) {
    const stepCount = 5;
    const stepInner = Math.floor(this.pointGroup.objects.length / stepCount);
    this.pointGroup.objects.forEach((object, index) => {
      const angle = index * stepCount / this.pointCount * Math.PI * 2;
      const stepIndex = Math.floor(index / stepInner);
      const r = this.vire.height / 3 * Math.floor(index / stepInner) / 5 + index % 2 * 40
        + Math.sin(t + stepIndex * 0.2) * 40 + 120;
      object.position = {

        x: Math.sin(angle) * r,
        y: Math.cos(angle) * r,
        z: 0,

      };
      object.colorHSL = {

        h: 1,
        s: 1,
        l: 1,
        a: 0.4,

      };
      object.update();
    });
  }

  private alignEllipse(t: number) {
    const length = this.pointGroup.objects.length;
    this.pointGroup.objects.forEach((object, index) => {
      const angle = index / this.pointCount * Math.PI * 2;
      const multiply = index % 2 === 0 ? -1 : 1;
      const r = this.vire.height / 3 + multiply * 30 +
        Math.sin(t + Math.PI * 2 * index / length * 2) * multiply * 20;
      object.position = {

        x: Math.sin(angle) * r,
        y: Math.cos(angle) * r,
        z: 0,

      };
      object.colorHSL = {

        h: 1,
        s: 1,
        l: 1,
        a: 0.4,

      };
      object.update();
    });
  }
  private destroyed() {
    this.vire.release();
  }
}
