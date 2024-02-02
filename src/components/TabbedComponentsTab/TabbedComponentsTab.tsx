import { HTMLProps, MouseEventHandler, ReactElement, ReactNode, createContext, useContext } from 'react';

interface TabbedComponentsFunctionContextProps {
  active: boolean;
  index: number;
  onClick: MouseEventHandler<HTMLLIElement>;
}

const TabbedComponentsFunctionContext = createContext<TabbedComponentsFunctionContextProps>(null!);

interface TabbedComponentsFunctionProviderProps extends TabbedComponentsFunctionContextProps {
  children: ReactNode;
}

export function TabbedComponentsFunctionProvider({ active, children, index, onClick }: TabbedComponentsFunctionProviderProps) {
  return (
    <TabbedComponentsFunctionContext.Provider value={{ active, index, onClick }}>
      {children}
    </TabbedComponentsFunctionContext.Provider>
  );
}

function useTabbedFunctionContext() {
  return useContext(TabbedComponentsFunctionContext);
}

/**
 * TabbedComponentsTabProps
 * 
 * @extends HTMLProps<HTMLLIElement>
 * @property children ReactNode
 */
interface TabbedComponentsTabProps extends HTMLProps<HTMLLIElement> {
  children: ReactNode;
}

/**
 * TabbedComponentsTab
 * 
 * @param props TabbedComponentsTabProps 
 * @returns ReactElement<HTMLLIElement>
 */
export default function TabbedComponentsTab({ children, ...liProps }: TabbedComponentsTabProps): ReactElement<HTMLLIElement> {
  const { active, index, onClick } = useTabbedFunctionContext();
  return (
    <li data-active={active} data-index={index} {...liProps} onClick={onClick}>
      {children}
    </li>
  );
}