import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/js/libs/stats.min.js';
import { Object3D } from 'three';
import { DrawingTransform } from './transform';
import InstanceGroup from './instance/instanceGroup';
import RenderGroup from './base/renderObject';
import _ from 'lodash';

/**
 * 전체적인것을 다 할 필요는 없다.
 * 즉, 3D Object 를 띄우거나 하는것은 테스트로 충분
 *
 * 반드시 해야하는것 먼저 한다
 *
 * TODOS
 * 1. 기본도형 그리기
 * 2. 기본도형 커스터마이징
 * 3. position, scale 등에 대한 animation
 * 4. shader
 */
class VL {
  public camera: THREE.Camera;
  public renderer: THREE.WebGLRenderer;
  public width: number;
  public height: number;
  public scene: THREE.Scene;
  public renderGroups: RenderGroup[] = [];
  public constructor(parent: HTMLElement) {

    this.width = parent.clientWidth;
    this.height = parent.clientHeight;
    // init renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    parent.appendChild(this.renderer.domElement);
    // init scene
    this.scene = new THREE.Scene();

    // init camera
    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 1, 1000);
    this.camera.position.z = 2;

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    pointLight.translateX(1000);
    pointLight.translateY(200);
    pointLight.translateZ(-300);
    this.scene.add(pointLight);
    this.scene.add(this.camera);
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.addEventListener('change', render);
    this.render();
    console.log(this.scene);
    requestAnimationFrame(this.render.bind(this));
    console.log('VL CREATED');
  }

  public createInstanceGroup(unit: THREE.BufferGeometry, count: number) {
    const ig = new InstanceGroup(this.scene, unit, count);
    ig.attachToScene();
    this.renderGroups.push(ig);
    return ig;
  }

  public addRenderGroup(renderGroup: RenderGroup) {
    this.renderGroups.push(renderGroup);
  }

  public removeRenderGroup(renderGroup: RenderGroup) {
    return this.removeRenderGroupById(renderGroup.id);
  }
  public removeRenderGroupById(id: string) {
    const index = _.findIndex(this.renderGroups, o => o.id === id);
    if (index >= 0) {
      const group = this.renderGroups[index];
      group.detachToScene();
      this.renderGroups.splice(index, 1);
      return group;
    } else {
      throw new Error(`[Group not found] ${id}에 해당하는 그룹을 찾을 수 없습니다.`);
    }

  }
  public addObject() {
    // add object
    const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
    const object = new THREE.Mesh(new THREE.SphereBufferGeometry(75, 20, 10), material);
    object.position.set(0, 0, 0);
    const o: Object3D = new Object3D();
    this.scene.add(object);
    const t = new DrawingTransform(3);
    console.log(t.geometry);
    this.scene.add(t);
  }
  private render() {
    requestAnimationFrame(this.render.bind(this));
    this.onRender();
  }
  private onRender() {
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
    for (const g of this.renderGroups) {
      g.onUpdate();
    }
    for (const g of this.renderGroups) {
      g.onRender();
    }
  }
}

export default VL;

