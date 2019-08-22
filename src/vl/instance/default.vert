precision highp float;
uniform float sineTime;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
attribute vec3 translate;
attribute vec4 color;
attribute vec4 orientationStart;
attribute vec4 orientationEnd;
varying vec3 vPosition;
varying vec4 vColor;
void main(){
  vPosition=translate+position;
  vColor=color;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(vPosition,1.);
}
