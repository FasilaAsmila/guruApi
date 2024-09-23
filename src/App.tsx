import React, { useState } from 'react';
import styled from 'styled-components';
import APIProviderList from './components/APIProviderList';
import APIServiceDetails from './components/APIServiceDetails';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  justify-content: center; 
  min-height: 100vh; 
  background: #41607a;
`;

const ButtonContainer = styled.div`
  margin: auto; /* Centers the button vertically */
  display: flex;
  justify-content: center; /* Centers the button horizontally */
  width: 100%; /* Optional: Ensure it takes up full width */
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

const App: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedAPI, setSelectedAPI] = useState<string | null>(null);
  const [showProviderList, setShowProviderList] = useState<boolean>(false); 

  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider);
    setSelectedAPI(null);
    setShowProviderList(false);
  };

  const handleAPISelect = (provider: string, api: string) => {
    setSelectedAPI(api);  
    setSelectedProvider(provider); // Keep the provider selected as well
  };

  const handleShowProviders = () => {
    setSelectedAPI(null);
    setSelectedProvider(null);
    setShowProviderList(true);
  };

  return (
    <AppContainer>
      {/* Only show the Sidebar if no API is selected */}
      {(!selectedAPI && showProviderList) && (
        <APIProviderList onProviderSelect={handleProviderSelect} onAPISelect={handleAPISelect} />
      )}

      {/* Hide Sidebar when an API is selected */}
      {selectedAPI && selectedProvider && (
        <APIServiceDetails provider={selectedProvider} api={selectedAPI}  onShowProviders={handleShowProviders}  />
      )}

      {!selectedAPI && !showProviderList && (
        <ButtonContainer>
          <Button onClick={() => setShowProviderList(true)}>Explore web APIs</Button>
        </ButtonContainer>
      )}
    </AppContainer>
  );
};


export default App;
