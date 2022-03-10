import React, { Children, ReactElement, useEffect, useState } from 'react';
import TabbedComponentsTab from '../TabbedComponentsTab/';

export interface TabbedComponentsProps {
  children: ReactElement | Array<ReactElement>;
  customClassName?: string;
  tabNames: Array<string>;
  [ propName: string ]: any;
}

function TabbedComponents(props: TabbedComponentsProps): ReactElement {
  const [activeTab, setActiveTab] = useState(0);
  const { customClassName = 'TabbedComponents'} = props;

  return (
    <div className={customClassName}>
      <div className={`${customClassName}__tabs`}>
        {props.tabNames.map((tabName, index) => (
          <TabbedComponentsTab customClassName={customClassName} key={index} activeTab={index === activeTab} setActiveTab={setActiveTab} index={index} tabName={tabName}/>))}
      </div>
      <div className={`${customClassName}__component`}>
        {Children.toArray(props.children)[activeTab]}
      </div>
    </div>
  );
}

export default TabbedComponents;