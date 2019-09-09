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
  private created() {
    console.log('created');
  }

  private mounted() {
    this.vl = new VL(this.$refs.renderer);
    // vl.addObject();
    this.vl.setBackgroundColor(0, 0, 0);
    // const bg = vl.createInstanceGroup(new CircleBufferGeometry(100, 2), 10);
    const count = 100;
    const igCount = 100;

    this.lineGroup = this.vl.createGroup(LineSegementGroup, 10);
    this.rectGroup = this.vl.createRectangleGroup(10);
    this.instanceGroup = this.vl.createPlaneInstanceGroup(5, 30, 3);
    const obj = this.instanceGroup.objects[0];
    obj.position(100, 0, 0).move(200, 100, 0);
    obj.size(2, 3);
    obj.colorHEX('#00ff00');
    obj.rotate(0, 0, 60);

    const line = this.lineGroup.objects[0];
    const rects = this.rectGroup.objects;
    // rects[0].setColor(1, 0, 0, 1);
    const rect = rects[0];
    rect.y = 100;
    rect.x = 50;
    for (let i = 0; i < 10; i++) {
      const l = this.lineGroup.objects[i];
      l.position(0, 0, Math.random() * 800 - 400, Math.random() * 800 - 400)
        .color(1, 1, 1, 1);

    }

    rect.width = 900;
    rect.height = 300;

    rect.setColor(1, 1, 0, 1);

    this.vl.onUpdate = this.onUpdate;

  }
  private onUpdate() {

    // this.rectGroup.intersects(this.vl.mouse.clientX, this.vl.mouse.clientY);
  }
  private destroyed() {
    console.log('destroyed');
  }
}
