import { Children, HTMLProps, ReactElement, useEffect } from 'react';
import { useTabbedComponentsContext } from '../TabbedComponents/TabbedComponents';
import { TabbedComponentsFunctionProvider } from '../TabbedComponentsTab/TabbedComponentsTab';

/**
 * TabbedComponentsTabsProps
 * 
 * @extends HTMLProps<HTMLUListElement>
 */
interface TabbedComponentsTabsProps extends HTMLProps<HTMLUListElement> {}

/**
 * TabbedComponentsTabs
 * 
 * @param props TabbedComponentsTabsProps 
 * @returns ReactElement<HTMLUListElement>
 */
export default function TabbedComponentsTabs({ children, ...uListProps }: TabbedComponentsTabsProps): ReactElement<HTMLUListElement> {
  const { activeTabIndex, onClick, reportTabsLength } = useTabbedComponentsContext();
  useEffect(() => {
    reportTabsLength(Children.toArray(children).length);
  },[]);
  return (
    <ul {...uListProps}>
      {Children.toArray(children).map((child,index) => 
        <TabbedComponentsFunctionProvider active={index === activeTabIndex} index={index} key={index} onClick={onClick(index)}>
          {child}
        </TabbedComponentsFunctionProvider>)}
    </ul>
  );
}