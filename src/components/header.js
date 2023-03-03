import Link from 'next/link';

function Header({
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

  // Temp - will move to styled-components
  const navStyleProps = {
    display: 'flex',
    gap: '15px',
    padding: '20px 0px'
  }

  // Temp styles
  const containerStyles = {

    margin: '0px auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }

  const imgStyle = {
    maxWidth: '300px'
  }



  return (
    <>
      <div style={containerStyles}>
        <img style={imgStyle} src="vtj-circle.svg"/>
        <p>www.verticaltubejig.com</p>
        <p>EST. 2023 Huntington, VT</p>
      </div>
      <div style={navStyleProps}>{links}</div>
    </>
  )
}

export default Header
