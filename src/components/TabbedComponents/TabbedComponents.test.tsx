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
  test('errors when given a different number of tabs and display children', () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();
    expect(() => {
      render(
        <TabbedComponents>
          <TabbedComponents.TabsList>
            <TabbedComponents.Tab>Tab 1</TabbedComponents.Tab>
            <TabbedComponents.Tab>Tab 2</TabbedComponents.Tab>
            <TabbedComponents.Tab>Tab 3</TabbedComponents.Tab>
          </TabbedComponents.TabsList>
          <TabbedComponents.Display>
            <p>Child 1</p>
          </TabbedComponents.Display>
        </TabbedComponents>
      );
    }).toThrow('The TabbedComponents component requires an equal number of tabs and display components.');
    console.error = originalConsoleError;
  });
});
