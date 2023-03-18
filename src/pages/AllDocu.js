import '../styles/AllDocu.css';
import { slides } from '../datas/blog-item';
import { useState, useEffect } from 'react';
import logo_supprimer from '../assets/logo_supprimer.svg';
import logo_edit from '../assets/logo_edit.svg';
import { motion } from "framer-motion";
import { Tooltip } from 'react-tooltip';
import Popup from '../components/Popup';


function AllDocu(){

    const [blogs, setBlogs] = useState(null);

    //Pour avoir les données de la base de donnée
    useEffect(() => {
        fetch("https://json-server-2-57je.onrender.com/blogs")
        //attend d'avoir la réponse de la base de donnée pour continuer
        .then(res => {
            return res.json();
        })
        //Attend d'avoir converti les données en json pour continuer
        .then((data) => {
            setBlogs(data)
            console.log(data)
        })
    }, []);//Se déclenche uniquement sur le premier rendu de la page


    return(
        <div className='main'>
            

            {/* <div className='doc-container'>
                {
                    slides.map((slide, i) => {
                        
                        return <Card slide={slide} key={i}/>
                    })
                }
            </div> */}
            <motion.div 
            className='layer'
            initial={{ opacity:0.8 }}
            animate={{ opacity:1, x:"100vw", transition:{duration:1, ease:[.2,.85,.45,.95]}}}
            ></motion.div>

            <motion.div 
            className='layout-all'
            initial={{y:"100vh"}}
            animate={{y:"0", transition:{duration:1.3, ease:[0.645, 0.045, 0.355, 1]}}}
            exit={{y:"100vh", transition:{duration:0.6, ease:[.43,.09,.13,1.03]} }}
            >
                <h1>Consulter et modifier les résumés</h1>
                {blogs && <div className='doc-container'>
                    {
                        blogs.map((slide, i) => {
                            
                            return <Card slide={slide} key={i}/>
                        })
                    }
                </div>
                }
            </motion.div>
        </div>
    )
}


function Card(slide){

    // useState pour les éléments du documentaire
    const [content, setContent] = useState(slide.slide)

    const [titleValue, setTitleValue] = useState(content != null ? content.titleValue : "")
    const [themeValue, setThemeValue] = useState(content != null ? content.themeValue : "")
    const [platformeValue, setPlatformValue] = useState(content != null ? content.platformeValue : "")
    const [note, setNote] = useState(content != null ? content.note : 1)
    const [resume, setResume] = useState(content != null ? content.resume : "")
    const [commentaire, setCommentaire] = useState(content != null ? content.commentaire : "")

    // useState pour les éléments du pop
    const [showPopup, setShowPopup] = useState(false)

    
    const handleClick = () => {
        fetch("https://json-server-2-57je.onrender.com/blogs/"+content.id, {
            method: "DELETE"
        }).then(()=>{
            setContent(null)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const imageURL = content.imageURL
        
        const blog = { titleValue, themeValue, platformeValue, resume, commentaire, note, imageURL};

        fetch("https://json-server-2-57je.onrender.com/blogs/" + content.id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            /* setDisplayPopUp(true) */
            showPopupHandler()
        })
    }

    //fonction appelé quand la modif du documentaire est bien enregistrée dans la base de donnée
    function showPopupHandler(e) {
        setShowPopup(true)
    } 
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(false);
        }, 2000);
        return () => clearTimeout(timer)
    }, [showPopup])

    var popup = null
    if (showPopup) {
        popup = <Popup />
    }

    //Si le documentaire vient d'être supprimé (content == null) Alors le documentaire disparait directement de la liste
    if(content == null){
        return
    }


    return (
        <div className='card'>
            {popup}
            <div className='header'>
                <div 
                    className='image'
                    style={{backgroundImage: `url('${content.imageURL}')`}}>
                </div>
                <div className='infos'>
                    {/* <h3 className='title'>{content.title} — {content.platforme}</h3> 
                    <p className='theme'>{content.theme} - {content.note}</p>
                    <p className='commentaire'>Commentaire : <br/>{content.commentaire}</p>*/}
                    <div className='title'><input type="text" value={titleValue} onChange={(e) => setTitleValue(e.target.value)}/></div>
                    <div className='theme'><input type="text" value={themeValue} onChange={(e) => setThemeValue(e.target.value)}/></div>
                    <div className='platforme'><input type="text" value={platformeValue} onChange={(e) => setPlatformValue(e.target.value)}/></div>
                    <div className='note'>Note : <input type="text" value={note} onChange={(e) => setNote(e.target.value)}/></div>
                    
                    <div className='commentaire'>Commentaire : <br/>
                        <div className='commentaire-input'><textarea value={commentaire} onChange={(e) => setCommentaire(e.target.value)}/></div>
                    </div>
                </div>
                {/* <p className='platforme'>{content.platforme}</p> */}
                
                {/* <p className='note'>Note : {content.note}</p> */}
            </div>
            {/* <p className='resume'>Résumé : <br/>{content.resume}</p> */}
            <div className='resume'>Resume : <br/>
                <div className='resume-input'><textarea value={resume} onChange={(e) => setResume(e.target.value)}/></div>
            </div>
            
            <img className='logo-edit' src={logo_edit} onClick={handleSubmit} data-tooltip-id="tooltip-save" data-tooltip-content="Save Changes"/>
            <Tooltip id="tooltip-save" place='top'/>
            <img className='logo-supprimer' src={logo_supprimer} onClick={handleClick} data-tooltip-id="tooltip-delete" data-tooltip-content="Delete"/>  
            <Tooltip id="tooltip-delete" place='top'/>
        </div>
    )
}

export default AllDocu
