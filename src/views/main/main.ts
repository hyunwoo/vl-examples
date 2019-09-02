import { Vue, Component } from 'vue-property-decorator';
import * as THREE from 'three';
import VL from '@/vl';
import InstanceGroup from '@/vl/group/instance/instanceGroup';
import { isUndefined } from 'util';
import { CircleBufferGeometry, Vector3 } from 'three';



@Component({})
export default class Main extends Vue {
  public $refs!: { renderer: HTMLElement };
  private created() {
    console.log('created');
  }
  private mounted() {
    const vl = new VL(this.$refs.renderer);
    // vl.addObject();
    vl.scene.background = new THREE.Color('#000');
    // const bg = vl.createInstanceGroup(new CircleBufferGeometry(100, 2), 10);
    const count = 1000;
    const igCount = 100;

    const ig = vl.createInstanceGroup(
      new THREE.CircleBufferGeometry(3, 3),
      igCount);


    const lg = vl.createLineGroup(count);
    const lines = lg.objects;
    lines[0].setWidth(50, 20)
      .setPosition(0, 0, 200, 200)
      .setColorHEX('#f0f');



    const points: THREE.Vector3[] = [];

    for (let i = 0; i < igCount; i++) {
      points.push(new Vector3(
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500, 0));
    }

    for (let i = 0; i < igCount; i++) {
      ig.transpose(i, points[i]);
    }

    for (let i = 0; i < count; i++) {
      const d1 = points[Math.floor(Math.random() * igCount)];
      const d2 = points[Math.floor(Math.random() * igCount)];
      lines[i].setColor(1, 1, 0, Math.random() * 0.2)
        .setPosition(d1.x, d1.y, d2.x, d2.y)
        .setWidth(1, 1);
    }


    console.log(lg);

    // bg.transpose(0, 200, 0, 0);
    // bg.transpose(1, 200, 100, 0);
    // bg.transpose(2, 200, 200, 0);
    // bg.size(0, 1, 1, 1);









    // const size = 10;
    // const ig = vl.createInstanceGroup(
    //   new THREE.CircleBufferGeometry(20, 4), size);



    // for (let i = 0; i < size; i++) {
    //   ig.translate(i, Math.random() * vl.width - vl.width / 2,
    //     Math.random() * vl.height - vl.height / 2, 0);
    //   ig.color(i, new THREE.Color().setRGB(Math.random(), Math.random(), Math.random()),
    //     0);
    //   // ig.rotate(i, 0, 0, tick);

    //   // ig.size(i, 0.5, 0.5);
    // }

    // let tick = 0;
    // setInterval(() => {
    //   ig.setAnimtaion(true, 0.1);
    //   for (let i = 0; i < size; i++) {
    //     ig.translate(i, Math.random() * vl.width - vl.width / 2,
    //       Math.random() * vl.height - vl.height / 2, 0);
    //     ig.color(i, new THREE.Color().setRGB(Math.random(), Math.random(), Math.random()),
    //       0.2 + Math.random() * 0.5);
    //     // ig.rotate(i, 0, 0, tick);
    //     tick += Math.random() * 20;
    //     // ig.size(i, Math.random(), Math.random());
    //   }

    // }, 1000);

  }
  private destroyed() {
    console.log('destroyed');
  }
}
