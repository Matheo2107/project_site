import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo_validate from '../assets/logo_validate.svg';
import starSelected from '../assets/star-selected.svg'
import def from '../assets/default.png';
import '../styles/AddDocu.css'
import React, { useEffect } from "react";
import { useState } from 'react'


import logo_go from '../assets/logo_go.svg'

function AddDocu(){

    const [titleValue, setTitleValue] = useState('Title')
    const [themeValue, setThemeValue] = useState('Theme')
    const [platformeValue, setPlatformValue] = useState('Platform')
    const [resume, setResume] = useState('')
    const [commentaire, setCommentaire] = useState('')
    const [image, setImage] = useState(def);
    const [imageURL, setImageURL] = useState(def);
    const [note, setNbStars] = useState(0);

    const [displayPopUp, setDisplayPopUp] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (image == def) {
            return
        }
        const newImageURL = URL.createObjectURL(image[0])
        setImageURL(newImageURL);
    }, [image]);


    /* function onImageChange(e){
        setImage([...e.target.files]);
    } */

    function handleStarClick(index){
        var stars = document.getElementsByClassName('star');
        setNbStars(index);
        
        for (let i = 0; i<5; i++){
            if (i<index){
                stars[i].id = "star-selected";
            }else{
                stars[i].id = "star";
            }
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const blog = { titleValue, themeValue, platformeValue, resume, commentaire, note, imageURL };

        fetch("https://json-server-2-57je.onrender.com/blogs", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            setDisplayPopUp(true)
            setTimeout(() => {
                navigate('/');
            }, 100)
        })
    }


    return (
        <section className="add">
            <motion.div 
            className='layer'
            initial={{ opacity:0.8 }}
            animate={{ opacity:1, x:"100%", transition:{duration:1, ease:[.2,.85,.45,.95]}}}
            ></motion.div>

            {/* Affichage du validate popup avant de quitter la page SI la page est quitté avec le submit*/}
            { !displayPopUp ? <div></div> : 
                <motion.div 
                className="validate-popup" 
                initial={{y:"-80vh"}} 
                animate={{y:"-80vh"}} 
                exit={{y:"0px", transition:{duration:1.5, ease:[0,1.59,.12,.84]}, delay:1 }}
                >
                    <img className="logo-validate" src={logo_validate}/>
                    Documentaire enregistré <br/>avec succès
                </motion.div>
            }

            <motion.div
            className="motion-div"
            initial={{y:"-100%"}}
            animate={{y:"4%", transition:{duration:1.3, ease:[0.645, 0.045, 0.355, 1], delay:0}}}
            exit={{y:"100vh", transition:{duration:0.6, ease:[.43,.09,.13,1.03]} }}
            >
                <h1>Saisir un nouveau documentaire</h1>
        
                <div className="layout">
                    <form>
                        <div className="offset-z">

                            <div className="label-court">
                                <label className="little-label" >
                                    Titre:
                                    <input type="text" value={titleValue} onChange={(e) => setTitleValue(e.target.value)}/>
                                </label>
                                <label className="little-label">
                                    Thème
                                    <input type="text" value={themeValue} onChange={(e) => setThemeValue(e.target.value)}/>
                                </label>
                            </div>

                            <div className="label-court">
                                <label>
                                    Platforme
                                    <input type="text" value={platformeValue} onChange={(e) => setPlatformValue(e.target.value)}/>
                                </label>
                                <label>
                                    Date
                                    <input type="text"/>
                                </label>
                            </div>

                            <label>
                                Résumé
                                <textarea className="text-resume" onChange={(e) => setResume(e.target.value)}/>
                            </label>
                            <label>
                                Commentaire
                                <textarea className="text-commentaire" onChange={(e) => setCommentaire(e.target.value)}/>
                            </label>

                            <div className="label-court">
                                <label>
                                    Note
                                    <div className="star-container">
                                        <div className="star" id="star-1" onClick={()=>handleStarClick(1)}/>
                                        <div className="star" id="star-2" onClick={()=>handleStarClick(2)}/>
                                        <div className="star" id="star-3" onClick={()=>handleStarClick(3)}/>
                                        <div className="star" id="star-4" onClick={()=>handleStarClick(4)}/>
                                        <div className="star" id="star-5" onClick={()=>handleStarClick(5)}/>
                                    </div>
                                </label>

                                <label>
                                    Donner une image<br/>
                                    {/* <div className="image-input">
                                        Dépose ton image ici
                                        <input type="file" accept="image/*" onChange={onImageChange}></input>
                                    </div> */}
                                    {
                                        
                                        (imageURL == def) ?
                                            <input type="text" value="" placeholder="Url de l'image" onChange={(e) => setImageURL(e.target.value)}/>
                                            :
                                            <input type="text" value={imageURL} placeholder="Url de l'image" onChange={(e) => setImageURL(e.target.value)}/>
                                    }
                                    
                                </label>
                            </div>

                            <input type="submit" value="Submit" onClick={handleSubmit}/>
                        </div>
                    </form>
                    
                    <Slide title={titleValue} theme={themeValue} platform={platformeValue} imageURL={imageURL}></Slide>
                </div>
                <Link className="cancel" to="/">Annuler</Link>
            </motion.div>
        </section>
    )
}

function Slide( props ) {

    const {title, theme, platform, imageURL} = props
    const ref = useTilt();

    return (
        <div
        ref={ref}
        className="sl"
        >
        <div
            className="sl-bg"
            
        />
        <div
            className="sl-content"
            /* id="empty" */
            style={{
            backgroundImage: `url('${imageURL == '' ? def : imageURL}')`,
            backgroundSize:`${imageURL == '' ? "contain" : "cover"}`
            }}
        >
            <div className="sl-content-inner">
                <h2 className="sl-title">{title}</h2>
                <h3 className="sl-subtitle"> — {platform}</h3>
                <p className="sl-desc">{theme}</p>
                
            </div>
        </div>
        </div>
    );
}

function useTilt() {
    const ref = React.useRef(null);
  
    React.useEffect(() => {
      
  
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
    });
  
    return ref;
  }

export default AddDocu