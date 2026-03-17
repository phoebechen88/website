import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UnderConstructionPopup from './UnderConstructionPopup'

export default function ProjectModal({project, onClose}){
  const navigate = useNavigate()
  const [showUnderConstruction, setShowUnderConstruction] = useState(false)
  const hasRepoLink = /^https?:\/\//i.test(project?.repoLink || '')
  const assetBase = import.meta.env.BASE_URL || '/'
  const imageSrc = project?.image?.startsWith('/')
    ? `${assetBase}${project.image.slice(1)}`
    : project?.image

  const handlePopupClick = (e) => {
    e.preventDefault()
    setShowUnderConstruction(true)
  }

  const modalContentById = {
    'proj-1': {
      title: 'EMG-Based Keystroke Decoding with Neural Networks',
      description: 'Built and tuned a CNN-BiGRU deep learning model for EMG-based keystroke decoding through architectural improvements and hyperparameter optimization (PyTorch).'
    },
    'proj-2': {
      title: 'LAPD Crime Data Analysis',
      description: 'Processed 877K+ LAPD crime records using R (tidyverse), performing data cleaning, feature engineering, EDA, and statistical modeling (chi-square tests, multinomial logistic, negative binomial) to analyze COVID-era crime patterns and produce reproducible visualizations (Quarto, ggplot2, LaTeX).'
    },
    'proj-3': {
      title: 'Heart Failure Mortality Prediction',
      description: 'Built and compared predictive models (logistic regression, random forest, neural network) on clinical data to predict heart failure mortality while identifying key risk factors through exploratory data analysis.'
    },
    'proj-4': {
      title: 'Graduate Admissions Equity Modeling',
      description: 'Developed predictive classification models (logistic regression, random forest, LASSO) to analyze MBA admissions outcomes using demographic and academic features; applied feature selection and model optimization (AIC/BIC, regularization) and evaluated performance with classification metrics.'
    },
    'proj-5': {
      title: 'UCLA ASA DataFest 2025 Migration Analysis',
      description: 'Analyzed national migration patterns of business office locations using a commercial real estate dataset (190K+ observations, 35 variables), uncovering geographic and industry-level relocation trends.'
    },
    'proj-6': {
      title: 'Median House Value Regression Model',
      description: 'Developed and validated multiple linear regression models to predict California median house values using Census data (20K+ observations), applying transformations, diagnostics, and variable selection to improve model fit (Adj. R² approximately 0.60).'
    }
  }

  const modalContent = modalContentById[project?.id]
  const modalTitle = modalContent?.title || project?.title
  const modalDescription = modalContent?.description || project?.description

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showUnderConstruction) {
          setShowUnderConstruction(false)
          return
        }
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, showUnderConstruction])

  if(!project) return null
  return (
    <>
      <div style={{position:'fixed',inset:0,background:'rgba(12,16,20,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1200}} onClick={onClose}>
        <div role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e)=>e.stopPropagation()} style={{background:'#fff',borderRadius:12,maxWidth:800,width:'90%',padding:20,boxShadow:'0 10px 40px rgba(2,6,23,0.2)'}}>
          <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 id="modal-title">{modalTitle}</h3>
            <button onClick={onClose} aria-label="Close" className="modal-close project-modal-close">✕</button>
          </header>
          <div style={{display:'grid',gridTemplateColumns:'1fr',gap:12,marginTop:12}}>
            <img src={imageSrc} alt={project.imageAlt || project.title} style={{width:'100%',height:260,objectFit:'cover',borderRadius:8}} />
            <p>{modalDescription}</p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {project.tags.map(t=> <span key={t} style={{background:'#f1f5fb',padding:'6px 8px',borderRadius:999,fontSize:13}}>{t}</span>)}
            </div>
            <div className="modal-actions" style={{display:'flex',gap:12,marginTop:8,flexWrap:'wrap'}}>
              {hasRepoLink
                ? <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="cta cta-small project-modal-btn">Repository</a>
                : <a href="#" onClick={handlePopupClick} className="cta cta-small project-modal-btn">Repository</a>}
              {project.link && <a href={project.link} onClick={handlePopupClick} className="cta cta-small project-modal-btn">Report</a>}
              <button onClick={() => {onClose(); navigate(`/projects/${project.id}`)}} className="cta cta-small project-modal-btn" style={{marginLeft:'auto'}}>View Full Project</button>
            </div>
          </div>
        </div>
      </div>
      {showUnderConstruction && <UnderConstructionPopup onClose={() => setShowUnderConstruction(false)} />}
    </>
  )
}
