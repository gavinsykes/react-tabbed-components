import { fireEvent, render, screen } from '@testing-library/react';

import TabbedComponents from './TabbedComponents';

describe('TabbedComponents', () => {
  test('renders the TabbedComponents component with a single tab', () => {
    expect(() => {
      render(
        <TabbedComponents>
          <TabbedComponents.TabsList>
            <TabbedComponents.Tab data-testid="tab-1">Tab 1</TabbedComponents.Tab>
          </TabbedComponents.TabsList>
          <TabbedComponents.Display>
            <p data-testid="child-1">Testing 1, 2, 3</p>
          </TabbedComponents.Display>
        </TabbedComponents>
      );
    }).not.toThrow();
    expect(screen.getByTestId('tab-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
  });
  test('renders the TabbedComponents component with multiple tabs and a single child', () => {
    expect(() => {
      render(
        <TabbedComponents>
          <TabbedComponents.TabsList>
            <TabbedComponents.Tab data-testid="tab-1">Tab 1</TabbedComponents.Tab>
            <TabbedComponents.Tab data-testid="tab-2">Tab 2</TabbedComponents.Tab>
            <TabbedComponents.Tab data-testid="tab-3">Tab 3</TabbedComponents.Tab>
            <TabbedComponents.Tab data-testid="tab-4">Tab 4</TabbedComponents.Tab>
          </TabbedComponents.TabsList>
          <TabbedComponents.Display data-testid="display">
            <p data-testid="child-1">Child 1</p>
            <p data-testid="child-2">Child 2</p>
            <p data-testid="child-3">Child 3</p>
            <p data-testid="child-4">Child 4</p>
          </TabbedComponents.Display>
        </TabbedComponents>
      );
    }).not.toThrow();
    expect(screen.getByTestId('tab-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('display').children.length).toBe(1);
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
  test('successfully switches displays when a tab is clicked', () => {
    expect(() => {
      render(
        <TabbedComponents onChangeTab={e => console.log(e.currentTarget.textContent)}>
          <TabbedComponents.TabsList>
            <TabbedComponents.Tab data-testid="tab-1">Tab 1</TabbedComponents.Tab>
            <TabbedComponents.Tab data-testid="tab-2">Tab 2</TabbedComponents.Tab>
            <TabbedComponents.Tab data-testid="tab-3">Tab 3</TabbedComponents.Tab>
          </TabbedComponents.TabsList>
          <TabbedComponents.Display data-testid="display">
            <p data-testid="child-1">Child 1</p>
            <p data-testid="child-2">Child 2</p>
            <p data-testid="child-3">Child 3</p>
          </TabbedComponents.Display>
        </TabbedComponents>
      );
    }).not.toThrow();
    expect(screen.getByTestId('tab-1')).toBeInTheDocument();
    expect(screen.getByTestId('tab-2')).toBeInTheDocument();
    expect(screen.getByTestId('tab-3')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('tab-2'));
    expect(screen.getByTestId('tab-1')).toBeInTheDocument();
    expect(screen.getByTestId('tab-2')).toBeInTheDocument();
    expect(screen.getByTestId('tab-3')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('display').children.length).toBe(1);
  });
});
