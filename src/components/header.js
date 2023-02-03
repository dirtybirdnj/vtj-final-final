import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const config = getConfig();
  const pages = config.publicRuntimeConfig.pages;

  const links = pages.map((item, i) => {
    const strippedItem = item.split('.')[0];
    const path = strippedItem.includes('index') ? '/' : '/' + strippedItem;

    return <Link key={i} className={currentRoute === path ? 'active' : ''} href={path}>{strippedItem}</Link>
  })

  return (
    <>
      <div>HEADER</div>
      <div>{links}</div>
    </>
  )
}
  
export default Header
