import React, { HTMLProps, MouseEvent, MouseEventHandler, ReactElement, ReactNode } from 'react';
import { useTabbedComponentsContext } from '../TabbedComponents/TabbedComponents';

export interface TabbedComponentsTabProps extends HTMLProps<HTMLLIElement> {
  children: ReactNode;
  index: number;
}

export default function TabbedComponentsTab({ children, index, ...liProps }: TabbedComponentsTabProps): ReactElement {
  const { onClick } = useTabbedComponentsContext();
  return (
    <li {...liProps} onClick={() => onClick(index)}>
      {children}
    </li>
  )
}