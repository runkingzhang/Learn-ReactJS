/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

const { Panel } = require('dev/panel.js');
const { Class } = require('sdk/core/heritage');

// panel
// for docs, see
// https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs/dev_panel
const ReactPanel = Class({
  extends: Panel,
  label: 'React',
  tooltip: 'Debug & Develop React Apps',
  icon: './tool-react.png',
  url: './panel.html',
  setup(options) {
    // this.debuggee = options.debuggee;
  },
  dispose() {
    // this.debuggee = null;
  },
  onReady() {
    const tabs = require('sdk/tabs');
    let worker = makeWorker();

    const { MessageChannel } = require('sdk/messaging');
    const channel = new MessageChannel();
    const addonSide = channel.port1;
    const panelSide = channel.port2;

    function makeWorker() {
      const tmpWorker = tabs.activeTab.attach({
        contentScriptFile: 'build/contentScript.js',
      });
      tmpWorker.port.on('message', function(data) {
        addonSide.postMessage(data);
      });
      tmpWorker.port.on('hasReact', function(hasReact) {
        metaAddonSide.postMessage({type: 'hasReact', val: hasReact});
      });
      tmpWorker.port.on('unload', function() {
        metaAddonSide.postMessage('unload');
      });
      tmpWorker.on('error', function(error) {
        console.log('More Error!!', error);
      });
      tmpWorker.port.on('error', function(error) {
        console.log('Error!!', error);
      });
      return tmpWorker;
    }

    addonSide.onmessage = function(evt) {
      worker.port.emit('message', evt.data);
    };

    const metaChannel = new MessageChannel();
    const metaAddonSide = metaChannel.port1;
    const metaPanelSide = metaChannel.port2;

    tabs.activeTab.on('pageshow', function() {
      metaAddonSide.postMessage('show');
      worker = makeWorker();
    });

    this.postMessage('port', [panelSide, metaPanelSide]);
    console.log('Panel ready');
  },
});

exports.ReactPanel = ReactPanel;
