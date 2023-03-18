import React from "react";
import '../styles/Carousel.scss'
import { slides } from '../datas/blog-item'
import logo_go from '../assets/logo_go.svg'



function useTilt(active) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}

const initialState = {
  slideIndex: 0
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1
    };
  }
};

function Slide({ slide, offset }) {
    const active = offset === 0 ? true : null;
    const ref = useTilt(active);

    return (
        <div
        ref={ref}
        className="slide"
        data-active={active}
        style={{
            "--offset": offset,
            "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
        }}
        >
        <div
            className="slideBackground"
            //Background du site
            /* style={{
            backgroundImage: `url('${slide.image}')`
            }} */
        />
        <div
            className="slideContent"
            style={{
            backgroundImage: `url('${slide.image}')`
            }}
        >
            <div className="slideContentInner">
                <h2 className="slideTitle">{slide.title}</h2>
                <h3 className="slideSubtitle">{slide.platforme}</h3>
                <p className="slideDescription">{slide.theme}</p>
                <button ><img src={logo_go} className='logo-go'/></button>
            </div>
        </div>
        </div>
    );
}

    function Carousel() {
    const [state, dispatch] = React.useReducer(slidesReducer, initialState);

    return (
        <div className="container" id="1">
            <button className="slide-button" onClick={() => dispatch({ type: "NEXT" })}>‹</button>

            <div className="slides">

                {[...slides, ...slides, ...slides].map((slide, i) => {
                    let offset = slides.length + (state.slideIndex - i);
                    return <Slide slide={slide} offset={offset} key={i} />;
                })}

            </div>
            <button className="slide-button" onClick={() => dispatch({ type: "PREV" })}>›</button>

        </div>
    );
}

export default Carousel;
