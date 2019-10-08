// file created at 2019-9-27
// Auto-generated files transform.ts

import { Vue, Component } from 'vue-property-decorator';
import VIRE from '@/vire';

@Component({})
export default class Transform extends Vue {
  public $refs!: { renderer: HTMLElement };
  private vl!: VIRE;

  private mounted() {
    this.vl = new VIRE(this.$refs.renderer);
    this.vl.setBackgroundColor(1, 1, 1);
    const rg = this.vl.createRectangleGroup(10);
  }
}
