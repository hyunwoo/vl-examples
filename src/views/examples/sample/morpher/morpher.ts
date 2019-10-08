// file created at 2019-10-8
// Auto-generated files morpher.ts

import { Vue, Component } from 'vue-property-decorator';
import VIRE from '@/vire';
import { PlaneEffecter } from '@/vire/group/planeEffecter';
import { InstancePlaneGroup, InstanceCircleGroup } from '@/vire/group/instance';

@Component({})
export default class Morpher extends Vue {
  public $refs!: { renderer: HTMLElement };
  private vire!: VIRE;

  private mounted() {
    this.vire = new VIRE(this.$refs.renderer);
    this.vire.appendStats();
    const g = this.vire.createGroup(InstanceCircleGroup, 100);
    // g.initInstanceGeometry()

    const o = g.objects[0];
    o.position = {
      x: 10,
      y: 10,
      z: 10
    };
    o.size = {
      x: 10,
      y: 10,
      z: 1,
    };
    o.setColorHex('#f00');
    console.log('g', g);

  }
  private destroyed() {
    this.vire.release();
  }
}
