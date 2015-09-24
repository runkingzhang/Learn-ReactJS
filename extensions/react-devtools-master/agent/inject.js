/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

import type {DataType, RendererID, OpaqueNodeHandle, Helpers, Hook} from '../backend/types';

var setupBackend = require('../backend/backend');

type Agent = {
  addRoot: (renderer: RendererID, el: OpaqueNodeHandle) => void,
  onMounted: (renderer: RendererID, el: OpaqueNodeHandle, data: DataType) => void,
  onUpdated: (el: OpaqueNodeHandle, data: DataType) => void,
  onUnmounted: (el: OpaqueNodeHandle) => void,
  setReactInternals: (renderer: RendererID, internals: Helpers) => void,
  on: (evt: string, fn: (...args: Array<any>) => any) => any,
};

module.exports = function(hook: Hook, agent: Agent) {
  var subs = [
    hook.sub('renderer-attached', ({id, renderer, helpers}) => {
      agent.setReactInternals(id, helpers);
      helpers.walkTree(agent.onMounted.bind(agent, id), agent.addRoot.bind(agent, id));
    }),
    hook.sub('root', ({renderer, element}) => agent.addRoot(renderer, element)),
    hook.sub('mount', ({renderer, element, data}) => agent.onMounted(renderer, element, data)),
    hook.sub('update', ({renderer, element, data}) => agent.onUpdated(element, data)),
    hook.sub('unmount', ({renderer, element}) => agent.onUnmounted(element)),
  ];

  var success = setupBackend(hook);
  if (!success) {
    return;
  }

  hook.emit('react-devtools', agent);
  hook.reactDevtoolsAgent = agent;
  agent.on('shutdown', () => {
    subs.forEach(fn => fn());
    hook.reactDevtoolsAgent = null;
  });
};
