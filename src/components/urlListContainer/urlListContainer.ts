// file created at 2019-9-18
// Auto-generated files urlListContainer.ts

import { Vue, Component, Prop } from 'vue-property-decorator';
import { UrlItem } from './index';
import _ from 'lodash';


@Component({})
export default class UrlListContainer extends Vue {
  public ui = {
    searchModel: '',
  };

  public get displayItems() {
    return _.filter(this.urlItems, item =>
      item.name.toLowerCase().indexOf(this.ui.searchModel.toLowerCase()) !== -1 ||
      item.category.toLowerCase().indexOf(this.ui.searchModel.toLowerCase()) !== -1);
  }
  @Prop()
  public urlItems!: UrlItem[];
  private mounted() {
    console.log(this.urlItems);
  }
}
