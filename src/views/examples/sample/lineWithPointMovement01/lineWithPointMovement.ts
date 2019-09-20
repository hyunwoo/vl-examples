import { Vue, Component, Watch } from 'vue-property-decorator';
import VIRE from '@/vire';
import { PointGroup } from '@/vire/group/point';
import * as THREE from 'three';
import LineSegementGroup from '@/vire/group/lineSegement/lineSegementGroup';
import { ThreeDimensionValue } from '@/vire/dimensionValues';
import { Font, BooleanKeyframeTrack } from 'three';


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
export default class LineWidthPointMovement01 extends Vue {
  public $refs!: { renderer: HTMLElement };
  private vl!: VIRE;
  private pointGroup!: PointGroup;
  private lineGroup!: LineSegementGroup;
  private pointCount: number = 60;
  private pointMovements: Movement[] = [];
  private nodeLinker: NodeLinker[] = [];
  private lineCount!: number;
  private moveStatus: number = 0;

  private mounted() {
    this.vl = new VIRE(this.$refs.renderer);

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
    this.vl.setBackgroundColor(0, 0, 0);
    this.pointGroup = this.vl.createGroup(PointGroup, this.pointCount);

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
    this.lineGroup = this.vl.createGroup(LineSegementGroup, this.lineCount);

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



    this.vl.onUpdate = this.onUpdate;
  }

  private onUpdate(time: number, deltaTime: number) {

    this.moveStatus = Math.floor(time / 8 % 4);
    this.alignWaveform(time);
    this.lineGroup.objects.forEach((object, index) => {
      const fromPos = this.pointGroup.objects[this.nodeLinker[index].from].getPosition();
      const toPos = this.pointGroup.objects[this.nodeLinker[index].to].getPosition();

      const dist =
        Math.sqrt((fromPos.x - toPos.x) * (fromPos.x - toPos.x) +
          (fromPos.y - toPos.y) * (fromPos.y - toPos.y) +
          (fromPos.z - toPos.z) * (fromPos.z - toPos.z));


      const a = Math.min(Math.max((this.vl.height / 3 - dist) * 0.01, 0) * 0.5, 1);

      object.position = {
        0: fromPos,
        1: toPos,
      };

      object.colorHSL = {
        0: {
          h: fromPos.x / this.vl.width * 0.2 + 0.8 + time * 0.03,
          s: 0.9 * a,
          l: 0.6,
          a,
        },
        1: {
          h: toPos.x / this.vl.width * 0.2 + 0.72 + time * 0.03,
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

        x: -this.vl.width / 2 + this.vl.width / (halfCount - 3) * (index % halfCount),
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

  private destroyed() {
    this.vl.release();
  }
}
