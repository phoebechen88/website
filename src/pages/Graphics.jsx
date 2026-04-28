import React, { useEffect, useRef, useState } from 'react'

import broomball from '../../Graphics/Broomball.png'
import isfWinter from '../../Graphics/ISF Winter.png'
import nightOfGoodNews from '../../Graphics/Night of Good News.png'
import santaMonicaEvangelism from '../../Graphics/SM EV.png'
import springAff from '../../Graphics/Spring AFF.png'
import springBanquetBanner from '../../Graphics/Spring Banquet Banner.png'
import springBanquetGraphic from '../../Graphics/Spring Banquet Graphic.png'
import tourOfWestwood from '../../Graphics/Tour of Westwood.png'
import winterRetreat from '../../Graphics/Winter Retreat.png'
import springProgramPdf from '../../Graphics/Spring Program.pdf'

const graphicItems = [
  { type: 'image', title: 'Santa Monica Evangelism', src: santaMonicaEvangelism, alt: 'Santa Monica Evangelism event graphic' },
  { type: 'image', title: 'Spring Banquet Graphic', src: springBanquetGraphic, alt: 'Spring banquet promotional graphic' },
  { type: 'image', title: 'Spring Quarter AFF', src: springAff, alt: 'Spring AFF event design' },
  { type: 'image', title: 'ISF Winter Quarter', src: isfWinter, alt: 'ISF Winter event poster design' },
  { type: 'image', title: 'Winter Retreat', src: winterRetreat, alt: 'Winter retreat poster design' },
  { type: 'image', title: 'Tour of Westwood', src: tourOfWestwood, alt: 'Tour of Westwood event poster' },
  { type: 'image', title: 'A Night of Good News', src: nightOfGoodNews, alt: 'Night of Good News event graphic' },
  { type: 'image', title: 'Spring Banquet Banner', src: springBanquetBanner, alt: 'Spring banquet banner design' },
  { type: 'image', title: 'Broomball', src: broomball, alt: 'Broomball graphic design poster' },
  { type: 'pdf', title: 'Spring Banquet Program', src: springProgramPdf, alt: 'Spring Banquet Program PDF' }
]

export default function Graphics() {
  const gridRef = useRef(null)
  const [activeGraphic, setActiveGraphic] = useState(null)
  const [loadedImages, setLoadedImages] = useState({})

  const closeGraphicModal = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    setActiveGraphic(null)
  }

  const markImageLoaded = (title) => {
    setLoadedImages((prev) => {
      if (prev[title]) return prev
      return { ...prev, [title]: true }
    })
  }

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.fade-item')
    if (!cards || cards.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          } else {
            entry.target.classList.remove('visible')
          }
        })
      },
      { threshold: [0.1, 0.5, 0.9] }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeGraphicModal()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <section>
      <div className="container">
        <h2>Graphics</h2>
        <p className="muted">
          Outside of data science, I love visual storytelling through graphic design. Here are a few posters,
          banners, and layouts I have created for campus events. Scroll through to check out my hobby.
        </p>

        <div className="graphics-grid" ref={gridRef} aria-label="Graphic design gallery">
          {graphicItems.map((item, index) => (
            <article className={`graphics-card fade-item ${item.title === 'Spring Banquet Banner' ? 'graphics-card-banner' : ''}`} key={item.title} style={{ transitionDelay: `${index * 40}ms` }}>
              <div className={`graphics-media image-frame ${loadedImages[item.title] ? 'image-loaded' : 'image-pending'}`}>
                {item.type === 'image' ? (
                  <img src={item.src} alt={item.alt} loading="lazy" className="graphics-image" onLoad={() => markImageLoaded(item.title)} />
                ) : (
                  <iframe title={item.title} src={item.src} className="graphics-pdf" />
                )}
              </div>
              <div className="graphics-body">
                <h3>{item.title}</h3>
                <div className="graphics-actions">
                  <button className="graphics-open-btn" onClick={() => setActiveGraphic(item)} aria-label={`Open larger view of ${item.title}`} title="Bigger view">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <ellipse cx="12" cy="12" rx="9" ry="5.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="12" cy="12" r="3.9" fill="currentColor" />
                      <circle cx="13.4" cy="10.7" r="1" fill="#fff" />
                    </svg>
                  </button>
                  {item.type === 'pdf' && (
                    <a href={item.src} target="_blank" rel="noopener noreferrer" className="cta cta-small project-main-btn graphics-pdf-btn">
                      Open PDF
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {activeGraphic && (
          <div className="graphics-modal-overlay" onClick={closeGraphicModal}>
            <div
              className="graphics-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`${activeGraphic.title} larger preview`}
              onClick={(event) => event.stopPropagation()}
            >
              <header className="graphics-modal-header">
                <h3>{activeGraphic.title}</h3>
                <button className="modal-close project-modal-close" aria-label="Close bigger view" onClick={closeGraphicModal}>
                  ✕
                </button>
              </header>
              <div className="graphics-modal-content">
                {activeGraphic.type === 'image' ? (
                  <img src={activeGraphic.src} alt={activeGraphic.alt} className="graphics-modal-image" />
                ) : (
                  <iframe title={activeGraphic.title} src={activeGraphic.src} className="graphics-modal-pdf" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
