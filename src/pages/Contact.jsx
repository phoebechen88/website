import React, { useState } from 'react'

export default function Contact(){
  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '' // honeypot
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in name, email, and message.' })
      return
    }

    if (!FORMSPREE_ENDPOINT) {
      setStatus({
        type: 'error',
        message: 'Contact form is not configured yet. Set VITE_FORMSPREE_ENDPOINT in your environment.'
      })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'Portfolio contact form submission'
        })
      })

      if (!res.ok) {
        throw new Error('Form submission failed')
      }

      setStatus({ type: 'success', message: 'Thanks! Your message has been sent.' })
      setFormData({ name: '', email: '', message: '', website: '' })
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Sorry, something went wrong while sending your message. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section-card no-shadow">
      <div className="container contact-top-row">
        <div>
          <h2>Contact</h2>
        </div>
        <div className="link-grid contact-links">
          <a href="mailto:phoebechen2040@gmail.com" aria-label="Email" className="contact-icon icon-email" title="Email">
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="social-icon icon-email"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4.99l-8 5-8-5V6l8 5 8-5v2.99z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/phoebechen1/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="contact-icon" title="LinkedIn">
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="social-icon icon-linkedin"><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.865 6 2.5 6S0 4.88 0 3.5 1.115 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8h4.5V24h-4.5V8zm7.5 0h4.3v2.2h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.8 5.2 6.4V24h-4.6v-7.9c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.1V24H7.75V8z"/></svg>
          </a>
          <a href="https://github.com/phoebechen88" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="contact-icon icon-github" title="GitHub">
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="social-icon icon-github"><path fill="currentColor" d="M12 .297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.387.6.112.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.204.083 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.776.418-1.304.762-1.604-2.665-.304-5.466-1.335-5.466-5.933 0-1.312.468-2.382 1.236-3.222-.124-.303-.536-1.526.117-3.177 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.403c1.02.005 2.045.138 3.003.403 2.291-1.552 3.298-1.23 3.298-1.23.655 1.651.243 2.874.12 3.177.77.84 1.235 1.91 1.235 3.222 0 4.61-2.804 5.625-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.192.694.8.576C20.565 22.093 24 17.597 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
        </div>
        <h3>Contact form</h3>
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="form-field">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={onChange}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={onChange}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-field">
            <label>Message</label>
            <textarea
              className="form-control"
              name="message"
              placeholder="Message"
              rows={5}
              value={formData.message}
              onChange={onChange}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-field honeypot-field" aria-hidden="true">
            <label>Website</label>
            <input
              className="form-control"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={onChange}
            />
          </div>
          <div>
            <button type="submit" disabled={isSubmitting} className="cta cta-small contact-btn">
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </div>
          {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
        </form>
        <p className="muted"><em>Acknowledgement: This website was built with the help of AI tools.</em></p>
      </div>
    </section>
  )
}
