import Link from 'next/link';
import Image from 'next/image';

function Footer({
  pageData,
  currentRoute
}) {

  const links = pageData.map((page, i) => {
    //console.log('pageData', pageData);

    if (page.path && (page.data.nav || page.data.title)) {
      const pagePath = page.path;
      const pageTitle = page.data.title;
      const navName = page.data.nav;
      const pageOrder = page.data.navOrder ? page.data.navOrder : 100;
      const linkStyles = {
        display: 'flex',
        order: pageOrder
      }

      return <Link style={linkStyles} key={i} className={currentRoute === page.path ? 'active' : ''} href={pagePath}>{navName ? navName : pageTitle}</Link>
    } else {
      console.log('missing page props', page);
    }

  })

  const imgStyle = {
    maxWidth: '100px'
  }

  const containerStyles = {

    margin: '0px auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

  }

  return (
    <footer>
      <div style={containerStyles}>
        <Image style={imgStyle} src="/vtj-circle.svg" width="300" height="300" alt="verticaltubejig.com logo"/>
        <p>www.verticaltubejig.com</p>
        <p>orders@verticaltubejig.com</p>
        <p >EST. 2023 Huntington, VT</p>
        <p>vtapi.co</p>
      </div>
    </footer>
  )
}

export default Footer
