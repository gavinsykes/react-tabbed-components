import React, { Dispatch, ReactElement, SetStateAction } from 'react';

export interface TabbedComponentsTabProps {
  activeTab: boolean;
  customClassName: string;
  index: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  tabName: string;
}

function TabbedComponentsTab(props: TabbedComponentsTabProps): ReactElement {
  return <button className={`${props.customClassName}__tab${props.activeTab ? ' active' : ''}`} onClick={() => props.setActiveTab(props.index)}>{props.tabName}</button>;
}

export default TabbedComponentsTab;