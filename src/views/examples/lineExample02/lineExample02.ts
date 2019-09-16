import { Vue, Component } from 'vue-property-decorator';
import VL from '@/vl';
import LineSegementGroup from '@/vl/group/lineSegement/lineSegementGroup';



@Component({})
export default class Main extends Vue {
  public $refs!: { renderer: HTMLElement };
  private vl!: VL;
  private lineGroup!: LineSegementGroup;
  private lineCount!: number;

  private mounted() {
    this.vl = new VL(this.$refs.renderer);
    this.lineCount = this.vl.width / 2 - 20;
    console.log('create stats');
    this.vl.appendStats({
      position: 'absolute',
      left: '8px',
      top: '8px',
    });
    this.vl.setBackgroundColor(0, 0, 0);
    this.lineGroup = this.vl.createGroup(LineSegementGroup,
      this.lineCount);

    this.lineGroup.objects.forEach((object, index) => {
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
    this.lineGroup.objects.forEach((object, index) => {
      const x = index * 2 - this.vl.width / 2 + 20;
      index += time * 100;
      const height =
        Math.min(10,
          Math.max(Math.sin(index * 0.09 + time)
            * Math.cos(index * 0.02 + time), 0));
      object.position = {
        0: {
          x,
          y: -height * 200,
        },
        1: {
          x,
          y: height * 200,
        }
      };

      object.colorHSL = {
        0: {
          h: time / 20 % 1,
          s: 0.7,
          l: 0.6,
          a: 1,
        },
        1: {
          h: (time / 20 + 0.2) % 1,
          s: 0.7,
          l: 0.6,
          a: 1,
        },
      };
      // object.colorHSL(Math.sin(time * 0.4 + index * 0.003), height, 0.5);
    });
  }

  private destroyed() {
    this.vl.release();
  }
}
