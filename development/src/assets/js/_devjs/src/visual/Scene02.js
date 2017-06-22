/**
 * fileOverview:
 * Project:
 * File: Scene02
 * Date: 17/05/31
 * Author: Teraguchi
 */

import Entry from '../Core/Entry';
import audio from "./Utils/audio";

'use strict';

export default class Scene02 extends Entry{

  constructor() {

    super();

    this.scene = null;
    this.camera = null;
    this.step = 0;
    this.knot = null; // 結び目

    //トーラス生成で必要なパラメータ
    this.radius = 20;
    this.tube = 28.2;
    this.radialSegments = 600;
    this.tubularSegments = 12;
    this.p = 5;
    this.q = 4;
    this.heightScale = 4;
    this.asParticles = true;
    this.rotate = true;

    this.generateSprite = this._generateSprite.bind(this);
    this.createParticleSystem = this._createParticleSystem.bind(this);
    this.createMesh = this._createMesh.bind(this);


    this.createScene = this._createScene.bind(this);
    this.update = this._update.bind(this);

    this.createScene();

    window.console.log(this.camera.position.x);

  }


  audioInit(){

    // let ctx, analyser, frequencies, getByteFrequencyDataAverage, execute;
    //
    // window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // ctx = new AudioContext();
    //
    // analyser = ctx.createAnalyser();
    // frequencies = new Uint8Array(analyser.frequencyBinCount);
    //
    // getByteFrequencyDataAverage = function() {
    //   analyser.getByteFrequencyData(frequencies);
    //   return frequencies.reduce(function(previous, current) {
    //         return previous + current;
    //       }) / analyser.frequencyBinCount;
    // };
    //
    // navigator.mediaDevices.getUserMedia({audio: true})
    //     .then((stream) => {
    //       window.hackForMozzila = stream;
    //       ctx.createMediaStreamSource(stream)
    //       // AnalyserNodeに接続
    //           .connect(analyser);
    //     })
    //     .catch((err) => {
    //       window.console.log(err.message);
    //     });
    //
    // // 音量を表示する要素
    // this.elVolume = document.getElementById('volume');
    //
    // // 可能な限り高いフレームレートで音量を取得し、表示を更新する
    // execute = function() {
    //   this.elVolume.innerHTML = Math.floor(getByteFrequencyDataAverage());
    //   this.elVolumeVal = Math.floor(getByteFrequencyDataAverage());
    //
    //   requestAnimationFrame(execute);
    // }.bind(this);
    //
    // //
    // execute();
  }

  // from THREE.js examples
  _generateSprite() {

    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;

    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;

  }

  _createParticleSystem(geom) {
    const material = new THREE.ParticleBasicMaterial({
      color: 0xffffff,
      size: 3,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map: this.generateSprite()
    });

    const system = new THREE.ParticleSystem(geom, material);
    system.sortParticles = true;
    return system;
  }

  _createMesh(geom) {

    // assign two materials
    const meshMaterial = new THREE.MeshNormalMaterial({});
    meshMaterial.side = THREE.DoubleSide;

    // create a multimaterial
    const mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);

    return mesh;
  }

  /**
   * シーンを作成。オブジェクトを格納
   * @private
   */
  _createScene(){

    this.scene = new THREE.Scene(); //シーン作成

    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 5000);
    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 50;
    this.camera.lookAt(new THREE.Vector3(10, 0, 0));

    if (this.knot) this.scene.remove(this.knot);
    // create a new one
    let geom = new THREE.TorusKnotGeometry(this.radius, this.tube, Math.round(this.radialSegments), Math.round(this.tubularSegments), Math.round(this.p), Math.round(this.q), this.heightScale);

    if (this.asParticles) {
      this.knot = this.createParticleSystem(geom);
    } else {
      this.knot = this.createMesh(geom);
    }

    this.scene.add(this.knot);


  }

  /**
   *　画面リサイズイベント
   */
  _onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    // this.plane.mesh.material.uniforms.resolution.value.set(this.canvas.width, this.canvas.height);

  }


  /**
   * update関数
   * @private
   */
  _update(){
    // this.timer += 0.01;
    // let rad = 600 + Math.sin(this.timer) * 200;
    // this.camera.position.x = Math.sin(this.timer * 0.4) * Math.cos(this.timer * 0.3) * rad;
    // this.camera.position.y = Math.cos(this.timer * 0.4) * rad;
    // this.camera.position.z = Math.sin(this.timer * 0.4) * Math.sin(this.timer * 0.3) * rad;
    // this.camera.lookAt(new THREE.Vector3(0, 0, 100 * Math.cos(this.timer * 0.005)));
    // let time = performance.now() * 0.0005;
    // this.timer += 0.01;
    // let rad = 600 + Math.sin(this.timer) * 200;
    if (this.rotate) {
      this.knot.rotation.y = this.step += 0.005;
      // this.camera.position.x = Math.sin(this.timer * 0.4) * Math.cos(this.timer * 0.3) * rad;

    }



  }

}