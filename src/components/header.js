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

  return (
    <>
      <div>HEADER</div>
      <div>{links}</div>
    </>
  )
}
  
export default Header
