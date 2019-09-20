import { Component, Vue, Watch } from 'vue-property-decorator';


@Component({})
export default class App extends Vue {
  public drawer: boolean = false;
  private useTransition: boolean = true;

  @Watch('$route.path')
  public onRouteChange(after: string, before: string) {
    this.useTransition =
      !(after.indexOf('/examples') !== -1 && before.indexOf('/examples') !== -1);
  }

  public mounted() {
    // const ele = this.$refs.scr as HTMLElement;
    // ele.scrollTop = 100;

  }
}
