// file created at 2019-9-18
// Auto-generated files exampleContainer.ts

import { Vue, Component } from 'vue-property-decorator';
import { UrlItem } from '../urlListContainer';

@Component({})
export default class ExampleContainer extends Vue {
  private urlItems: UrlItem[] = [
    // { category: 'Math', name: 'Transform', url: '/examples/math/transform' },
    // { category: 'Line', name: 'Line Basic', url: '/examples/line/basic00', disabled: true },
    // { category: 'Line', name: 'BasicLine1', url: '/examples/line/basic01', disabled: true },
    { category: 'Line', name: 'Line Radial Light', url: '/examples/line/radial-light' },
    { category: 'Line', name: 'Line Waveform', url: '/examples/line/waveform' },
    // { category: 'Point', name: 'Point Size4', url: '/examples/line/basic02', disabled: true },
    // { category: 'Point', name: 'Textured Point5', url: '/examples/line/basic03', disabled: true },
    // samples
    {
      category: 'Samples',
      name: 'Sine Wave (Line with Point)',
      url: '/examples/sample/line-with-point-movement-01'
    },
    {
      category: 'Samples',
      name: 'Twisted (Line with Point)',
      url: '/examples/sample/line-with-point-movement-02'
    },
    {
      category: 'Samples',
      name: 'Ellipse (Line with Point)',
      url: '/examples/sample/line-with-point-movement-03'
    },
    {
      category: 'Samples',
      name: 'Hexagon (Line with Point)',
      url: '/examples/sample/line-with-point-movement-04'
    },
    {
      category: 'Effects',
      name: 'Smoke Text',
      url: '/examples/sample/smoke-text'
    },
    {
      category: 'Effects',
      name: 'Morper',
      url: '/examples/sample/morper'
    },
    {
      category: 'Visualizations',
      name: 'Multi Network',
      url: '/examples/sample/multi-network'
    },
  ];
}
