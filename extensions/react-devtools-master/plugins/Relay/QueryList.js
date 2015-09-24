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

import type {OrderedMap} from 'immutable';

var React = require('react');
var decorate = require('../../frontend/decorate');
var Query = require('./Query');

class QueryList {
  props: {
    queries: OrderedMap,
    selectQuery: (id: string) => void,
    selectedQuery: ?string,
  };

  render() {
    return (
      <ul style={styles.list}>
        {this.props.queries.valueSeq().map(q => (
        // $FlowFixMe react element
          <Query
            data={q}
            key={q.get('id')}
            isSelected={q.get('id') === this.props.selectedQuery}
            onSelect={() => this.props.selectQuery(q.get('id'))}
          />
        )).toArray()}
        {!this.props.queries.count() &&
          <li style={styles.empty}>No Relay Queries logged</li>}
      </ul>
    );
  }
}

var styles = {
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    overflow: 'auto',
    minHeight: 0,
    flex: 1,
  },

  empty: {
    padding: 50,
    textAlign: 'center',
  },
};

module.exports = decorate({
  store: 'relayStore',
  listeners: () => ['queries', 'selectedQuery'],
  props(store, props) {
    return {
      queries: store.queries,
      selectQuery: id => store.selectQuery(id),
      selectedQuery: store.selectedQuery,
    };
  },
}, QueryList);
