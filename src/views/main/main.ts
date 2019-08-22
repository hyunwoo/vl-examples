import { Vue, Component } from 'vue-property-decorator';
import * as THREE from 'three';
import VL from '@/vl';
import InstanceGroup from '@/vl/Instance/instanceGroup';
import { isUndefined } from 'util';


@Component({})
export default class Main extends Vue {
  public $refs!: { renderer: HTMLElement };
  private created() {
    console.log('created');
  }
  private mounted() {
    console.log(THREE);
    // console.log('mounted');

    console.log(this.$refs.renderer, 'renderer');
    const vl = new VL(this.$refs.renderer);

    // vl.addObject();
    vl.scene.background = new THREE.Color('#333333');

    const ig = vl.createInstanceGroup(
      new THREE.CircleBufferGeometry(0.1, 6), 10);



    ig.move(0, 0, .1, 0);

  }
  private destroyed() {
    console.log('destroyed');
  }
}
