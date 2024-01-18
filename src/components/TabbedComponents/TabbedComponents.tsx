import React, { Dispatch, HTMLProps, MouseEvent, MouseEventHandler, ReactElement, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import TabbedComponentsTab from '../TabbedComponentsTab/';
import TabbedComponentsTabs from '../TabbedComponentsTabs/TabbedComponentsTabs';
import TabbedComponentsDisplay from '../TabbedComponentsDisplay/TabbedComponentsDisplay';

interface TabbedComponentsContextProps {
  activeTabIndex: number;
  onClick: (index: number) => MouseEventHandler<HTMLLIElement>;
}

function createTabbedComponentsContext() {
  return createContext<TabbedComponentsContextProps>(null!);
}

const TabbedComponentsContext = createTabbedComponentsContext();

export function useTabbedComponentsContext() {
  const context = useContext(TabbedComponentsContext);
  if (!context) {
    throw new Error(
      'TabbedComponents.* components must be rendered as child of TabbedComponents'
    );
  }
  return context;
}

interface TabbedComponentsProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  onChangeTab?: MouseEventHandler<HTMLLIElement>;
  defaultActiveTabIndex?: number;
}

function TabbedComponents({ children, defaultActiveTabIndex = 0, onChangeTab, ...divProps }: TabbedComponentsProps): ReactElement {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultActiveTabIndex);
  const onClick = (index: number) => (e: MouseEvent<HTMLLIElement>) => {
    setActiveTabIndex(index);
    if (onChangeTab) onChangeTab(e);
  }
  return (
    <TabbedComponentsContext.Provider value={{ activeTabIndex, onClick }}>
      <div {...divProps}>
        {children}
      </div>
    </TabbedComponentsContext.Provider>
  );
}

TabbedComponents.TabsList = TabbedComponentsTabs;
TabbedComponents.Tab = TabbedComponentsTab;
TabbedComponents.Display = TabbedComponentsDisplay;