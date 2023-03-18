import logo_validate from '../assets/logo_validate.svg';
import '../styles/Popup.css'
import {motion} from 'framer-motion'

function Popup(){
    return (
        <motion.div 
        className='popup-save-modif'
        initial={{opacity:0}}
        animate={{opacity:1}}
        >
            <img className="logo-validate" src={logo_validate}/>
            Modifications sauvegardées
        </motion.div>
    )
}

export default Popup