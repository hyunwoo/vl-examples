import { Vue, Component } from 'vue-property-decorator';
import VIRE from '@/vire';
import { PointGroup } from '@/vire/group/point';
import * as THREE from 'three';
import LineSegementGroup from '@/vire/group/lineSegement/lineSegementGroup';
import { ThreeDimensionValue } from '@/vire/dimensionValues';


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
  private vl!: VIRE;
  private pointGroup!: PointGroup;
  private lineGroup!: LineSegementGroup;
  private pointCount: number = 100;
  private pointMovements: Movement[] = [];
  private nodeLinker: NodeLinker[] = [];
  private lineCount: number = 2000;


  private mounted() {
    this.vl = new VIRE(this.$refs.renderer);
    console.log('create stats');
    this.vl.appendStats({
      position: 'absolute',
      left: '8px',
      top: '8px',
    });
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
    this.lineGroup = this.vl.createGroup(LineSegementGroup, this.lineCount);
    for (let i = 0; i < this.lineCount; i++) {
      this.nodeLinker.push({
        from: Math.floor(Math.random() * this.pointCount),
        to: Math.floor(Math.random() * this.pointCount),
      });
    }
    this.pointGroup.objects.forEach((object, index) => {
      object.position = {

        x: Math.random() * this.vl.width - this.vl.width / 2,
        y: Math.random() * this.vl.height - this.vl.height / 2,
        z: 0,

      };
      object.colorHSL = {

        h: 1,
        s: 1,
        l: 1,
        a: 0.6,

      };
      object.update();
    });

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

    this.pointGroup.objects.forEach((object, index) => {
      const movement = this.pointMovements[index];
      const velocity = deltaTime * movement.velocity;
      object.position = {

        x: object.position.x ?
          object.position.x + movement.direction.x * velocity : 0,
        y: object.position.y ?
          object.position.y + movement.direction.y * velocity : 0,

      };
      if (object.position.x !== undefined &&
        object.position.x < -this.vl.width / 2 &&
        movement.direction.x < 0) {
        movement.direction.x *= -1;
      }

      if (object.position.x !== undefined &&
        object.position.x > this.vl.width / 2 &&
        movement.direction.x > 0) {
        movement.direction.x *= -1;
      }

      if (object.position.y !== undefined &&
        object.position.y < -this.vl.height / 2 &&
        movement.direction.y < 0) {
        movement.direction.y *= -1;
      }

      if (object.position.y !== undefined &&
        object.position.y > this.vl.height / 2 &&
        movement.direction.y > 0) {
        movement.direction.y *= -1;
      }
    });

    this.lineGroup.objects.forEach((object, index) => {
      const fromPos = this.pointGroup.objects[this.nodeLinker[index].from].getPosition();
      const toPos = this.pointGroup.objects[this.nodeLinker[index].to].getPosition();

      const dist =
        Math.sqrt((fromPos.x - toPos.x) * (fromPos.x - toPos.x) +
          (fromPos.y - toPos.y) * (fromPos.y - toPos.y) +
          (fromPos.z - toPos.z) * (fromPos.z - toPos.z));


      const a = Math.max((250 - dist) * 0.01, 0) * 0.6 + 0.06;
      object.position = {
        0: fromPos,
        1: toPos,
      };
      object.colorHSL = {
        0: {
          h: fromPos.x / this.vl.width * 0.2 + 0.8,
          s: 0.9,
          l: 0.6,
          a
        },
        1: {
          h: toPos.x / this.vl.width * 0.2 + 0.7,
          s: 0.9,
          l: 0.6,
          a
        },
      };
    });
  }

  private destroyed() {
    this.vl.release();
  }
}
