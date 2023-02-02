export default function Layout({ children }) {
  return (
    <div>
      <header>
        <div>This is my header</div>
      </header>
      <main>{children}</main>
      <footer>
        <div>This is my footer</div>
      </footer>
    </div>
  );
}