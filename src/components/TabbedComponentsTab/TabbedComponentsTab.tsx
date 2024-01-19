import { HTMLProps, MouseEventHandler, ReactElement, ReactNode, createContext, useContext } from 'react';

interface TabbedComponentsFunctionContextProps {
  active: boolean;
  onClick: MouseEventHandler<HTMLLIElement>;
}

const TabbedComponentsFunctionContext = createContext<TabbedComponentsFunctionContextProps>(null!);

interface TabbedComponentsFunctionProviderProps {
  active: boolean;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLLIElement>;
}

export function TabbedComponentsFunctionProvider({ active, children, onClick }: TabbedComponentsFunctionProviderProps) {
  return (
    <TabbedComponentsFunctionContext.Provider value={{ active, onClick }}>
      {children}
    </TabbedComponentsFunctionContext.Provider>
  );
}

function useTabbedFunctionContext() {
  return useContext(TabbedComponentsFunctionContext);
}

interface TabbedComponentsTabProps extends HTMLProps<HTMLLIElement> {
  children: ReactNode;
}

export default function TabbedComponentsTab({ children, ...liProps }: TabbedComponentsTabProps): ReactElement {
  const { active, onClick } = useTabbedFunctionContext();
  return (
    <li data-active={active} {...liProps} onClick={onClick}>
      {children}
    </li>
  );
}