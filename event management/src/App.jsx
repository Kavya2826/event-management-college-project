import { useEffect, useMemo, useState } from 'react'
import './App.css'

const events = [
  { id: 1, title: 'Future of AI Summit', category: 'Technology', date: '2026-11-18', time: '10:00 AM', venue: 'The Leela Palace, Bengaluru', price: 'Free', seats: 42, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85', description: 'A day of ideas, practical sessions and conversations on how artificial intelligence is reshaping the way we work, build and create.' },
  { id: 2, title: 'Indie Music Nights', category: 'Music', date: '2026-11-22', time: '06:30 PM', venue: 'Phoenix Marketcity, Bengaluru', price: '₹499', seats: 120, image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85', description: 'Discover independent artists, live performances and a community that celebrates original music.' },
  { id: 3, title: 'Design Thinking Workshop', category: 'Workshop', date: '2026-11-25', time: '11:00 AM', venue: 'WeWork, Residency Road', price: '₹299', seats: 25, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85', description: 'Learn to frame problems, generate ideas and prototype solutions through hands-on collaborative exercises.' },
  { id: 4, title: 'Startup Connect 2026', category: 'Business', date: '2026-12-02', time: '09:30 AM', venue: 'NIMHANS Convention Centre', price: 'Free', seats: 80, image: 'https://images.unsplash.com/photo-1511578314322-3798b6e6?auto=format&fit=crop&w=1000&q=85', description: 'Meet founders, mentors and curious builders. Share ideas and make meaningful connections.' },
  { id: 5, title: 'Run for a Cause', category: 'Community', date: '2026-12-06', time: '06:00 AM', venue: 'Cubbon Park, Bengaluru', price: '₹199', seats: 200, image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=85', description: 'Come together for a community run that supports local causes and encourages a healthier city.' },
  { id: 6, title: 'Creative Photography Walk', category: 'Workshop', date: '2026-12-12', time: '07:00 AM', venue: 'Church Street, Bengaluru', price: '₹149', seats: 18, image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1000&q=85', description: 'Explore light, composition and street storytelling on a guided photography walk.' },
]

const categories = ['All events', 'Technology', 'Music', 'Workshop', 'Business', 'Community']
const dateLabel = date => new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
const readRegistrations = () => { try { return JSON.parse(localStorage.getItem('eventra-registrations') || '[]') } catch { return [] } }

function App() {
  const [category, setCategory] = useState('All events')
  const [search, setSearch] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [registerEvent, setRegisterEvent] = useState(null)
  const [registrations, setRegistrations] = useState(readRegistrations)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [success, setSuccess] = useState(false)
  const [formError, setFormError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { localStorage.setItem('eventra-registrations', JSON.stringify(registrations)) }, [registrations])

  const visibleEvents = useMemo(() => events.filter(event => {
    const matchesCategory = category === 'All events' || event.category === category
    const matchesSearch = (event.title + ' ' + event.venue + ' ' + event.category).toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  }), [category, search])

  const beginRegistration = event => {
    setSelectedEvent(null)
    setRegisterEvent(event)
    setForm({ name: '', email: '', phone: '' })
    setFormError('')
    setSuccess(false)
    setFormError('')
  }

  const submitRegistration = e => {
    e.preventDefault()
    const normalizedEmail = form.email.trim().toLowerCase()
    const alreadyRegistered = registrations.some(registration =>
      registration.eventId === registerEvent.id && registration.email.toLowerCase() === normalizedEmail
    )
    const registeredCount = registrations.filter(registration => registration.eventId === registerEvent.id).length
    if (alreadyRegistered) {
      setFormError('This email is already registered for this event.')
      return
    }
    if (registeredCount >= registerEvent.seats) {
      setFormError('Sorry, this event is fully booked.')
      return
    }
    setRegistrations(current => [...current, {
      id: Date.now(),
      eventId: registerEvent.id,
      eventTitle: registerEvent.title,
      name: form.name.trim(),
      email: normalizedEmail,
      phone: form.phone.trim(),
    }])
    setFormError('')
    setSuccess(true)
  }

  const cancelRegistration = id => {
    setRegistrations(current => current.filter(registration => registration.id !== id))
  }

  const remainingSeats = event => Math.max(0, event.seats - registrations.filter(registration => registration.eventId === event.id).length)

  return (
    <div className="app-shell">
      <header className="navbar">
        <a className="brand" href="#home"><span className="brand-mark">e</span><span>eventra<span className="brand-dot">.</span></span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">☰</button>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a><a href="#events" onClick={() => setMenuOpen(false)}>Explore events</a><a href="#my-registrations" onClick={() => setMenuOpen(false)}>My registrations</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <a className="nav-cta" href="#events">Find an event <span>↗</span></a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> YOUR CITY. YOUR PEOPLE. YOUR MOMENT.</div>
            <h1>Make time for<br /><span>what moves you.</span></h1>
            <p className="hero-description">Discover experiences worth stepping out for. Find your next event, meet your people, and make memories that stay.</p>
            <div className="hero-actions"><a className="button button-primary" href="#events">Explore events <span>↗</span></a><a className="text-link" href="#about">How it works <span>↓</span></a></div>
            <div className="hero-proof"><div className="avatar-stack"><i>✦</i><i>♫</i><i>⚡</i></div><span><strong>Good things happen</strong><br />when people come together.</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1100&q=90" alt="Crowd enjoying a live event" /><div className="image-shade" />
              <div className="image-caption"><span className="caption-kicker">UP NEXT · NOV 18</span><strong>Future of<br />AI Summit</strong><span className="caption-location">⌖ Bengaluru, India</span></div>
              <div className="floating-tag"><span className="tag-icon">✦</span><span><strong>Find your next</strong><br />great experience</span></div>
            </div>
            <div className="hero-side-note">CURATED EXPERIENCES <span>✳</span> MADE FOR YOU</div>
          </div>
          <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /><span>01 / 03</span></div>
        </section>

        <section className="stats-strip"><div><strong>06</strong><span>Upcoming experiences</span></div><div><strong>05</strong><span>Event categories</span></div><div><strong>01</strong><span>City to explore</span></div><p>Small moments.<br /><em>Big stories.</em></p></section>

        <section className="events-section section-wrap" id="events">
          <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> THE GOOD STUFF</div><h2>Find your <span>next thing.</span></h2><p>From big ideas to good music — there's a place for you.</p></div><div className="event-count"><strong>{String(visibleEvents.length).padStart(2, '0')}</strong><span>EVENTS<br />TO EXPLORE</span></div></div>
          <div className="event-controls"><div className="category-list">{categories.map(item => <button key={item} className={category === item ? 'category-pill active' : 'category-pill'} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." aria-label="Search events" /><kbd>↵</kbd></label></div>
          {visibleEvents.length ? <div className="events-grid">{visibleEvents.map(event => <article className="event-card" key={event.id}>
            <button className="event-image-button" onClick={() => setSelectedEvent(event)} aria-label={'View ' + event.title}><img src={event.image} alt={event.title} onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80' }} /><span className="card-category">{event.category}</span><span className="image-arrow">↗</span></button>
            <div className="event-card-body"><div className="event-meta"><span>◷ {dateLabel(event.date)}</span><span>{event.time}</span></div><h3>{event.title}</h3><p className="event-venue">⌖ {event.venue}</p><div className="card-footer"><strong>{event.price}</strong><button onClick={() => setSelectedEvent(event)}>View details <span>↗</span></button></div></div>
          </article>)}</div> : <div className="empty-state"><span>⌕</span><h3>No events found</h3><p>Try another search or choose a different category.</p><button className="text-link" onClick={() => { setSearch(''); setCategory('All events') }}>Clear filters ↗</button></div>}
        </section>

        <section className="registrations-section section-wrap" id="my-registrations">
          <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> YOUR EVENT PLANS</div><h2>My <span>registrations.</span></h2><p>Keep track of the experiences you've signed up for.</p></div><div className="event-count"><strong>{String(registrations.length).padStart(2, '0')}</strong><span>YOUR<br />BOOKINGS</span></div></div>
          {registrations.length ? <div className="registration-list">{registrations.map(registration => {
            const event = events.find(item => item.id === registration.eventId)
            return <article className="registration-card" key={registration.id}>
              <div className="registration-card-main"><span className="registration-status">✓ REGISTERED</span><h3>{registration.eventTitle}</h3><p>{registration.name} · {registration.email}</p><span className="registration-date">{event ? dateLabel(event.date) + ' · ' + event.time : 'Event details unavailable'}</span></div>
              <button className="cancel-registration" onClick={() => cancelRegistration(registration.id)}>Cancel registration <span>×</span></button>
            </article>
          })}</div> : <div className="registrations-empty"><span>✳</span><h3>No registrations yet</h3><p>When you register for an event, it will appear here.</p><a className="text-link" href="#events">Explore events ↗</a></div>}
        </section>

        <section className="feature-banner" id="about"><div className="feature-orb">✳</div><div className="eyebrow"><span className="eyebrow-line" /> MORE THAN A CALENDAR</div><h2>Show up for<br /><span>something new.</span></h2><p>Great experiences start with a simple yes. Browse what's happening, pick what speaks to you, and save your spot in just a few clicks.</p><a className="button button-light" href="#events">Find your experience <span>↗</span></a><div className="banner-decoration">MAKE<br />IT<br />COUNT.</div></section>
      </main>

      <footer className="footer"><a className="brand" href="#home"><span className="brand-mark">e</span><span>eventra<span className="brand-dot">.</span></span></a><p>Make memories. Meet people. Be there.</p><span>© 2026 EVENTRA · MADE FOR THE MOMENT</span></footer>

      {selectedEvent && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedEvent(null) }}><section className="event-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setSelectedEvent(null)} aria-label="Close">×</button><img className="modal-image" src={selectedEvent.image} alt="" /><div className="modal-content"><span className="modal-category">{selectedEvent.category}</span><h2 id="modal-title">{selectedEvent.title}</h2><p>{selectedEvent.description}</p><div className="modal-facts"><span>◷ {dateLabel(selectedEvent.date)} · {selectedEvent.time}</span><span>⌖ {selectedEvent.venue}</span><span>◎ {remainingSeats(selectedEvent)} spots available</span><strong>{selectedEvent.price}</strong></div><button className="button button-primary full-button" onClick={() => beginRegistration(selectedEvent)}>Register for this event ↗</button></div></section></div>}

      {registerEvent && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setRegisterEvent(null) }}><section className="register-modal" role="dialog" aria-modal="true" aria-labelledby="register-title"><button className="modal-close" onClick={() => setRegisterEvent(null)} aria-label="Close">×</button>{success ? <div className="success-state"><div className="success-icon">✓</div><div className="eyebrow">YOU'RE ON THE LIST</div><h2>See you <span>there.</span></h2><p>Your registration for <strong>{registerEvent.title}</strong> has been saved on this device.</p><button className="button button-primary full-button" onClick={() => setRegisterEvent(null)}>Done</button></div> : <><div className="eyebrow"><span className="eyebrow-line" /> SAVE YOUR SPOT</div><h2 id="register-title">Let's make<br /><span>it happen.</span></h2><p className="register-subtitle">Register for <strong>{registerEvent.title}</strong></p><form onSubmit={submitRegistration} className="registration-form"><label>Full name<input required minLength="2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label><label>Email address<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label><label>Phone number<input required type="tel" pattern="[0-9+() -]{8,15}" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Your contact number" /></label>{formError && <p className="form-error" role="alert">{formError}</p>}<button className="button button-primary full-button" type="submit">Confirm registration ↗</button></form><p className="privacy-note">Demo project · Registration details stay in this browser.</p></>}</section></div>}
    </div>
  )
}

export default App
