/* =====================================================
   ✏️ 여기만 고치면 돼요
   ===================================================== */

/* ===== 내 정보 ===== */
const PROFILE = {
  name: '내 이름',                                  // 사이트에 크게 보일 이름
  intro: '생활에 필요한 작은 앱을 직접 만들어요.',     // 한 줄 소개
  github: 'https://github.com/내아이디',            // 필요 없으면 '' 로 비워두기
  email: '',                                        // 예: 'me@example.com' (비워두면 안 보여요)
};

/* ===== 만든 것 목록 =====
   새로 만든 게 생기면 { ... }, 한 덩어리를 복사해서 아래에 붙이고 내용만 바꿔요.
   art: 'pot' 은 냄비 그림이에요. 그림이 없으면 '' 로 두면 이름 첫 글자가 나와요. */
const WORKS = [
  {
    title: '샤브 일지',
    when: '2026년 10월',
    desc: '동생과 집에서 먹은 샤브샤브를 달력에 기록하는 아이폰용 앱이에요. 한 사람이 저장하면 다른 폰에도 바로 나타나요.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    url: 'https://내아이디.github.io/저장소이름/',   // 샤브 일지 주소로 바꾸기
    art: 'pot',
  },
];

/* =====================================================
   아래는 고치지 않아도 돼요
   ===================================================== */

/* ===== 그림 ===== */
const ART = {
  pot: `
    <svg class="art" viewBox="0 0 100 100" aria-hidden="true">
      <g class="steam">
        <path d="M38 38 q-5 -6 0 -12 q5 -6 0 -12"/>
        <path d="M50 36 q-5 -6 0 -12 q5 -6 0 -12"/>
        <path d="M62 38 q-5 -6 0 -12 q5 -6 0 -12"/>
      </g>
      <path class="body" d="M16 54 Q17 86 50 87 Q83 86 84 54"/>
      <path d="M16 58 h-8 M84 58 h8"/>
      <ellipse cx="50" cy="54" rx="34" ry="10"/>
      <ellipse class="broth" cx="50" cy="55" rx="28" ry="6.5"/>
      <ellipse class="leaf" cx="38" cy="54" rx="7" ry="3" transform="rotate(-15 38 54)"/>
      <path class="meat" d="M50 51 q6 -2 10 2 q-4 5 -10 4 z"/>
      <circle class="leaf" cx="66" cy="56" r="2.6"/>
    </svg>`,
};

/* 글자를 안전하게 넣기 */
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}

/* 그림 칸: 그림이 있으면 그림, 없으면 이름 첫 글자 */
function thumb(w) {
  const svg = ART[w.art];
  if (svg) return `<span class="thumb">${svg}</span>`;
  return `<span class="thumb" aria-hidden="true" style="font-family:'Gowun Batang',serif;font-size:2.2rem;">${esc(w.title.charAt(0))}</span>`;
}

/* 작품 한 줄 */
function workItem(w) {
  return `
    <li>
      <a class="work" href="${esc(w.url)}" target="_blank" rel="noopener">
        ${thumb(w)}
        <div>
          <h3>${esc(w.title)}</h3>
          ${w.when ? `<p class="when">${esc(w.when)}</p>` : ''}
          <p class="desc">${esc(w.desc)}</p>
          ${w.tools && w.tools.length ? `<p class="tools">만든 재료: ${w.tools.map(esc).join(', ')}</p>` : ''}
          <span class="open">${esc(w.title)} 열어보기</span>
        </div>
      </a>
    </li>`;
}

/* 아직 비어 있는 다음 칸 */
function emptyItem() {
  return `
    <li>
      <div class="work empty">
        <span class="thumb" aria-hidden="true">+</span>
        <div>
          <h3>다음에 만들 것</h3>
          <p class="desc">새로 만든 게 생기면 여기에 들어와요.</p>
        </div>
      </div>
    </li>`;
}

/* 화면 채우기 */
function render() {
  document.title = `${PROFILE.name} 포트폴리오`;
  document.getElementById('name').textContent = PROFILE.name;
  document.getElementById('intro').textContent = PROFILE.intro;

  document.getElementById('work-list').innerHTML =
    WORKS.map(workItem).join('') + emptyItem();

  const links = [];
  if (PROFILE.github) links.push(`<a href="${esc(PROFILE.github)}" target="_blank" rel="noopener">GitHub</a>`);
  if (PROFILE.email) links.push(`<a href="mailto:${esc(PROFILE.email)}">${esc(PROFILE.email)}</a>`);
  links.push(`<span>© ${new Date().getFullYear()} ${esc(PROFILE.name)}</span>`);
  document.getElementById('foot').innerHTML = links.join('');
}

render();
