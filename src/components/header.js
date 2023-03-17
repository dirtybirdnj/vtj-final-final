import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import logoImage from '../../public/vtj-circle.svg';

const LogoContainer = styled.div`
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Logo = styled(Image)`
  height: 15vh;
  width: auto;
  cursor: pointer;
`;

const Subtitle = styled.div`
  display: flex;
  font-size: 18px;
  flex-wrap: wrap;
  gap: 1%;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
`;

const NavContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 30px 0px 10px;
  justify-content: center;
  gap: 15px;
`;

const LinkEl = styled(Link)`
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  color: darkblue;
  padding: 0 10px 2px;
  transition: 100ms;
  border-bottom: 3px solid transparent;
  transform: translate3d(0, 0, 0);

  &.active {
    border-color: black;
    transform: translate3d(0, -2px, 0);
    color: black;
    cursor: default;
  }
`;

// Mobile
const HeaderContainer = styled.div`
  padding-top: 3%;

  @media only screen and (max-width: 559px) {
    padding-top: 5%;

    ${NavContainer} {
      padding: 20px 0px 10px;
      gap: 5%;
    }

    ${Subtitle} {
      font-size: 13px;
    }

    ${LinkEl} {
      font-size: 14px;
      padding: 0 3px 2px;

      &.home {
        display: none;
      }
    }
  }
`;

function Header({
  pageData,
  currentRoute
}) {
  const router = useRouter();

  const links = pageData.map((page, i) => {
    //console.log('pageData', pageData);

    if (page.path && (page.data.nav || page.data.title)) {
      const pagePath = page.path;
      const pageTitle = page.data.title;
      const navName = page.data.nav;
      const pageOrder = page.data.navOrder ? page.data.navOrder : 100;
      
      const linkStyles = {
        order: pageOrder
      }

      return <LinkEl style={linkStyles} key={i} className={currentRoute === page.path ? ('active ' + navName.toLowerCase()) : navName.toLowerCase()} href={pagePath}>{navName ? navName : pageTitle}</LinkEl>
    } else {
      console.log('missing page props', page);
    }

  });

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo onClick={() => router.push('/')} priority src={logoImage} alt="verticaltubejig.com logo" />
        <Subtitle>
          <span>verticaltubejig.com</span>
          <span> | </span>
          <span>hand made in huntington vt</span>
        </Subtitle>
      </LogoContainer>
      <NavContainer>{links}</NavContainer>
    </HeaderContainer>
  )
}

export default Header
