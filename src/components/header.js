import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const config = getConfig();
  const pages = config.publicRuntimeConfig.pages;

  const links = pages.map((page, i) => {
    console.log('page', page);

    if (page.path && (page.nav || page.title)) {
      return <Link key={i} className={currentRoute === page.path ? 'active' : ''} href={page.path}>{page.nav ? page.nav : page.title}</Link>
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
