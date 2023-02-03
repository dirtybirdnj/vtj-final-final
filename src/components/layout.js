
import Header from './header'

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <footer>
        <div>This is my footer</div>
      </footer>
    </div>
  );
}