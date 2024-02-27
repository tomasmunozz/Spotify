import Menu from "../Menu/Menu";
import Music from "../Music/Music";
import "./Home.css";

function Home() {
  
  return (
    <>
      <header>
        <Menu />
      </header>

      <main>
        <div className="banner text-white ">
          <h3 className="fuente">Spoty Browser</h3>
          <h5>Top Tracks</h5>
          <Music /> 
          
        </div>
        
      </main>
      <section>
        
      </section>
    </>
  );
}

export default Home;
