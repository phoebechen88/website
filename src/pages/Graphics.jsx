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
import slide1 from '../../Graphics/Spring Banquet Slide 1.png'
import slide15 from '../../Graphics/Spring Banquet Slide 15.png'
import slide84 from '../../Graphics/Slide 84.png'
import slide86 from '../../Graphics/Spring Banquet Slide 86.png'
import slide94 from '../../Graphics/Spring Banquet Slide 94.png'
import slide96 from '../../Graphics/Slide 96.png'
import slide97 from '../../Graphics/Slide 97.png'
import slide202 from '../../Graphics/Spring Banquet Slide 202.png'
import springRetreatBookletPdf from '../../Graphics/Spring Retreat Booklet.pdf'
import banquetProgramPdf from '../../Graphics/Spring Banquet Program.pdf'

const graphicItems = [
  { type: 'image', category: 'santa-monica', title: 'Santa Monica Evangelism', src: santaMonicaEvangelism, alt: 'Santa Monica Evangelism event graphic' },
  { type: 'image', category: 'spring-banquet', title: 'Spring Banquet Graphic', src: springBanquetGraphic, alt: 'Spring banquet promotional graphic' },
  { type: 'pdf', category: 'spring-banquet', title: 'Spring Banquet Program', src: banquetProgramPdf, alt: 'Spring Banquet Program PDF' },
  { type: 'image', category: 'other', title: 'Spring Quarter AFF', src: springAff, alt: 'Spring AFF event design' },
  { type: 'image', category: 'isf', title: 'ISF Winter Quarter', src: isfWinter, alt: 'ISF Winter event poster design' },
  { type: 'image', category: 'winter', title: 'Winter Retreat', src: winterRetreat, alt: 'Winter retreat poster design' },
  { type: 'image', category: 'other', title: 'Tour of Westwood', src: tourOfWestwood, alt: 'Tour of Westwood event poster' },
  { type: 'image', category: 'other', title: 'A Night of Good News', src: nightOfGoodNews, alt: 'Night of Good News event graphic' },
  { type: 'image', category: 'spring-banquet', title: 'Spring Banquet Banner', src: springBanquetBanner, alt: 'Spring banquet banner design' },
  { type: 'image', category: 'spring-banquet', title: 'Slide 1', src: slide1, alt: 'Spring banquet slide 1' },
  { type: 'image', category: 'spring-banquet', title: 'Slide 15', src: slide15, alt: 'Spring banquet slide 15' },
  { type: 'image', category: 'spring-banquet', title: 'Slide 84', src: slide84, alt: 'Spring banquet slide 84' },
  { type: 'image', category: 'spring-banquet', title: 'Slide 86', src: slide86, alt: 'Spring banquet slide 86' },
  { type: 'image', category: 'spring-banquet', title: 'Slide 94', src: slide94, alt: 'Spring banquet slide 94' },
  { type: 'image', category: 'spring-banquet', title: 'Slide 96', src: slide96, alt: 'Spring banquet slide 96' },
  { type: 'image', category: 'spring-banquet', title: 'Slide 97', src: slide97, alt: 'Spring banquet slide 97' },
  { type: 'image', category: 'spring-banquet', title: 'Slide 202', src: slide202, alt: 'Spring banquet slide 202' },
  { type: 'image', category: 'other', title: 'Broomball', src: broomball, alt: 'Broomball graphic design poster' },
  { type: 'pdf', category: 'other', title: 'Spring Retreat Booklet', src: springRetreatBookletPdf, alt: 'Spring Retreat Booklet PDF' },
  { type: 'link', category: 'spring-banquet', title: 'Spring Banquet 2026 Promotional Video', href: 'https://youtu.be/ON49PRwPNCw', alt: 'Spring Banquet 2026 Promotional Video' }
]

export default function Graphics() {
  const gridRef = useRef(null)
  const [activeGraphic, setActiveGraphic] = useState(null)
  const [activeCollection, setActiveCollection] = useState(null)
  const [loadedImages, setLoadedImages] = useState({})

  const springBanquetItems = graphicItems.filter(item => item.category === 'spring-banquet')
  const displayItems = graphicItems.filter(item => item.category !== 'spring-banquet')

  const springBanquetCollection = {
    type: 'collection',
    title: 'Spring Banquet 2026',
    items: springBanquetItems,
    alt: 'Spring Banquet collection',
    previewSrc: springBanquetGraphic
  }

  const closeGraphicModal = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    setActiveGraphic(null)
  }

  const closeCollectionModal = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    setActiveCollection(null)
  }

  const markImageLoaded = (title) => {
    setLoadedImages((prev) => {
      if (prev[title]) return prev
      return { ...prev, [title]: true }
    })
  }

  const renderCard = (item, index) => (
    <article className={`graphics-card fade-item ${item.title === 'Spring Banquet Banner' ? 'graphics-card-banner' : ''} ${item.type === 'link' ? 'graphics-card-link' : ''}`} key={item.title} style={{ transitionDelay: `${index * 40}ms` }}>
      <div className={`graphics-media image-frame ${loadedImages[item.title] ? 'image-loaded' : 'image-pending'}`}>
        {item.type === 'image' ? (
          <img src={item.src} alt={item.alt} loading="lazy" className="graphics-image" onLoad={() => markImageLoaded(item.title)} />
        ) : item.type === 'pdf' ? (
          <iframe title={item.title} src={item.src} className="graphics-pdf" />
        ) : item.type === 'link' ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="graphics-link-card">
            <span>▶ {item.title}</span>
          </a>
        ) : null}
      </div>
      <div className="graphics-body">
        <h3>{item.title}</h3>
        <div className="graphics-actions">
          {item.type !== 'link' && (
            <button className="graphics-open-btn" onClick={() => setActiveGraphic(item)} aria-label={`Open larger view of ${item.title}`} title="Bigger view">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <ellipse cx="12" cy="12" rx="9" ry="5.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="3.9" fill="currentColor" />
                <circle cx="13.4" cy="10.7" r="1" fill="#fff" />
              </svg>
            </button>
          )}
          {item.type === 'link' && (
            <a href={item.href} target="_blank" rel="noopener noreferrer" className="cta cta-small project-main-btn graphics-link-btn">
              Watch Video
            </a>
          )}
          {item.type === 'pdf' && (
            <a href={item.src} target="_blank" rel="noopener noreferrer" className="cta cta-small project-main-btn graphics-pdf-btn">
              Open PDF
            </a>
          )}
        </div>
      </div>
    </article>
  )

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
        if (activeGraphic) {
          closeGraphicModal()
        } else if (activeCollection) {
          closeCollectionModal()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeGraphic, activeCollection])

  return (
    <section>
      <div className="container">
        <h2>Graphics</h2>
        <p className="muted">
          Outside of data science, I love visual storytelling through graphic design. Here are a few posters,
          banners, and layouts I have created for campus events. Scroll through to check out my hobby.
        </p>

        <div className="graphics-grid" ref={gridRef} aria-label="Graphic design gallery">
          <article className="graphics-card fade-item graphics-collection-card" style={{ transitionDelay: '0ms' }} onClick={() => setActiveCollection(springBanquetCollection)}>
            <div className="graphics-media image-frame image-loaded graphics-collection-preview">
              <img src={springBanquetCollection.previewSrc} alt={springBanquetCollection.alt} className="graphics-image" />
              <div className="graphics-collection-overlay">
                <span className="graphics-collection-count">{springBanquetItems.length} items</span>
              </div>
            </div>
            <div className="graphics-body">
              <h3>{springBanquetCollection.title}</h3>
              <div className="graphics-actions">
                <button className="graphics-open-btn" onClick={() => setActiveCollection(springBanquetCollection)} aria-label="Open Spring Banquet collection" title="Open collection">
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <ellipse cx="12" cy="12" rx="9" ry="5.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="3.9" fill="currentColor" />
                    <circle cx="13.4" cy="10.7" r="1" fill="#fff" />
                  </svg>
                </button>
              </div>
            </div>
          </article>

          {displayItems.map((item, index) => renderCard(item, index + 1))}
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

        {activeCollection && (
          <div className="graphics-modal-overlay" onClick={closeCollectionModal}>
            <div
              className="graphics-modal graphics-collection-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`${activeCollection.title} collection`}
              onClick={(event) => event.stopPropagation()}
            >
              <header className="graphics-modal-header">
                <h3>{activeCollection.title}</h3>
                <button className="modal-close project-modal-close" aria-label="Close collection" onClick={closeCollectionModal}>
                  ✕
                </button>
              </header>
              <div className="graphics-collection-grid-modal">
                {activeCollection.items.map((item) => (
                  <article key={item.title} className={`graphics-card graphics-collection-item ${item.title === 'Spring Banquet Banner' ? 'graphics-card-banner' : ''} ${item.type === 'link' ? 'graphics-card-link' : ''}`} onClick={() => setActiveGraphic(item)}>
                    <div className={`graphics-media image-frame ${loadedImages[item.title] ? 'image-loaded' : 'image-pending'}`}>
                      {item.type === 'image' && (
                        <img src={item.src} alt={item.alt} className="graphics-image" loading="lazy" onLoad={() => markImageLoaded(item.title)} />
                      )}
                      {item.type === 'pdf' && (
                        <iframe title={item.title} src={item.src} className="graphics-pdf" />
                      )}
                      {item.type === 'link' && (
                        <img src={`https://img.youtube.com/vi/${item.href.split('/').pop()}/maxresdefault.jpg`} alt={item.alt} className="graphics-image graphics-video-thumbnail" loading="lazy" onLoad={() => markImageLoaded(item.title)} />
                      )}
                    </div>
                    <div className="graphics-body">
                      <h4>{item.title}</h4>
                      <div className="graphics-actions">
                        {item.type !== 'link' && (
                          <button className="graphics-open-btn" onClick={(e) => { e.stopPropagation(); setActiveGraphic(item); }} aria-label={`Open larger view of ${item.title}`} title="Bigger view">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                              <ellipse cx="12" cy="12" rx="9" ry="5.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                              <circle cx="12" cy="12" r="3.9" fill="currentColor" />
                              <circle cx="13.4" cy="10.7" r="1" fill="#fff" />
                            </svg>
                          </button>
                        )}
                        {item.type === 'link' && (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="cta cta-small project-main-btn graphics-link-btn" onClick={(e) => e.stopPropagation()}>
                            Watch Video
                          </a>
                        )}
                        {item.type === 'pdf' && (
                          <a href={item.src} target="_blank" rel="noopener noreferrer" className="cta cta-small project-main-btn graphics-pdf-btn" onClick={(e) => e.stopPropagation()}>
                            Open PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeGraphic && (
          <div className="graphics-modal-overlay" onClick={closeGraphicModal}>
            <div
              className="graphics-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`View ${activeGraphic.title}`}
              onClick={(event) => event.stopPropagation()}
            >
              <header className="graphics-modal-header">
                <h3>{activeGraphic.title}</h3>
                <button className="modal-close project-modal-close" aria-label="Close graphic" onClick={closeGraphicModal}>
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
