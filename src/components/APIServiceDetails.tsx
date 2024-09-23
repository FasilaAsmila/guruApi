import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  padding: 20px;
  color: white;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  margin-top: 20px;
   letter-spacing: 0.5px;
    font-size: 17px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
`;

const Title = styled.h3`
  margin-left: 20px;
  font-weight: 400;
    font-size: 22px;
`;

const LogoImage = styled.img`
  max-width: 75px;
  max-height: 75px;
  margin-right: 10px;
`;

const DescriptionText = styled.p`
  font-size: 1.2rem; 
 
`;

const DescriptionData = styled.p`
  font-size: 1rem; 
  display: flex;
    margin: 10px 0;
    
`;
const DescriptionMargin = styled.p`

      margin: 0 30px 0 0;
    width: 35px;
    
`;

const DescriptionDatas = styled.a`
  color: white;
   margin: 10px 0;
     display: inline-block;
     font-size:1rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
`;

const DescriptionDatas2 = styled.a`
  color: white;
  //  margin: 10px 0;
     display: inline-block;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
`;


interface APIServiceDetailsProps {
  provider: string;
  api: string;
  onShowProviders: () => void;
}

const APIServiceDetails: React.FC<APIServiceDetailsProps> = ({ provider, api, onShowProviders }) => {
  const [apiDetails, setApiDetails] = useState<any>(null);

  useEffect(() => {
    fetch(`https://api.apis.guru/v2/${provider}.json`)
      .then((response) => response.json())
      .then((data) => {
        setApiDetails(data.apis[api]);
     
      })
      .catch((error) => console.error('Error fetching API details:', error));
  }, [provider, api]);

  if (!apiDetails) {
    return <div>Loading...</div>;
  }

 

  // Safely extract nested properties, providing default values if undefined
  const title = apiDetails?.info?.title || '';
  const description = apiDetails?.info?.description || '';
  const contact = apiDetails?.info?.contact || {};
  const logoUrl = apiDetails?.info?.['x-logo']?.url || null;
  const swaggerUrl = apiDetails?.swaggerUrl || '';



  return (
    <DetailsContainer>
  
  <HeaderContainer>
        
        {logoUrl && <LogoImage src={logoUrl} alt={`${title} Logo`} />}

        <Title> {title}</Title>
      </HeaderContainer>
      <DescriptionText>Description <DescriptionData>{description}
        </DescriptionData></DescriptionText>

      <DescriptionText>Swagger
         <br/>
      <DescriptionDatas href={swaggerUrl} target="_blank" rel="noopener noreferrer">{swaggerUrl}</DescriptionDatas>
      </DescriptionText>
   

      {/* Contact details */}
      <DescriptionText>Contact</DescriptionText>
      <DescriptionData><DescriptionMargin>Email
        </DescriptionMargin> {contact?.email || '-'}</DescriptionData>
      <DescriptionData><DescriptionMargin> Name </DescriptionMargin>{contact?.name || '-'}</DescriptionData>
   
      <DescriptionData><DescriptionMargin> Url </DescriptionMargin><DescriptionDatas2 href={contact?.url} target="_blank" rel="noopener noreferrer">{contact?.url || '-'}</DescriptionDatas2></DescriptionData>

      

      <Button onClick={onShowProviders}>Explore more APIs</Button>
    </DetailsContainer>
  );
};

export default APIServiceDetails;
