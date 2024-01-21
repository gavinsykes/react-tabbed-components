import { Dispatch, HTMLProps, MouseEvent, MouseEventHandler, ReactElement, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import TabbedComponentsTab from '../TabbedComponentsTab/TabbedComponentsTab';
import TabbedComponentsTabs from '../TabbedComponentsTabs/TabbedComponentsTabs';
import TabbedComponentsDisplay from '../TabbedComponentsDisplay/TabbedComponentsDisplay';

interface TabbedComponentsContextProps {
  activeTabIndex: number;
  onClick: (index: number) => MouseEventHandler<HTMLLIElement>;
  reportDisplayLength: Dispatch<SetStateAction<number>>;
  reportTabsLength: Dispatch<SetStateAction<number>>;
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

export default function TabbedComponents({ children, defaultActiveTabIndex = 0, onChangeTab, ...divProps }: TabbedComponentsProps): ReactElement {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultActiveTabIndex);
  const [tabsLength, reportTabsLength] = useState(0);
  const [displayLength, reportDisplayLength] = useState(0);
  if (tabsLength !== displayLength) {
    throw new Error('The TabbedComponents component requires an equal number of tabs and display components.');
  }
  const onClick = (index: number) => (e: MouseEvent<HTMLLIElement>) => {
    setActiveTabIndex(index);
    if (onChangeTab) onChangeTab(e);
  };
  return (
    <TabbedComponentsContext.Provider value={{ activeTabIndex, onClick, reportDisplayLength, reportTabsLength }}>
      <div {...divProps}>
        {children}
      </div>
    </TabbedComponentsContext.Provider>
  );
}

TabbedComponents.TabsList = TabbedComponentsTabs;
TabbedComponents.Tab = TabbedComponentsTab;
TabbedComponents.Display = TabbedComponentsDisplay;