import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f1f1f1;
  padding: 15px;
`;

const SidebarItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

interface SidebarProps {
  items: string[];
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, onItemClick }) => {
  return (
    <SidebarContainer>
      {items.map((item, index) => (
        <SidebarItem key={index} onClick={() => onItemClick(item)}>
          {item}
        </SidebarItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
