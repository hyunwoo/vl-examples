import { Vue, Component } from 'vue-property-decorator';
import * as THREE from 'three';
import VIRE from '@/vire';
import { isUndefined } from 'util';
import { CircleBufferGeometry, Vector3 } from 'three';
import LineSegementGroup from '@/vire/group/lineSegement/lineSegementGroup';
import RectangleGroup from '@/vire/group/rectangle/rectangleGroup';
import InstanceGroup from '@/vire/group/instance/instanceGroup';



@Component({})
export default class Main extends Vue {
  public $refs!: { renderer: HTMLElement };
  private vl!: VIRE;
  private lineGroup!: LineSegementGroup;
  private lineCount: number = 720;


  private mounted() {
    this.vl = new VIRE(this.$refs.renderer);
    console.log('create stats');
    this.vl.appendStats({
      position: 'absolute',
      left: '8px',
      top: '8px',
    });
    this.vl.setBackgroundColor(0, 0, 0);
    this.lineGroup = this.vl.createGroup(LineSegementGroup, this.lineCount);
    this.vl.onUpdate = this.onUpdate;
  }

  private onUpdate(time: number) {
    const radius = Math.min(this.vl.width, this.vl.height) / 2 - 50;
    this.lineGroup.objects.forEach((object, index) => {
      const ratio = index / this.lineCount;
      const angle = ratio * Math.PI * 2;
      const val = Math.max(Math.sin(angle + time) * 0.5, 0);
      object.position = {
        0: {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        }
      };
      object.colorHSL = {
        1: {
          h: index / this.lineCount,
          s: val * 0.8 + 0.2,
          l: val * 0.8 + 0.2,
          a: 1,
        }
      };
    });
  }

  private destroyed() {
    this.vl.release();
  }
}
