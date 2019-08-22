import * as THREE from 'three';

// @ts-ignore
import vs from '!!raw-loader!./default.vert';
// @ts-ignore
import fs from '!!raw-loader!./default.frag';
import RenderGroup from '../base/renderObject';


export default class InstanceGroup extends RenderGroup {

  // initailizeShape에서 초기화
  private instanceGeometry!: THREE.InstancedBufferGeometry;
  private count: number;

  // initailizeBuffers 에서 초기화
  private positions!: Float32Array;
  private colors!: Float32Array;
  private scales!: Float32Array;

  private material: THREE.Material;


  private useAnimation: boolean = false;

  public constructor(scene: THREE.Scene, shape: THREE.BufferGeometry, count: number) {
    super(scene);
    this.count = count;
    this.initailizeShape(shape);
    this.initailizeBuffers(count);
    this.instanceGeometry.addAttribute('color',
      new THREE.InstancedBufferAttribute(this.colors, 4).setDynamic(true));
    this.instanceGeometry.addAttribute('translate',
      new THREE.InstancedBufferAttribute(this.positions, 3).setDynamic(true));

    // material
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        sineTime: { value: 1.0 }
      },
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.DoubleSide,
      transparent: true
    });
    //
    this.mesh = new THREE.Mesh(this.instanceGeometry, this.material);
  }
  // public set animate(use: boolean) {
  //   if (use) {
  //     this.positions
  //   }
  // }


  public translate(index: number, vec: THREE.Vector3): void;
  public translate(index: number, x: number, y: number, z: number): void;
  public translate(index: number, x: THREE.Vector3 | number, y?: number, z?: number) {
    if (index >= this.count) {
      throw new Error(`[Index overflow] ${index}번째 오브젝트에 접근하였습니다. 생성된 오브젝트 갯수 : ${this.count}`);
    }
    if (x instanceof THREE.Vector3) {
      this.positions.set([x.x, x.y, x.z], index * 3);
    } else {
      this.positions[index * 3] = x;
      this.positions[index * 3 + 1] = y ? y : 0;
      this.positions[index * 3 + 2] = z ? z : 0;
    }
  }

  public move(index: number, vec: THREE.Vector3): void;
  public move(index: number, x: number, y: number, z: number): void;
  public move(index: number, x: THREE.Vector3 | number, y?: number, z?: number) {
    if (index >= this.count) {
      throw new Error(`[Index overflow] ${index}번째 오브젝트에 접근하였습니다. 생성된 오브젝트 갯수 : ${this.count}`);
    }
    if (x instanceof THREE.Vector3) {
      this.positions[index * 3] += x.x;
      this.positions[index * 3 + 1] += x.y;
      this.positions[index * 3 + 2] += x.z;
    } else {
      this.positions[index * 3] += x;
      this.positions[index * 3 + 1] += y ? y : 0;
      this.positions[index * 3 + 2] += z ? z : 0;
    }
  }


  public onRender() {
    // TODO
  }
  public onUpdate() {
    // TODO
    this.positions[0] = 0.1;

  }

  private initailizeShape(shape: THREE.BufferGeometry) {
    this.instanceGeometry = new THREE.InstancedBufferGeometry();
    this.instanceGeometry.index = shape.index;
    this.instanceGeometry.addAttribute('position', shape.attributes.position);
  }

  private initailizeBuffers(count: number) {
    this.instanceGeometry.maxInstancedCount = count;
    this.positions = new Float32Array(count * 3);
    this.colors = new Float32Array(count * 4);
    this.scales = new Float32Array(count * 3);
    this.scales.fill(1);
    this.colors.fill(1);
    this.positions.fill(0);

    this.positions = new Float32Array(count * 3);
    this.colors = new Float32Array(count * 4);
    this.scales = new Float32Array(count * 3);
    this.scales.fill(1);
    this.colors.fill(1);
    this.positions.fill(0);
  }


}
