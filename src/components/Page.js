import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import Icon from './Icon';

const Wrapper = styled.div`
  width: 100%;
  font-family: Palatino, serif;
`;

const Headline = styled.div`
  background: linear-gradient(180deg, #583ba2 0, #823aa5 100%);
  width: 100%;
  min-height: 40px;
  & > h1 {
    line-height: 90px;
    font-size: 36px;
    color: #fff;
    text-align: center;
    font-family: Palatino, Times, serif;
    font-weight: 700;
  }
`;

const Filters = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Source Sans Pro', 'Appcues-Roboto', Arial, sans-serif;
  & > * {
    margin-right: 50px;
  }
`;

const FlexGroup = styled.div`
  display: flex;
`;

const ViewLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  color: #7e89a9;
`;

const ActiveLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 100px;
  background-color: #f5f7fa;
  color: #593ca2;
`;

export const Content = styled.div`
  width: 1080px;
  margin: 0 auto;
`;

export default function Page({ className, pageTitle, filters, children }) {
  const [, view] = window.location.search.match(/view=(grid|list)/) || [];
  return (
    <Wrapper className={className}>
      <Headline>{pageTitle ? <h1>{pageTitle}</h1> : ''}</Headline>
      <Content>
        {filters && (
          <Filters>
            {filters}{' '}
            {view === 'list' ? (
              <FlexGroup>
                <ActiveLink>
                  <Icon icon="th-list" />
                </ActiveLink>
                <ViewLink to="?view=grid">
                  <Icon icon="th" />
                </ViewLink>{' '}
              </FlexGroup>
            ) : (
              <FlexGroup>
                <ViewLink to="?view=list">
                  <Icon icon="th-list" />
                </ViewLink>
                <ActiveLink>
                  <Icon icon="th" />
                </ActiveLink>
              </FlexGroup>
            )}
          </Filters>
        )}
        {children}
      </Content>
    </Wrapper>
  );
}

Page.propTypes = {
  className: PropTypes.string,
  pageTitle: PropTypes.string,
  filters: PropTypes.node,
  children: PropTypes.node,
};
