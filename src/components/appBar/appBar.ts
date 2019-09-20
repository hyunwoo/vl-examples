// file created at 2019-9-18
// Auto-generated files appBar.ts

import { Vue, Component } from 'vue-property-decorator';



@Component({})
export default class AppBar extends Vue {
  private navItems: string[] = ['Examples', 'Document', 'Showcase'];
  private mounted() {
    console.log('mounted');
    console.log(this.$route);
  }
}
