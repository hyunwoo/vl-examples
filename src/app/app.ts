import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  public drawer: boolean = false;

  public mounted() {
    // const ele = this.$refs.scr as HTMLElement;
    // ele.scrollTop = 100;
    // TODO
  }
}
