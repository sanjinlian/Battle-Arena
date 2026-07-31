/* ============================================================
 * CMS Fallback Data
 * Used when VITE_GAS_URL is not set or GAS fetch fails.
 * Types have been moved to src/types/cms.ts
 * ============================================================ */

import type {
  CmsData,
  WebsiteConfig,
  HeroPrize,
  EventInfo,
  ScheduleItem,
  Rule,
  FAQ,
  Announcement,
  RegistrationCategory,
} from '../types/cms'

// Re-export types for backwards compatibility
export type {
  WebsiteConfig,
  HeroPrize,
  EventInfo,
  ScheduleItem,
  Rule,
  FAQ,
  Announcement,
  RegistrationCategory,
}

/* ─── Fallback Website Config ─── */
export const websiteConfig: WebsiteConfig = {
  websiteName: 'CHAZZ Battle Arena',
  theme: 'Neo Dadaism',
  currentSeason: 'Season01',
  registrationOpen: true,
  enableLoading: true,
  enableMusic: false,
  enableHero: true,
  maintenance: false,
}

/* ─── Fallback Hero Prizes ─── */
export const heroPrizes: HeroPrize[] = [
  {
    enable: true,
    order: 1,
    heroName: 'Dragon Cup',
    beybladeImage: '',
    prizeImage: '',
    prizeName: 'Dragon Fang Limited',
    description: '冠軍限定版鑄鋁陀螺，銀色噴砂處理，重量 265g，附限定收藏箱。僅此一顆，無法複製。',
    color: '#E63946',
    accentColor: '#FF6B74',
    buttonLink: '#register',
  },
  {
    enable: true,
    order: 2,
    heroName: 'Storm Kaiser',
    beybladeImage: '',
    prizeImage: '',
    prizeName: 'Kaiser Zero Limited',
    description: '速度系冠軍限定，航空鋁合金鑄造，金色電鍍，重量 248g，附冠軍証書。',
    color: '#FFD600',
    accentColor: '#FFE94D',
    buttonLink: '#register',
  },
  {
    enable: true,
    order: 3,
    heroName: 'Shadow Cobra',
    beybladeImage: '',
    prizeImage: '',
    prizeName: 'Cobra Strike Limited',
    description: '防禦系冠軍限定，鋼鐵重量版，啞黑塗裝，重量 290g，附手工收藏盒。',
    color: '#1B2A6B',
    accentColor: '#3D5BCC',
    buttonLink: '#register',
  },
]

/* ─── Fallback Event Info ─── */
export const eventInfo: EventInfo = {
  title: 'CHAZZ Battle Arena — Season 01',
  date: '2026-08-15',
  location: 'CHAZZ Coffee × Battle Station\n台北市信義區松高路12號 B1',
  description:
    '陀螺戰士們，集結！首屆 CHAZZ Battle Arena 正式錦標賽現在開放報名。咖啡與戰鬥，藝術與力量，集結於此。不只是一場賽事，是一個時代的開始。',
  registerDeadline: '2026-08-10',
  maxParticipants: 64,
  fee: 'NT$ 350',
}

/* ─── Fallback Schedule ─── */
export const schedule: ScheduleItem[] = [
  { time: '09:00', event: '報到入場', description: '憑報名確認信 QR Code 入場，領取選手手冊', type: 'ceremony' },
  { time: '09:30', event: '開幕式', description: '賽前動員、贊助商介紹、規則宣講', type: 'ceremony' },
  { time: '10:00', event: '初級組資格賽', description: 'Group A — 8強循環賽，積分決定晉級', type: 'battle' },
  { time: '12:00', event: '午餐 × CHAZZ Coffee 時間', description: 'CHAZZ 限定咖啡招待，場內展示商品特賣', type: 'break' },
  { time: '13:00', event: '進階組資格賽', description: 'Group A/B 各 8 強，採單敗淘汰賽制', type: 'battle' },
  { time: '16:30', event: '準決賽 — 四強對決', description: 'Final Four，直播實況', type: 'special' },
  { time: '17:30', event: 'Grand Final 決賽', description: '冠亞季軍爭奪，現場評述，觀眾席開放', type: 'special' },
  { time: '18:30', event: '頒獎典禮', description: '冠軍獎品頒發、合影留念，Season 02 預告', type: 'ceremony' },
]

/* ─── Fallback Rules ─── */
export const rules: Rule[] = [
  { order: 1, title: '禁止非法改造', content: '所有陀螺必須為市售原廠零件組合，不允許任何加工、焊接、添加重量物。' },
  { order: 2, title: '禁止代打', content: '報名者本人必須親自出賽，不得委託他人代替出場比賽。' },
  { order: 3, title: '一人限報一組', content: '每位選手只能參加一個組別，不允許同時報名初級組與進階組。' },
  { order: 4, title: '服從裁判判決', content: '裁判判決為最終決定，選手對結果有異議須在當場向裁判組提出，事後不予受理。' },
  { order: 5, title: '尊重對手', content: '禁止任何形式的嘲諷、挑釁行為。違者將被取消出賽資格，不退報名費。' },
  { order: 6, title: '自備陀螺', content: '選手必須自備陀螺參賽，主辦方不提供借用陀螺。如陀螺在比賽中損壞，視同棄賽。' },
]

/* ─── Fallback FAQs ─── */
export const faqs: FAQ[] = [
  { question: '什麼是 CHAZZ Battle Arena？', answer: 'CHAZZ Battle Arena 是由 CHAZZ Coffee 主辦的陀螺競技平台，融合咖啡文化與戰鬥競技，每季舉辦一次正式錦標賽。' },
  { question: '如何報名參加比賽？', answer: '請在本網站完成會員登入後，點擊「立即報名」，選擇組別、填寫資料並完成報名。報名完成後將收到確認 Email。' },
  { question: '比賽使用什麼規格的陀螺？', answer: '本屆賽事採用 Burst 系統規格，選手可自由選擇市售 Burst 系統任何品牌零件組合。詳細禁止名單請參閱規則說明。' },
  { question: '報名費是否可退款？', answer: '報名截止（2026/08/10）前可申請全額退款。截止後恕不退費，但可轉讓名額給其他人，需事先通知主辦方。' },
  { question: '現場有販賣餐飲嗎？', answer: '有！現場設有 CHAZZ Coffee 快閃攤位，提供精品咖啡、甜點。選手報名憑證可享 9 折優惠。' },
  { question: '獎品是什麼？', answer: '各組冠軍將獲得限定版陀螺一顆、冠軍獎牌、CHAZZ 限定周邊及不等金額的消費金。詳細獎品請見「獎勵」區塊。' },
]

/* ─── Fallback Announcements ─── */
export const announcements: Announcement[] = [
  { enable: true, date: '2026-07-28', title: '🔥 Season 01 正式開放報名！', content: 'CHAZZ Battle Arena Season 01 即日起開放報名，名額有限，先搶先贏。報名截止：2026/08/10。', type: 'event' },
  { enable: true, date: '2026-07-25', title: '📢 賽程更新公告', content: '本屆賽事調整為全日制賽程（09:00 - 18:30），報到時間提前至 09:00，請注意時間調整。', type: 'info' },
  { enable: true, date: '2026-07-20', title: '⚠️ 陀螺改造禁止名單更新', content: '新增 3 款禁止使用零件，請確認您的陀螺配置符合規定。詳細名單見規則說明。', type: 'warning' },
  { enable: true, date: '2026-07-15', title: '🎁 贊助商加碼獎品', content: 'CHAZZ × MAXBURST 聯名贊助，額外提供季軍限定周邊套組，感謝品牌支持！', type: 'event' },
]

/* ─── Fallback Registration Categories ─── */
export const categories: RegistrationCategory[] = [
  { id: 'beginner', name: '初級組', description: '適合入門玩家，規則寬鬆，重視娛樂性', ageRange: '無限制', fee: 'NT$ 350', slots: 32, filled: 18 },
  { id: 'advanced', name: '進階組', description: '適合有競技經驗的玩家，正式賽制，裁判錄影', ageRange: '無限制', fee: 'NT$ 350', slots: 32, filled: 24 },
]

/* ─── Complete fallback CmsData object ─── */
export const fallbackData: CmsData = {
  websiteConfig,
  seasonConfig: {
    season: 'Season01',
    theme: 'Neo Dadaism',
    logo: '',
    background: '',
    music: '',
  },
  hero: heroPrizes,
  event: eventInfo,
  schedule,
  rules,
  faq: faqs,
  announcements,
  music: [],
  categories,
}
