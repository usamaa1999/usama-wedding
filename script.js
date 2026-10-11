/* Wedding invitation site starter. Replace the venue and time placeholders before publishing. */
const eventsByPage = {
  mehndi: [
    { date: '2026-12-10', dateLabel: 'Thursday, 10 December 2026', title: 'Usama & Areej’s Mehndi', subtitle: 'Mehndi celebration', time: 'Time to be confirmed', venue: 'Venue to be confirmed', calendarName: 'Usama and Areej Mehndi' },
    { date: '2026-12-11', dateLabel: 'Friday, 11 December 2026', title: 'Usama Weds Hamna', subtitle: 'Barat', time: 'Time to be confirmed', venue: 'Venue to be confirmed', calendarName: 'Usama Weds Hamna, Barat' },
    { date: '2026-12-12', dateLabel: 'Saturday, 12 December 2026', title: 'Walima', subtitle: 'Usama’s Walima', time: 'Time to be confirmed', venue: 'Venue to be confirmed', calendarName: 'Usama Walima' }
  ],
  barat: [
    { date: '2026-12-11', dateLabel: 'Friday, 11 December 2026', title: 'Usama Weds Hamna', subtitle: 'Barat', time: 'Time to be confirmed', venue: 'Venue to be confirmed', calendarName: 'Usama Weds Hamna, Barat' },
    { date: '2026-12-12', dateLabel: 'Saturday, 12 December 2026', title: 'Walima', subtitle: 'Usama’s Walima', time: 'Time to be confirmed', venue: 'Venue to be confirmed', calendarName: 'Usama Walima' }
  ],
  walima: [
    { date: '2026-12-12', dateLabel: 'Saturday, 12 December 2026', title: 'Walima', subtitle: 'Usama’s Walima', time: 'Time to be confirmed', venue: 'Venue to be confirmed', calendarName: 'Usama Walima' }
  ]
};

function getPageType() {
  const path = window.location.pathname.toLowerCase();
  if (path.endsWith('/mehndi.html') || path.endsWith('mehndi.html')) return 'mehndi';
  if (path.endsWith('/barat.html') || path.endsWith('barat.html')) return 'barat';
  if (path.endsWith('/walima.html') || path.endsWith('walima.html')) return 'walima';
  return 'mehndi';
}
function escapeText(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
}
function calendarHref(event) {
  // Google Calendar event creation page. Exact time/location can be filled in before launch.
  const start = event.date.replaceAll('-', '');
  const endDate = new Date(`${event.date}T12:00:00`);
  endDate.setDate(endDate.getDate() + 1);
  const end = `${endDate.getFullYear()}${String(endDate.getMonth()+1).padStart(2,'0')}${String(endDate.getDate()).padStart(2,'0')}`;
  const params = new URLSearchParams({ action: 'TEMPLATE', text: event.calendarName, dates: `${start}/${end}`, details: 'You are invited to celebrate with Usama and family. Please confirm the event time and venue from the invitation.', location: event.venue === 'Venue to be confirmed' ? '' : event.venue, ctz: 'Asia/Karachi' });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
function renderEvents() {
  const type = getPageType();
  const events = eventsByPage[type] || eventsByPage.mehndi;
  const container = document.getElementById('events');
  container.innerHTML = events.map((event, index) => `
    <article class="event-card" style="animation-delay:${index * 80}ms">
      <p class="event-date">${escapeText(event.dateLabel)}</p>
      <h2 class="event-title">${escapeText(event.title)}</h2>
      <p class="event-subtitle">${escapeText(event.subtitle)}</p>
      <p class="event-meta">◷ ${escapeText(event.time)}<br>⌖ ${escapeText(event.venue)}</p>
      <a class="calendar-button" href="${calendarHref(event)}" target="_blank" rel="noopener noreferrer">＋ Add to Calendar</a>
      <p class="notice">Calendar opens with event details. Save it to add it to your calendar.</p>
    </article>`).join('');
  const pageNames = { mehndi: 'Mehndi Invitation', barat: 'Barat Invitation', walima: 'Walima Invitation' };
  document.title = `${pageNames[type]} | Usama Weds Hamna`;
}
document.addEventListener('DOMContentLoaded', renderEvents);
