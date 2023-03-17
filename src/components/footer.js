import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import logoImage from '../../public/vtj-circle.svg';

const FooterEl = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 0 3%;

  @media only screen and (max-width: 559px) {
    padding: 8vw 0 3vh;
  }
`;

const Logo = styled(Image)`
  height: 8vh;
  width: auto;
  cursor: pointer;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 8px;
  font-size: 14px;
  padding-bottom: 8px;

  a {
    font-weight: bold;
    color: darkblue;
    font-size: 15px;
  }
`;

function Footer({
  pageData,
  currentRoute
}) {

  return (
    <FooterEl>
      <Logo onClick={() => router.push('/')} priority src={logoImage} alt="verticaltubejig.com logo" />
      <RightSide>
        <Link href="mailto: orders@verticaltubejig.com">orders@verticaltubejig.com</Link>
        <span>EST. 2023 Huntington, VT | <Link href="http://vtapi.co" target="_blank">vtapi.co</Link></span>
      </RightSide>
    </FooterEl>
  )
}

export default Footer
