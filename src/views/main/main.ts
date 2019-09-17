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
export default class Main extends Vue {
  public $refs!: { renderer: HTMLElement };
  private vl!: VIRE;
  private pointGroup!: PointGroup;
  private lineGroup!: LineSegementGroup;
  private pointCount: number = 100;
  private pointMovements: Movement[] = [];
  private nodeLinker: NodeLinker[] = [];
  private lineCount!: number;
  private moveStatus: number = 0;

  @Watch('moveStatus')
  private onChangeStyle() {

    console.log('change', this.moveStatus);
    // switch (this.moveStatus) {
    //   case 0:
    //     this.alignRectangle();
    //     break;
    //   case 1:
    //     this.alignEllipse();
    //     break;
    //   case 2:
    //     this.alignInnerEllipse();
    //     break;
    // }
  }
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

    console.log(this.lineCount, this.pointCount);
    this.alignTwist(0);

    this.lineGroup.objects.forEach((object, index) => {
      const fromPos = this.pointGroup.objects[this.nodeLinker[index].from].getPositions();
      const toPos = this.pointGroup.objects[this.nodeLinker[index].to].getPositions();

      object.position = {
        0: fromPos[0],
        1: toPos[0],
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

    switch (this.moveStatus) {
      case 0:
        this.alignRectangle(time);
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
    // this.pointGroup.objects.forEach((object, index) => {

    //   const movement = this.pointMovements[index];
    //   const velocity = deltaTime * movement.velocity;
    //   // object.position = {
    //   //   0: {
    //   //     x: object.position[0].x ?
    //   //       object.position[0].x + movement.direction.x * velocity : 0,
    //   //     y: object.position[0].y ?
    //   //       object.position[0].y + movement.direction.y * velocity : 0,
    //   //   }
    //   // };
    //   if (object.position[0].x !== undefined &&
    //     object.position[0].x < -this.vl.width / 2 &&
    //     movement.direction.x < 0) {
    //     movement.direction.x *= -1;
    //   }

    //   if (object.position[0].x !== undefined &&
    //     object.position[0].x > this.vl.width / 2 &&
    //     movement.direction.x > 0) {
    //     movement.direction.x *= -1;
    //   }

    //   if (object.position[0].y !== undefined &&
    //     object.position[0].y < -this.vl.height / 2 &&
    //     movement.direction.y < 0) {
    //     movement.direction.y *= -1;
    //   }

    //   if (object.position[0].y !== undefined &&
    //     object.position[0].y > this.vl.height / 2 &&
    //     movement.direction.y > 0) {
    //     movement.direction.y *= -1;
    //   }
    // });

    this.lineGroup.objects.forEach((object, index) => {
      const fromPos = this.pointGroup.objects[this.nodeLinker[index].from].getPositions();
      const toPos = this.pointGroup.objects[this.nodeLinker[index].to].getPositions();

      const dist =
        Math.sqrt((fromPos[0].x - toPos[0].x) * (fromPos[0].x - toPos[0].x) +
          (fromPos[0].y - toPos[0].y) * (fromPos[0].y - toPos[0].y) +
          (fromPos[0].z - toPos[0].z) * (fromPos[0].z - toPos[0].z));


      const a = Math.max((this.vl.width / 5 - dist) * 0.01, 0) * 0.6;

      object.position = {
        0: fromPos[0],
        1: toPos[0],
      };
      object.colorHSL = {
        0: {
          h: fromPos[0].x / this.vl.width * 0.2 + 0.8 + time * 0.03,
          s: 0.9 * a,
          l: 0.6,
          a,
        },
        1: {
          h: toPos[0].x / this.vl.width * 0.2 + 0.72 + time * 0.03,
          s: 0.9 * a,
          l: 0.6,
          a
        },
      };
    });
  }


  private alignRectangle(t: number) {
    const sqrtCount = Math.floor(Math.sqrt(this.pointCount));
    const gridX = this.vl.width / sqrtCount + 10;
    this.pointGroup.objects.forEach((object, index) => {

      object.position = {
        0: {
          x: index % sqrtCount * gridX - this.vl.width / 2 + Math.sin(t + index * 0.1) * 10,
          y: Math.floor(index / sqrtCount) * gridX - this.vl.height / 2 + Math.sin(t + index * 0.1) * 10,
          z: 0,
        }
      };
      object.colorHSL = {
        0: {
          h: 1,
          s: 1,
          l: 1,
          a: 0.4,
        }
      };
      object.update();
    });
  }

  private alignTwist(t: number) {
    const stepCount = 3;
    const stepInner = Math.floor(this.pointGroup.objects.length / stepCount);
    this.pointGroup.objects.forEach((object, index) => {
      const angle = index * stepCount / this.pointCount * Math.PI * 2;
      const r = this.vl.width / 2 * index / stepInner / 3 +
        index % 2 * 40 + Math.sin(t + index * 0.1) * 40;

      object.position = {
        0: {
          x: Math.sin(angle) * r,
          y: Math.cos(angle) * r,
          z: 0,
        }
      };
      object.colorHSL = {
        0: {
          h: 1,
          s: 1,
          l: 1,
          a: 0.4,
        }
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
      const r = this.vl.width / 3 * Math.floor(index / stepInner) / 5 + index % 2 * 40
        + Math.sin(t + stepIndex * 0.2) * 40 + 80;
      object.position = {
        0: {
          x: Math.sin(angle) * r,
          y: Math.cos(angle) * r,
          z: 0,
        }
      };
      object.colorHSL = {
        0: {
          h: 1,
          s: 1,
          l: 1,
          a: 0.4,
        }
      };
      object.update();
    });
  }

  private alignEllipse(t: number) {
    const length = this.pointGroup.objects.length;
    this.pointGroup.objects.forEach((object, index) => {
      const angle = index / this.pointCount * Math.PI * 2;
      const multiply = index % 2 === 0 ? -1 : 1;
      const r = this.vl.width / 3 + multiply * 20 +
        Math.sin(t + Math.PI * 2 * index / length * 2) * multiply * 20;
      object.position = {
        0: {
          x: Math.sin(angle) * r,
          y: Math.cos(angle) * r,
          z: 0,
        }
      };
      object.colorHSL = {
        0: {
          h: 1,
          s: 1,
          l: 1,
          a: 0.4,
        }
      };
      object.update();
    });
  }
  private destroyed() {
    this.vl.release();
  }
}
