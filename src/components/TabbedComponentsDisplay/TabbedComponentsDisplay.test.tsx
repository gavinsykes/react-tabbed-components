import { render } from '@testing-library/react';
import TabbedComponentsDisplay from './TabbedComponentsDisplay';

describe('TabbedComponentsDisplay', () => {
  test('throws an error if rendered outside of the TabbedComponents parent component', () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();
    expect(() => {
      render(
        <TabbedComponentsDisplay></TabbedComponentsDisplay>
      );
    }).toThrow();
    console.error = originalConsoleError;
  });
});