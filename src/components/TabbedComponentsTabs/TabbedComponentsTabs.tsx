import { Children, HTMLProps, useEffect } from 'react';
import { useTabbedComponentsContext } from '../TabbedComponents/TabbedComponents';
import { TabbedComponentsFunctionProvider } from '../TabbedComponentsTab/TabbedComponentsTab';

interface TabbedComponentsTabsProps extends HTMLProps<HTMLUListElement> {}

export default function TabbedComponentsTabs({ children, ...uListProps }: TabbedComponentsTabsProps) {
  const { activeTabIndex, onClick, reportTabsLength } = useTabbedComponentsContext();
  useEffect(() => {
    reportTabsLength(Children.toArray(children).length);
  });
  return (
    <ul {...uListProps}>
      {Children.toArray(children).map((child,index) => 
        <TabbedComponentsFunctionProvider active={index === activeTabIndex} key={index} onClick={onClick(index)}>
          {child}
        </TabbedComponentsFunctionProvider>)}
    </ul>
  );
}