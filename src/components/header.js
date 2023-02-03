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

    return <Link key={i} className={currentRoute === page.path ? 'active' : ''} href={page.path}>{page.file}</Link>
  })

  return (
    <>
      <div>HEADER</div>
      <div>{links}</div>
    </>
  )
}
  
export default Header
