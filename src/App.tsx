/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SlideDeck } from './components/layout/SlideDeck';
import { ErrorGuard } from './components/layout/ErrorGuard';

export default function App() {
  return (
    <ErrorGuard retryAfter={400}>
      <SlideDeck />
    </ErrorGuard>
  );
}

