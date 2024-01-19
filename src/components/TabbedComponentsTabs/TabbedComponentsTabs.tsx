import { Children, HTMLProps, ReactElement, ReactNode, isValidElement } from 'react';
import { useTabbedComponentsContext } from '../TabbedComponents/TabbedComponents';
import { TabbedComponentsFunctionProvider } from '../TabbedComponentsTab/TabbedComponentsTab';

interface TabbedComponentsTabsProps extends HTMLProps<HTMLUListElement> {}

export default function TabbedComponentsTabs({ children, ...uListProps }: TabbedComponentsTabsProps) {
  const { activeTabIndex, onClick } = useTabbedComponentsContext();
  const isReactElement = (child: ReactNode): child is ReactElement => {
    return isValidElement(child);
  };
  Children.toArray(children).map(child => {
    if (!isReactElement(child)) {
      throw new Error();
    }
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