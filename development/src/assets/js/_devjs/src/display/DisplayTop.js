/**
 * fileOverview:
 * Project:
 * File: Display
 * Date:
 * Author: Teraguchi
 */

import SceneManger from "../visual/SceneManger";
import Scene01 from "../visual/Scene01";
import Scene02 from "../visual/Scene02";
import Scene03 from "../visual/Scene03";
// import OverScene from "../visual/overScene";

// import WebGLinit from './WebGLinit.js';

// import Canvas from "../visual/Canvas";

'use strict';

export default class DisplayTop {

  constructor(){

    this.setup();
    this.setEvents();

  }

  setup() {

    // アニメーションループスタート
    // gb.in.up.loop();
    
  }

  onLoad() {

    gb.in.sceneManger = new SceneManger();

    gb.in.sceneBoxA = new Scene01();
    gb.in.sceneBoxB = new Scene02();
    gb.in.sceneBoxC = new Scene03();
    gb.in.sceneBoxD = new Scene02();
    // gb.in.sceneOver = new OverScene();

    gb.in.sceneManger.addScene(gb.in.sceneBoxA);
    gb.in.sceneManger.addScene(gb.in.sceneBoxB);
    gb.in.sceneManger.addScene(gb.in.sceneBoxC);
    gb.in.sceneManger.addScene(gb.in.sceneBoxD);
    // gb.in.sceneManger.addScene(gb.in.sceneOver);

    gb.in.sceneManger.draw();

    // gb.in.canvas = new Canvas();
    // gb.in.canvas.init();


  }

  static run() {

		// window.console.log('static_Run');

  }

  setEvents() {

    $(window).on('load', this.onLoad.bind(this));        

  }

}