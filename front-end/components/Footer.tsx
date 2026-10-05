export default function Footer() {
  const link = "block mb-1.5 text-sm text-white/85 hover:text-white";
  return (
    <footer className="mt-14 bg-brand-dark px-5 pb-5 pt-11 text-white">
      <div className="mx-auto grid max-w-6xl gap-7 sm:grid-cols-2 lg:grid-cols-4">
        <div><h4 className="mb-2.5 flex items-center gap-2 font-bold"><img src="/images/logo.svg" alt="Fusion Wok logo" className="h-7 w-7" />Fusion Wok</h4><p className="text-sm text-white/85">Fresh, fast and full of flavour. Made daily with quality ingredients.</p></div>
        <div><h4 className="mb-2.5 font-bold">Opening hours</h4><p className={link}>Mon to Thu: 12pm to 11pm</p><p className={link}>Fri to Sun: 12pm to 1am</p></div>
        <div><h4 className="mb-2.5 font-bold">Contact</h4><p className={link}>📍 123 Main Street, Your City</p><p className={link}>📞 +92 300 0000000</p><p className={link}>✉️ hello@fusionwok.example</p></div>
        <div><h4 className="mb-2.5 font-bold">Quick links</h4><a className={link} href="#hot">Hot items</a><a className={link} href="#burgers">Menu</a><a className={link} href="#">Back to top</a></div>
      </div>
      <div className="mx-auto mt-7 max-w-6xl border-t border-white/30 pt-4 text-center text-sm text-white/85">© 2026 Fusion Wok. All rights reserved.</div>
    </footer>
  );
}
