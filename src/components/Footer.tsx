import React from 'react';
import styled from 'styled-components';

import Link from './Link';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.container.secondary};
  width: 100%;
  color: ${({ theme }) => theme.colors.container.secondary};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 2fr;
  column-gap: ${({ theme }) => theme.scaling(3)};

  padding: ${({ theme }) => theme.scaling(2)};
  padding-bottom: ${({ theme }) => theme.scaling(3)};
  max-width: 1200px;
  margin: 0 auto;
`;

const SiteLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  & > * {
    width: 30%;
    text-align: center;
    margin-top: ${({ theme }) => theme.scaling(1)};
  }
`;

const CustomLink = styled(Link)`
  &:hover {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const Footer: React.FunctionComponent = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <SiteLinks>
          <CustomLink to="/">Hello</CustomLink>
          <CustomLink to="/">Login</CustomLink>
          <CustomLink to="/">Register</CustomLink>
          <CustomLink to="/">Hello</CustomLink>
          <CustomLink to="/">Hello</CustomLink>
          <CustomLink to="/">Hello</CustomLink>
          <CustomLink to="/">Hello</CustomLink>
        </SiteLinks>
        <div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
            perspiciatis in nemo ipsam? Est, quibusdam.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
            perspiciatis in nemo ipsam? Est, quibusdam.
          </p>
        </div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
