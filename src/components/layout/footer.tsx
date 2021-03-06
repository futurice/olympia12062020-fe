import {
  IntlContextConsumer,
  changeLocale,
  useIntl,
  Link,
} from 'gatsby-plugin-intl';
import React, { FC, useContext } from 'react';
import { Container, Row, Col } from 'react-awesome-styled-grid';
import styled, { css } from 'styled-components';

import { MenuInformationFragment } from '../../../types/graphql-types';
import IconOlympia from '../../icons/icon-olympia.svg';
import IconChilicorn from '../../icons/icon-chilicorn.svg';
import * as colors from '../../style/colors';
import {
  contentMargin,
  applyMediaQueryMd,
  applyMediaQueryLg,
} from '../../style/dimensions';
import Flex from '../elements/flex';
import SocialMediaIcon from '../elements/socialMediaIcon';
import PageContext from '../pageContext';

interface Props {
  footerMenu?: MenuInformationFragment;
  siteMap?: MenuInformationFragment;
}

const FooterContainer = styled.div`
  padding: 20px ${contentMargin.sm};

  ${applyMediaQueryMd(css`
    padding: 0 ${contentMargin.md};
  `)}

  ${applyMediaQueryLg(css`
    padding: 0 ${contentMargin.lg};
  `)}
`;

const Divider = styled.hr`
  border-style: solid;
  color: ${colors.Grey300};
  margin: 60px 0;
`;

const FooterIcon = styled(IconOlympia)`
  height: 75px;
  margin-bottom: 40px;
  width: 75px;

  ${applyMediaQueryMd(css`
    height: 94px;
    width: 94px;
  `)}
`;

const SiteMapLink = styled(Link)`
  color: ${colors.DefaultFontColor};
  font-size: 21px;
  padding-bottom: 20px;
  text-decoration: none;

  :hover {
    color: ${colors.Grey700};
  }
`;

const LanguageDivider = styled.hr`
  border-style: solid;
  color: ${colors.Grey300};
  margin: 55px 0 40px;
`;

const LanguageContainer = styled.div`
  display: flex;
  font-size: 16px;
  margin-bottom: 25px;

  > * {
    margin-left: 16px;
  }
`;

const LanguageLink = styled.a`
  cursor: pointer;
  text-transform: uppercase;
`;

const FooterLink = styled(Link)`
  color: ${colors.Grey600};
  font-size: 14px;
  line-height: 150%;
  text-decoration: none;

  ::after {
    content: ' · ';
    white-space: pre;
  }

  :last-child::after {
    content: '';
  }
`;

const FooterButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.Grey600};
  font-size: 14px;
  line-height: 150%;
  padding: 0;
  text-decoration: none;

  ::after {
    content: ' · ';
    white-space: pre;
  }
`;

const FuturiceLink = styled.a`
  align-items: center;
  color: ${colors.Grey700};
  display: flex;
  font-size: 14px;
  margin-bottom: 30px;
  text-decoration: none;
`;

const Footer: FC<Props> = ({ footerMenu, siteMap }) => {
  const intl = useIntl();
  const { setDisplayCookieBanner } = useContext(PageContext);

  const siteMapPages = siteMap?.pages ?? [];
  const siteMapHalfLength = Math.ceil(siteMapPages.length / 2);
  const [leftSiteMapPages, rightSiteMapPages] = [
    siteMapPages.slice(0, siteMapHalfLength),
    siteMapPages.slice(siteMapHalfLength, siteMapPages.length),
  ];

  return (
    <FooterContainer>
      <Container fluid>
        <Row>
          <Col noGutter xs={12}>
            <Divider />
          </Col>
        </Row>
        <Row>
          <Col noGutter xs={12} sm={5} md={5}>
            <FooterIcon />
          </Col>
          <Col noGutter xs={12} sm={3} md={2}>
            {leftSiteMapPages.map((page, index) => (
              <SiteMapLink
                key={page?.slug ?? index}
                to={`/${page?.slug !== 'home' ? page?.slug : '/'}`}
              >
                {page?.title}
              </SiteMapLink>
            ))}
          </Col>
          <Col noGutter xs={12} sm={4} md={5}>
            {rightSiteMapPages.map((page, index) => (
              <SiteMapLink key={page?.slug ?? index} to={`/${page?.slug}`}>
                {page?.title}
              </SiteMapLink>
            ))}
          </Col>
        </Row>
        <Row>
          <Col noGutter xs={12}>
            <LanguageDivider />
          </Col>
        </Row>
        <Row>
          <Col noGutter xs={12} sm={8} md={10}>
            <LanguageContainer>
              {intl.formatMessage({ id: 'footer.language' })}
              <IntlContextConsumer>
                {({ languages }: { languages: string[] }) =>
                  languages.map(language => (
                    <LanguageLink
                      key={language}
                      onClick={() => changeLocale(language)}
                    >
                      {language}
                    </LanguageLink>
                  ))
                }
              </IntlContextConsumer>
            </LanguageContainer>
          </Col>
          <Col noGutter xs={12} sm={4} md={2} align={{ sm: 'flex-end' }}>
            <Flex flexDirection="row" style={{ marginBottom: '35px' }}>
              <SocialMediaIcon network="facebook" type="footer" />
              <SocialMediaIcon network="instagram" type="footer" />
              <SocialMediaIcon network="youtube" type="footer" />
            </Flex>
          </Col>
        </Row>
        <Row>
          <Col noGutter>
            <Flex
              flexDirection="row"
              style={{ marginBottom: '40px', flexWrap: 'wrap' }}
            >
              <FooterButton onClick={() => setDisplayCookieBanner(true)}>
                {intl.formatMessage({ id: 'footer.cookieSettings' })}
              </FooterButton>
              {footerMenu?.pages?.map((page, index) => (
                <FooterLink key={page?.slug ?? index} to={`/${page?.slug}`}>
                  {page?.title}
                </FooterLink>
              ))}
            </Flex>
          </Col>
        </Row>
        <Row>
          <Col noGutter>
            <FuturiceLink href="https://spiceprogram.org/" target="_blank">
              <IconChilicorn style={{ marginRight: '8px' }} />
              Built with love by Futurice
            </FuturiceLink>
          </Col>
        </Row>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
