import React, { Children, HTMLProps, ReactElement, ReactNode, cloneElement, isValidElement } from 'react';
import { useTabbedComponentsContext } from '../TabbedComponents/TabbedComponents';

interface TabbedComponentsTabsProps extends HTMLProps<HTMLUListElement> {}

export default function TabbedComponentsTabs({ children, ...uListProps }: TabbedComponentsTabsProps) {
  const { activeTabIndex } = useTabbedComponentsContext();
  const isReactElement = (child: ReactNode): child is ReactElement => {
    return isValidElement(child);
  };
  Children.toArray(children).map(child => {
    if (!isReactElement(child)) {
      throw new Error();
    }
  })
  const childrenWithActiveAttribute = Children.map(children, (child,index) => cloneElement(child as ReactElement, {
    'data-active': index === activeTabIndex
  }));
  return (
    <ul {...uListProps}>
      {childrenWithActiveAttribute}
    </ul>
  );
}