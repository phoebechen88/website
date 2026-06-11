import React, {useState} from 'react'
import ProjectGrid from '../components/ProjectGrid'
import projects from '../data/projects'
import ProjectModal from '../components/ProjectModal'

export default function Projects(){
  const [active, setActive] = useState(null)
  return (
    <section>
      <div className="container">
        <div className="projects-intro-box">
          <h2>Projects</h2>
          <p className="muted">A selection of end-to-end projects spanning data cleaning, feature engineering, model development, evaluation, and reproducible reporting. My work emphasizes practical modeling with clear methodology: from classical regression to neural networks, validated with interpretable metrics.</p>
          <p className="muted"><em>Click any card to view details.</em></p>
        </div>
        <ProjectGrid projects={projects} onOpen={(p)=>setActive(p)} />
        <ProjectModal project={active} onClose={()=>setActive(null)} />
      </div>
    </section>
  )
}
