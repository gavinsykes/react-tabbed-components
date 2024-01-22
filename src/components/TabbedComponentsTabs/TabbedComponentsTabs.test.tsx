import { render } from '@testing-library/react';
import TabbedComponentsTabs from './TabbedComponentsTabs';

describe('TabbedComponentsTabs', () => {
  test('throws an error if rendered outside of the TabbedComponents parent component', () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();
    expect(() => {
      render(
        <TabbedComponentsTabs>
        </TabbedComponentsTabs>
      );
    }).toThrow();
    console.error = originalConsoleError;
  });
});
