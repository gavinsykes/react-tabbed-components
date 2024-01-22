import { render } from '@testing-library/react';

import TabbedComponents from './TabbedComponents';

describe('TabbedComponents', () => {
  test('renders the TabbedComponents component with a single tab', () => {
    expect(() => {
      render(
        <TabbedComponents>
          <TabbedComponents.TabsList>
            <TabbedComponents.Tab>Tab 1</TabbedComponents.Tab>
          </TabbedComponents.TabsList>
          <TabbedComponents.Display>
            <p>Testing 1, 2, 3</p>
          </TabbedComponents.Display>
        </TabbedComponents>
      );
    }).not.toThrow();
  });
});
