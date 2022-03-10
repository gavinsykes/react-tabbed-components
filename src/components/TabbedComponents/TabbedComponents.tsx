import React, { Children, ReactElement, useEffect, useState } from 'react';
import TabbedComponentsTab from '../TabbedComponentsTab/';

export interface TabbedComponentsProps {
  children: ReactElement | Array<ReactElement>;
  customClassName?: string;
  tabNames: Array<string>;
}

function TabbedComponents(props: TabbedComponentsProps): ReactElement {
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { customClassName = 'TabbedComponents'} = props;

  useEffect(() => {
    if (props.tabNames.length !== Children.toArray(props.children).length) {
      setError(true);
      setErrorMessage('The length of the tabNames array needs to match the number of children.');
    }
  },[]);

  return (
    <div className={customClassName}>
      {error ? <p>{errorMessage}</p> : <><div className={`${customClassName}__tabs`}>
        {props.tabNames.map((tabName, index) => (
          <TabbedComponentsTab customClassName={customClassName} key={index} activeTab={index === activeTab} setActiveTab={setActiveTab} index={index} tabName={tabName}/>))}
      </div>
      <div className={`${customClassName}__component`}>
        {Children.toArray(props.children)[activeTab]}
      </div></>}
    </div>
  );
}

export default TabbedComponents;