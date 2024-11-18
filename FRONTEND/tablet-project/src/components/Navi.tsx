import '../App.css';

export default function Navigation() {
  return (
    <div>
      <section className="navigation">
        <div className="nav-links">
          <a href="/kezdolap">Kezdőlap</a>
          <a href="/tabletlista">Tabletek</a>
          <a href="/tabletfelvetel">Tabletek felvétele</a>
          <a href="/tablettorles">Tabletek törlése</a>
        </div>
      </section>
    </div>
  );
}
