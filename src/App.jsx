const { useEffect } = React;
import "bulma/css/bulma.min.css";

const App = () => {
  useEffect(() => {
    const TOTAL_FRAMES = 50;
    const hero = document.querySelector('.hero');

    const generateSrc = nFrame => `./assets/frames/anillo-${nFrame}.webp`;
    const updateImage = nFrame => {
      const src = generateSrc(nFrame);
      hero.style.setProperty('--bg-portada', `url('${src}')`);
    };
    const preloadImages = () => {
      Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        const currentFrame = i + 1;
        const img = document.createElement('img');
        img.src = generateSrc(currentFrame);
      });
    };
    const showFrames = () => {
      const htmlHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollRest = htmlHeight - viewportHeight;
      const percentOfTotalScroll = window.scrollY / scrollRest;
      let numberOfFrame = ~~(percentOfTotalScroll * TOTAL_FRAMES) + 1;
      if (numberOfFrame > TOTAL_FRAMES) numberOfFrame = TOTAL_FRAMES;
      updateImage(numberOfFrame);
    };

    preloadImages();
    window.addEventListener('scroll', showFrames);
    return () => window.removeEventListener('scroll', showFrames);
  }, []);

  return (
    <div>
      <section className="hero is-fullheight"></section>
      <style>{`
        *,*::after,*::before{box-sizing:border-box;margin:0;padding:0;font-family:sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue';}
        a{-webkit-tap-highlight-color:transparent;}
        body{height:500vh;width:100%;--sb-track-color:#fff;--sb-thumb-color:cyan;--sb-size:9px;}
        body::-webkit-scrollbar{width:var(--sb-size);}
        body::-webkit-scrollbar-track{background:var(--sb-track-color);border-radius:1px;}
        body::-webkit-scrollbar-thumb{background:var(--sb-thumb-color);border-radius:1px;}
        @supports not selector(::-webkit-scrollbar){body{scrollbar-color:var(--sb-thumb-color) var(--sb-track-color);}}
        .hero{position:fixed;width:100%;min-height:100vh;inset:0;background-image:var(--bg-portada,url('assets/frames/0.webp'));background-size:contain;background-repeat:no-repeat;background-position:center;}
      `}</style>
    </div>
  );
};

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);
ReactDOM.createRoot(rootEl).render(<App />);
