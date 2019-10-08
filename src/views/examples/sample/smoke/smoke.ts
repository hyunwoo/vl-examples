// file created at 2019-10-8
// Auto-generated files smoke.ts

import { Vue, Component } from 'vue-property-decorator';
import VIRE from '@/vire';
import { SmokeText } from '@/vire/group/smoke';

@Component({})
export default class Smoke extends Vue {
  public $refs!: { renderer: HTMLElement };
  private vire!: VIRE;
  private smokeText!: SmokeText;
  private ui = {
    title: 'HELLO VIRE',
    description: 'vire particle & noise example',
  };

  private mounted() {
    this.vire = new VIRE(this.$refs.renderer);
    this.vire.appendStats();
    this.smokeText = new SmokeText(this.vire, {
      canvasWidth: 1600,
      canvasHeight: 1200,
      maxParticleCount: 40000
    });
    this.playText();

  }
  public get isPlayable() {
    return this.smokeText ? this.smokeText.isPlayable : false;
  }
  private async playText() {
    console.log(this.isPlayable);
    if (!this.isPlayable) {
      return;
    }
    await this.smokeText.reverse();
    this.smokeText.clear();
    this.smokeText.addText(this.ui.title, 100, 300,
      {
        fillStyle: '#fff',
        font: '600 76px roboto',
        textBaseline: 'top',
      });
    this.smokeText.addText(this.ui.description,
      100, 380,
      {
        fillStyle: '#fff',
        font: '400 32px roboto',
        textBaseline: 'top',
      });
    await this.smokeText.play(6);
  }


}
