import React from 'react';
import { render } from '@testing-library/react';

import TabbedComponents from './TabbedComponents';

describe('TabbedComponents', () => {
  test('renders the TabbedComponents component with a single child', () => {
    render(
      <TabbedComponents tabNames={['Test']}>
        <p>Testing 1, 2, 3</p>
      </TabbedComponents>
    );
  });
});

describe('TabbedComponents', () => {
  test('renders the TabbedComponents component with multiple children', () => {
    render(
      <TabbedComponents tabNames={['Test','Test 2']}>
        <p>Testing 1, 2, 3</p>
        <p>Testing 4, 5, 6</p>
      </TabbedComponents>
    );
  });
});
