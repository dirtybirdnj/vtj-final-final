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

      return <Link key={i} className={currentRoute === page.path ? 'active' : ''} href={pagePath}>{navName ? navName : pageTitle}</Link>
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

  return (
    <>
      <div>HEADER</div>
      <div style={navStyleProps}>{links}</div>
    </>
  )
}
  
export default Header
