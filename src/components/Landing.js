import '../styles/Landing.css'
import waveLanding from '../assets/waveLanding.svg'
import logo_plus from '../assets/logo_plus2.svg'
import logo_doc from '../assets/logo_doc.svg'
import { Link } from 'react-router-dom'
import { delay, motion } from "framer-motion";


function Landing(){
    return (
        <section 
        className='landing'
        >
            <div>
                <motion.p 
                className='msg-bienvenue'
                initial={{ opacity:0.8, x:"-200%"}}
                animate={{ opacity:1, x:"00%", transition:{duration:1, ease:[.2,.63,.31,.98]}}}
                exit={{ x:"100vw", transition:{duration:1.5, ease:[.2,.85,.45,.95]} }}
                >Bienvenue à toi</motion.p>

                <motion.p 
                initial={{ opacity:0.8, x:"-200%"}}
                animate={{ opacity:1, x:"00%", transition:{duration:1, ease:[.2,.63,.31,.98]}, delay:0.2}}
                exit={{ x:"100vw", transition:{duration:1.5, ease:[.2,.85,.45,.95]} }}
                className='msg'
                >Découvre les psychopathes qui terrorisent ton quartier grâce aux meilleurs docu-bangers concoctés par notre Chef étoilée Jeanne Tarantino</motion.p>
                

                {/* <img className='planet' src={planet} />
                <img className='blobblur' src={blobblur} /> */}
                
            </div>
            <img className='wave-landing' src={waveLanding} id='0'/>
            <a className='go-down' href='#1'></a>
            <a className='go-up' href='#0'></a>
            <ul className='list-button'>
                <motion.li 
                className='round-button'
                initial={{ opacity:0.8, x:"+200%"}}
                animate={{ opacity:1, x:"00%", transition:{duration:1, ease:[.2,.63,.31,.98], delay:0.7}}}
                exit={{ rotate:720, scale:0.2, transition:{duration:1.5, ease:[.2,.85,.45,.95]} }}
                >
                    <Link to="/add_docu">
                        <img src={logo_plus} className='logo' /* onClick={() => animation()} *//>
                    </Link>
                    {/* <img src={logo_plus} className='logo' onClick={() => animation()}/> */}
                </motion.li>
                <motion.li 
                className='round-button'
                initial={{ opacity:0.8, x:"+200%"}}
                animate={{ opacity:1, x:"00%", transition:{duration:1, ease:[.2,.63,.31,.98], delay:0.7}}}
                exit={{ rotate:720, scale:0.2, transition:{duration:1.5, ease:[.2,.85,.45,.95]} }}
                >
                    <Link to="/all_docu">
                        <img src={logo_doc} className='logo' /* onClick={() => animation()} *//>
                    </Link>
                    {/* <img src={logo_plus} className='logo' onClick={() => animation()}/> */}
                </motion.li>
            </ul>

            <motion.div className='left-layer' exit={{x:"200%", transition:{duration:1.3, ease:[0.645, 0.045, 0.355, 1]}}}></motion.div>
            <motion.div className='left-layer left-layer--2' exit={{x:"100%", transition:{duration:1.3, ease:[0.645, 0.045, 0.355, 1], delay:0.3}}}></motion.div>
            <motion.div className='left-layer left-layer--3' exit={{x:"200%", transition:{duration:1.3, ease:[0.645, 0.045, 0.355, 1], delay:0.12}}}></motion.div>
            <motion.div className='left-layer left-layer--4' exit={{x:"200%", transition:{duration:1.4, ease:[0.645, 0.045, 0.355, 1], delay:0.2}}}></motion.div>


        </section>
    )
}

function animation(){
    
    var layers = document.querySelectorAll('.left-layer')
    console.log(layers)
    for (const layer of layers){
        layer.classList.toggle('active');
    }
}

export default Landing