import _ from 'lodash';
import { Link } from 'gatsby-plugin-intl';
import React from 'react';
// @ts-ignore typescript definition of library faulty
import { ScreenClass } from 'react-awesome-styled-grid';
import styled, { css } from 'styled-components';

import { MenuInformationFragment } from '../../../types/graphql-types';
import * as colors from '../../style/colors';
import {
  applyMediaQueryMd,
  applyMediaQueryLg,
  contentMargin,
  headerHeight,
} from '../../style/dimensions';
import Burger from './burger';
import Flex from '../elements/flex';
import Title from '../elements/title';

interface Props {
  headerMenu?: MenuInformationFragment;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const StyledHeader = styled.header`
  background-color: ${colors.FreshDough};
  height: ${headerHeight.sm};
  left: 0;
  position: fixed;
  scroll-margin-top: ${headerHeight.sm};
  top: 0;
  width: 100%;
  z-index: 2;

  ${applyMediaQueryMd(css`
    height: ${headerHeight.md};
    scroll-margin-top: ${headerHeight.md};
  `)}

  ${applyMediaQueryLg(css`
    height: ${headerHeight.lg};
    scroll-margin-top: ${headerHeight.lg};
  `)}
`;

const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin: 0 auto;

  > * {
    margin: 0 ${contentMargin.sm};
  }

  ${applyMediaQueryMd(css`
    > * {
      margin: 0 ${contentMargin.md};
    }
  `)}

  ${applyMediaQueryLg(css`
    > * {
      margin: 0 ${contentMargin.lg};
    }
  `)}
`;

const RightMenu = styled(Flex)`
  > *:not(:last-child) {
    margin-right: 25px;
  }
`;

const HeaderMenuLink = styled(Link)`
  color: ${colors.DefaultFontColor};
  text-decoration: none;
`;

const Header: React.FC<Props> = ({ headerMenu, isMenuOpen, setIsMenuOpen }) => {
  return (
    <StyledHeader>
      <HeaderContent>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Title type="navTitle" title="12062020" />
        </Link>
        <RightMenu flexDirection="row">
          <ScreenClass
            render={(screen: string) => (
              <>
                {_.includes(['md', 'lg', 'xl'], screen) &&
                  headerMenu?.pages?.map((page, index) => (
                    <HeaderMenuLink
                      key={page?.slug ?? index}
                      to={`/${page?.slug}`}
                    >
                      {page?.title}
                    </HeaderMenuLink>
                  ))}
              </>
            )}
          />
          <Burger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </RightMenu>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;
