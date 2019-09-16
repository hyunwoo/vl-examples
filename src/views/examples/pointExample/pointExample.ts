import { Vue, Component } from 'vue-property-decorator';
import VL from '@/vl';
import { PointGroup } from '@/vl/group/point';
import * as THREE from 'three';


interface Movement {
  direction: {
    x: number,
    y: number,
    z: number,
  };
  velocity: number;
}



@Component({})
export default class Main extends Vue {
  public $refs!: { renderer: HTMLElement };
  private vl!: VL;
  private pointGroup!: PointGroup;
  // private lineGroup!: LineSegementGroup;
  private pointCount!: number;
  private pointMovements: Movement[] = [];


  private mounted() {
    this.vl = new VL(this.$refs.renderer);
    this.pointCount = 1000;
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
        velocity: (Math.random() * 8 + 4)
      });
    }
    this.vl.setBackgroundColor(0, 0, 0);
    this.pointGroup = this.vl.createGroup(PointGroup,
      this.pointCount);
    this.pointGroup.objects.forEach((object, index) => {
      object.position = {
        0: {
          x: Math.random() * this.vl.width - this.vl.width / 2,
          y: Math.random() * this.vl.height - this.vl.height / 2,
          z: 0,
        }
      };
      object.colorHSL = {
        1: {
          h: 1,
          s: 1,
          l: 1,
          a: 1,
        }
      };
    });


    this.vl.onUpdate = this.onUpdate;
  }

  private onUpdate(time: number) {
    if (time < 1) {
      return;
    }
    this.pointGroup.objects.forEach((object, index) => {
      const movement = this.pointMovements[index];
      object.position = {
        0: {
          x: object.position[0].x ?
            object.position[0].x + movement.direction.x * movement.velocity : 0,
          y: object.position[0].y ?
            object.position[0].y + movement.direction.y * movement.velocity : 0,
        }
      };
      if (object.position[0].x !== undefined &&
        object.position[0].x < -this.vl.width / 2 &&
        movement.direction.x < 0) {
        movement.direction.x *= -1;
      }

      if (object.position[0].x !== undefined &&
        object.position[0].x > this.vl.width / 2 &&
        movement.direction.x > 0) {
        movement.direction.x *= -1;
      }

      if (object.position[0].y !== undefined &&
        object.position[0].y < -this.vl.height / 2 &&
        movement.direction.y < 0) {
        movement.direction.y *= -1;
      }

      if (object.position[0].y !== undefined &&
        object.position[0].y > this.vl.height / 2 &&
        movement.direction.y > 0) {
        movement.direction.y *= -1;
      }
    });
  }

  private destroyed() {
    this.vl.release();
  }
}
