import {Route, Routes, useLocation} from "react-router-dom"
import Home from './Home';
import AddDocu from '../pages/AddDocu';
import AllDocu from '../pages/AllDocu';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes(){
    const location = useLocation();

    return(
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element = {<Home />} />
                <Route path="/add_docu" element = {<AddDocu />} />
                <Route path="/all_docu" element = {<AllDocu />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes