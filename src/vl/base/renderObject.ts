import { v1 as uuid } from 'uuid';
import * as THREE from 'three';

export default abstract class RenderGroup {
  public id: string;
  protected scene: THREE.Scene;
  protected mesh: THREE.Mesh = new THREE.Mesh();
  public constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.id = uuid();
  }

  public attachToScene() {
    this.scene.add(this.mesh);
  }
  public detachToScene() {
    this.scene.remove(this.mesh);
  }
  public abstract onUpdate(): void;
  public abstract onRender(): void;
}
