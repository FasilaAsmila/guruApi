import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Sidebar = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #41607a;
  padding: 20px;
  border-left: 2px solid #0c98ff;
  position: fixed;
  right: 0;
  top: 0;
  color: white;
   overflow-y: auto; 
`;
const ProviderContainer = styled.div`
  // padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #192531;
    color: white;
  }
`;

const ProviderItem = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #192531;
    color: white;
  }
`;

const APIItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  color: white
`;

const Logo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const Arrow = styled.span`
  font-size: 12px;
  margin-left: 10px;
`;

interface APIProviderListProps {
  onProviderSelect: (provider: string) => void;
  onAPISelect: (provider: string, api: string) => void;
}

interface APIData {
  title: string;
  version: string;
  description: string;
  logoUrl?: string;
}

const APIProviderList: React.FC<APIProviderListProps> = ({ onProviderSelect, onAPISelect }) => {
  const [providers, setProviders] = useState<string[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [apis, setApis] = useState<{ [key: string]: APIData }>({});
  const [loading, setLoading] = useState<boolean>(true);
 

  useEffect(() => {
    fetch('https://api.apis.guru/v2/providers.json')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setProviders(data.data); // Set providers as the array inside `data`
        } else {
          console.error('Unexpected API response format');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching providers:', error);
        setLoading(false);
      });
  }, []);

  const handleProviderClick = (provider: string) => {
    if (selectedProvider === provider) {
      setSelectedProvider(null); // Close if already open
    } else {
      setSelectedProvider(provider);
      fetch(`https://api.apis.guru/v2/${provider}.json`)
        .then((response) => response.json())
        .then((data) => {
          const apiDetails: { [key: string]: APIData } = {};
          Object.keys(data.apis).forEach((apiKey) => {
            apiDetails[apiKey] = {
              title: data.apis[apiKey].info.title,
              version: data.apis[apiKey].info.version,
              description: data.apis[apiKey].info.description,
              logoUrl: data.apis[apiKey].info['x-logo']?.url || '', // Optional logo URL
            };
          });
          setApis(apiDetails);
        })
        .catch((error) => console.error('Error fetching APIs:', error));
    }
  };

  const handleAPIItemClick = (provider: string, apiKey: string) => {
   
    onAPISelect(provider, apiKey); // Call the passed prop function
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!providers.length) {
    return <div>No provider found.</div>;
  }

  return (
    <Sidebar>
      <h3>Select Provider</h3>
      {providers.map((provider, index) => (
<ProviderContainer>


        <div key={index}>
          <ProviderItem onClick={() => handleProviderClick(provider)}>
            {provider}
            <Arrow>{selectedProvider === provider ? '▲' : '▼'}</Arrow>
          </ProviderItem>

          {/* Display API titles only when the provider is selected */}
          {selectedProvider === provider && (
            <>
              {Object.keys(apis).map((apiKey, index) => (
                <APIItem
                  key={index}
                  onClick={() => handleAPIItemClick(provider, apiKey)} // Separate function to handle click
                >
                  {apis[apiKey].logoUrl && (
                    <Logo src={apis[apiKey].logoUrl} alt={`${apis[apiKey].title} logo`} />
                  )}
                  {apis[apiKey].title}
                </APIItem>
              ))}
            </>
          )}
        </div>
        </ProviderContainer>
      ))}
    </Sidebar>
  );
};

export default APIProviderList;
