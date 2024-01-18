import { Children, HTMLProps } from 'react';
import { useTabbedComponentsContext } from '../TabbedComponents/TabbedComponents';

interface TabbedComponentsDisplayProps extends HTMLProps<HTMLDivElement> {}

export default function TabbedComponentsDisplay({ ...divProps }: TabbedComponentsDisplayProps) {
  const { activeTabIndex } = useTabbedComponentsContext();
  return (
    <div {...divProps}>
      {Children.toArray(divProps.children)[activeTabIndex]}
    </div>
  );
}