import { Children, HTMLProps, useEffect } from 'react';
import { useTabbedComponentsContext } from '../TabbedComponents/TabbedComponents';

interface TabbedComponentsDisplayProps extends HTMLProps<HTMLDivElement> {}

export default function TabbedComponentsDisplay({ children, ...divProps }: TabbedComponentsDisplayProps) {
  const { activeTabIndex, reportDisplayLength } = useTabbedComponentsContext();
  useEffect(() => {
    reportDisplayLength(Children.toArray(children).length);
  },[]);
  return (
    <div {...divProps}>
      {Children.toArray(children)[activeTabIndex]}
    </div>
  );
}