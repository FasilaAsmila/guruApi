import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import APIProviderList from './components/APIProviderList';
import APIServiceDetails from './components/APIServiceDetails';

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #41607a;
  position: relative;
`;

const ButtonContainer = styled.div<{ $isVisible: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 1;

  ${({ $isVisible }) => !$isVisible && 'display: none;'}
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  letter-spacing: 0.5px;
  font-size: 17px;
`;

const SidebarContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  z-index: 999;
  transition: opacity 0.3s ease;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
`;

const Sidebar = styled.div<{ $isVisible: boolean }>`
  width: 300px;
  height: 100vh;
  background-color: #415f7a;
  padding: 20px;
  border-left: 2px solid #0c98ff;
  position: fixed;
  right: ${({ $isVisible }) => ($isVisible ? '0' : '-300px')};
  top: 0;
  color: white;
  overflow-y: auto;
  transition: right 0.3s ease;
`;

const App: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedAPI, setSelectedAPI] = useState<string | null>(null);
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [isButtonVisible, setButtonVisible] = useState<boolean>(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider);
    setSelectedAPI(null);
    setSidebarVisible(false);
  };

  const handleAPISelect = (provider: string, api: string) => {
    setSelectedAPI(api);
    setSelectedProvider(provider);
    setSidebarVisible(false);
  };

  const handleShowProviders = () => {
    setSelectedAPI(null);
    setSelectedProvider(null);
    setSidebarVisible(true);
    setButtonVisible(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    if (isSidebarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarVisible]);

  const handleHideButton = () => {
    setButtonVisible(false);
  };

  return (
    <AppContainer>
      {/* Sidebar container with semi-transparent background */}
      <SidebarContainer $isVisible={isSidebarVisible}>
        <Sidebar ref={sidebarRef} $isVisible={isSidebarVisible}>
          <APIProviderList
            onProviderSelect={handleProviderSelect}
            onAPISelect={(provider, api) => {
              handleAPISelect(provider, api);
              handleHideButton(); 
            }}
          />
        </Sidebar>
      </SidebarContainer>

      {/* Button container with visibility based on the state */}
      <ButtonContainer $isVisible={isButtonVisible}>
        <Button onClick={handleShowProviders}>Explore web APIs</Button>
      </ButtonContainer>

      {/* Show API details if API is selected */}
      {selectedAPI && selectedProvider && (
        <APIServiceDetails provider={selectedProvider} api={selectedAPI} onShowProviders={handleShowProviders} />
      )}
    </AppContainer>
  );
};

export default App;
