import { Vue, Component } from 'vue-property-decorator';
import * as THREE from 'three';
import VL from '@/vl';
import { isUndefined } from 'util';
import { CircleBufferGeometry, Vector3 } from 'three';
import LineSegementGroup from '@/vl/group/lineSegement/lineSegementGroup';
import RectangleGroup from '@/vl/group/rectangle/rectangleGroup';
import InstanceGroup from '@/vl/group/instance/instanceGroup';



@Component({})
export default class Main extends Vue {
  public $refs!: { renderer: HTMLElement };

  private vl!: VL;
  private lineGroup!: LineSegementGroup;
  private rectGroup!: RectangleGroup;
  private instanceGroup!: InstanceGroup;
  private lineCount: number = 720;

  private created() {
    console.log('created');
  }

  private mounted() {
    this.vl = new VL(this.$refs.renderer);
    // vl.addObject();
    this.vl.setBackgroundColor(0, 0, 0);
    // const bg = vl.createInstanceGroup(new CircleBufferGeometry(100, 2), 10);

    this.lineGroup = this.vl.createGroup(LineSegementGroup, this.lineCount);

    const tg = this.vl.createElementGroup();
    const txt = tg.addTextElement('안녕하세요');
    txt.style.left = '300px';
    txt.style.top = '200px';
    tg.style.opacity = '0.0';
    tg.style.transition = 'opacity .3s';
    setTimeout(() => {
      tg.style.opacity = '1';
    }, 1000);

    this.lineGroup.objects.forEach((o, i) => {

      o.position = {
        0: {
          x: 0,
          y: 0,
        }
      };
    });

    this.vl.onUpdate = this.onUpdate;
  }

  private onUpdate(time: number, deltaTime: number, frame: number) {
    const radius = Math.min(this.vl.width, this.vl.height) / 2 - 50;
    this.lineGroup.objects.forEach((o, i) => {
      const ratio = i / this.lineCount;
      const angle = ratio * Math.PI * 2;
      const val = Math.max(Math.sin(angle + time) * 0.5, 0);
      o.position = {
        0: {
          x: 0,
          y: 0,
        },
        1: {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        }
      };
      o.colorHSL = {
        0: {
          h: i / this.lineCount,
          s: val * 0.8 + 0.2,
          l: val * 0.85 + 0.15,
          a: 1,
        },
        1: {
          h: 0,
          s: 0,
          l: 0,
          a: 0,
        }
      };

    });
    // this.rectGroup.intersects(this.vl.mouse.clientX, this.vl.mouse.clientY);
  }
  private destroyed() {
    console.log('destroyed');
  }
}
