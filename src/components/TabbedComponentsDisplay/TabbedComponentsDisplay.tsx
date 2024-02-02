import { Children, HTMLProps, ReactElement, useEffect } from 'react';
import { useTabbedComponentsContext } from '../TabbedComponents/TabbedComponents';

/**
 * TabbedComponentsDisplayProps
 * 
 * @extends HTMLProps<HTMLDivElement> 
 */
interface TabbedComponentsDisplayProps extends HTMLProps<HTMLDivElement> {}

/**
 * TabbedComponentsDisplay
 * 
 * @param props TabbedComponentsDisplayPrope 
 * @returns ReactElement<HTMLDivElement>
 */
export default function TabbedComponentsDisplay({ children, ...divProps }: TabbedComponentsDisplayProps): ReactElement<HTMLDivElement> {
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