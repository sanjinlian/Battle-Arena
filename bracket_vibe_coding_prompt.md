# CHAZZ Battle Arena｜參賽對戰前台 Vibe Coding Prompt

請建立一個**響應式、可互動的格鬥賽事對戰前台頁面**，名稱為「CHAZZ Battle Arena Season 01」。此頁面需要將 A 組與 B 組的淘汰賽資料，以清楚、具有競賽感的 bracket 介面呈現。

## 一、技術要求

請使用以下技術製作：

- React
- TypeScript
- Tailwind CSS
- 元件化設計
- 響應式支援桌面、平板與手機
- 所有資料先使用前端 mock data，但資料結構必須保留日後串接 Google Sheets API 的能力
- 不要把儲存格位置直接散落在 UI 元件中，請集中放在 `bracketConfig.ts` 或相同用途的設定檔
- 使用語意化 HTML、鍵盤可操作的按鈕、清楚的 focus 狀態與適當的色彩對比

## 二、整體畫面需求

頁面上方顯示賽事標題：

> CHAZZ Battle Arena Season 01

提供以下功能：

1. 在 A 組與 B 組之間切換。
2. 顯示目前選擇的組別、比賽進度與賽事狀態。
3. 顯示完整淘汰賽流程：16 強、8 強、準決賽、決賽。
4. 另外顯示冠軍、亞軍、季軍與第 4 名結果區塊。
5. 每個對戰卡片需要顯示兩位參賽者、A/B 側別、比分、勝者、回合判定與裁判檢查狀態。
6. 尚未產生的選手顯示「待定」，尚未結束的比賽顯示「待判定」。
7. 勝者使用高亮色顯示，落敗者降低透明度但仍保留姓名。
8. 在手機版不要強制把所有輪次縮小到不可閱讀，請改用水平滾動 bracket 或輪次分頁。
9. 桌面版以橫向 bracket 方式排列各輪次，從左至右依序為 16 強、8 強、準決賽、決賽。
10. 頁面應具有現代競技活動視覺，例如深色背景、霓虹綠或金色強調色、清楚的卡片邊界與連線效果，但不要過度使用動畫。

## 三、對戰卡片元件

請建立可重複使用的 `MatchCard` 元件，至少支援以下 props：

```ts
type MatchCardProps = {
  matchId: string;
  group: 'A' | 'B';
  round: 'R16' | 'QF' | 'SF' | 'FINAL' | 'THIRD_PLACE';
  label: string;
  playerA: string;
  playerB: string;
  winner?: string;
  scoreA?: number;
  scoreB?: number;
  roundRecord?: string;
  refereeCheck?: boolean;
  status: 'pending' | 'in_progress' | 'completed';
};
```

每張卡片必須包含：

- 場次標籤，例如「第 1 場」、「Q1」、「S1」、「決賽」
- A 選手列
- B 選手列
- A/B 側別標籤
- A、B 選手姓名
- A、B 選手總分
- 勝者標示
- 回合記錄／判定
- 裁判檢查狀態
- 比賽狀態

資料為空時請使用以下顯示規則：

```ts
const EMPTY_PLAYER = '待定';
const EMPTY_WINNER = '未定';
const EMPTY_STATUS = '待判定';
```

## 四、共同欄位與 Google Sheets 對應

未來串接 Google Sheets 時，請保留以下欄位對應概念：

- 參賽者側別：A 欄
- 參賽者姓名：B 欄
- 場次名稱：C 欄
- 勝方輸入欄：D 欄
- A 選手總分：E:G 欄
- B 選手總分：J:L 欄
- 回合記錄／判定：O 欄
- 8 強參賽者顯示欄：P 欄
- 8 強勝方輸入欄：R 欄
- 8 強 A 總分：S:U 欄
- 8 強 B 總分：X:Z 欄
- 8 強回合判定：AC 欄
- 準決賽參賽者顯示欄：AD 欄
- 準決賽識別標籤：AE 欄
- 準決賽勝方輸入欄：AF 欄
- 準決賽 A 總分：AG:AI 欄
- 準決賽 B 總分：AL:AN 欄
- 準決賽回合判定：AQ 欄
- 決賽參賽者顯示欄：AR 欄
- 決賽識別欄：AS 欄
- 決賽勝方：AT 欄
- 決賽 A 總分：AU:AW 欄
- 決賽 B 總分：AZ:BB 欄
- 決賽回合判定：BE 欄
- 冠軍／晉級結果：BF 欄

## 五、A 組資料配置

### A 組 16 強

A 組 16 強參賽者由 `Registration!C2:C34` 依序帶入：

```ts
const groupARound16 = [
  { id: 'A-R16-01', label: '第 1 場', playerCells: ['B7', 'B8'], matchCell: 'C7:C8', winnerCell: 'D7', scoreACells: 'E7:G7', scoreBCells: 'J7:L7', recordCell: 'O7' },
  { id: 'A-R16-02', label: '第 2 場', playerCells: ['B15', 'B16'], matchCell: 'C15:C16', winnerCell: 'D15', scoreACells: 'E15:G15', scoreBCells: 'J15:L15', recordCell: 'O15' },
  { id: 'A-R16-03', label: '第 3 場', playerCells: ['B23', 'B24'], matchCell: 'C23:C24', winnerCell: 'D23', scoreACells: 'E23:G23', scoreBCells: 'J23:L23', recordCell: 'O23' },
  { id: 'A-R16-04', label: '第 4 場', playerCells: ['B31', 'B32'], matchCell: 'C31:C32', winnerCell: 'D31', scoreACells: 'E31:G31', scoreBCells: 'J31:L31', recordCell: 'O31' },
  { id: 'A-R16-05', label: '第 5 場', playerCells: ['B36', 'B37'], matchCell: 'C36:C37', winnerCell: 'D36', scoreACells: 'E36:G36', scoreBCells: 'J36:L36', recordCell: 'O36' },
  { id: 'A-R16-06', label: '第 6 場', playerCells: ['B44', 'B45'], matchCell: 'C44:C45', winnerCell: 'D44', scoreACells: 'E44:G44', scoreBCells: 'J44:L44', recordCell: 'O44' },
  { id: 'A-R16-07', label: '第 7 場', playerCells: ['B52', 'B53'], matchCell: 'C52:C53', winnerCell: 'D52', scoreACells: 'E52:G52', scoreBCells: 'J52:L52', recordCell: 'O52' },
  { id: 'A-R16-08', label: '第 8 場', playerCells: ['B60', 'B61'], matchCell: 'C60:C61', winnerCell: 'D60', scoreACells: 'E60:G60', scoreBCells: 'J60:L60', recordCell: 'O60' },
];
```

### A 組 8 強

8 強選手由 16 強勝方欄位自動帶入：

```ts
const groupAQuarterFinals = [
  { id: 'A-QF-01', label: 'Q1', sourceCells: ['D7', 'D8', 'D15', 'D16'], playerDisplayCells: 'P7:P10', winnerCell: 'R7', scoreACells: 'S7:U7', scoreBCells: 'X7:Z7', recordCell: 'AC7' },
  { id: 'A-QF-02', label: 'Q2', sourceCells: ['D23', 'D24', 'D31', 'D32'], playerDisplayCells: 'P23:P26', winnerCell: 'R23', scoreACells: 'S23:U23', scoreBCells: 'X23:Z23', recordCell: 'AC23' },
  { id: 'A-QF-03', label: 'Q3', sourceCells: ['D36', 'D37', 'D44', 'D45'], playerDisplayCells: 'P36:P39', winnerCell: 'R36', scoreACells: 'S36:U36', scoreBCells: 'X36:Z36', recordCell: 'AC36' },
  { id: 'A-QF-04', label: 'Q4', sourceCells: ['D52', 'D53', 'D60', 'D61'], playerDisplayCells: 'P52:P55', winnerCell: 'R52', scoreACells: 'S52:U52', scoreBCells: 'X52:Z52', recordCell: 'AC52' },
];
```

### A 組準決賽

```ts
const groupASemiFinals = [
  { id: 'A-SF-01', label: 'S1', sourceCells: ['R7', 'R8', 'R9', 'R10'], playerDisplayCells: 'AD7:AD14', winnerCell: 'AF7', scoreACells: 'AG7:AI7', scoreBCells: 'AL7:AN7', recordCell: 'AQ7' },
  { id: 'A-SF-02', label: 'S2', sourceCells: ['R23', 'R24', 'R25', 'R26'], playerDisplayCells: 'AD36:AD43', winnerCell: 'AF36', scoreACells: 'AG36:AI36', scoreBCells: 'AL36:AN36', recordCell: 'AQ36' },
];
```

### A 組決賽與排名

```ts
const groupAFinal = {
  id: 'A-FINAL',
  label: '決賽',
  sourceCells: ['AF7', 'AF36'],
  playerDisplayCells: 'AR7:AR8',
  winnerCell: 'AT7',
  scoreACells: 'AU7:AW7',
  scoreBCells: 'AZ7:BB7',
  recordCell: 'BE7',
  championDisplayCells: 'BF7:BF8',
};

const groupAPlacements = {
  thirdPlace: { playerDisplayCells: 'AR44:AR45', winnerCell: 'AT46', scoreACells: 'AU46:AW46', scoreBCells: 'AZ46:BB46', recordCell: 'BE46', resultCells: 'BF46:BF47' },
  secondPlace: { resultCells: 'BF50:BF51' },
  fourthPlace: { resultCells: 'BF60:BF61' },
};
```

## 六、B 組資料配置

B 組的資料結構與 A 組完全相同，但列號不同。

```ts
const groupBRound16 = [
  { id: 'B-R16-01', label: '第 1 場', playerCells: ['B70', 'B71'], matchCell: 'C70:C71', winnerCell: 'D70', scoreACells: 'E70:G70', scoreBCells: 'J70:L70', recordCell: 'O70' },
  { id: 'B-R16-02', label: '第 2 場', playerCells: ['B78', 'B79'], matchCell: 'C78:C79', winnerCell: 'D78', scoreACells: 'E78:G78', scoreBCells: 'J78:L78', recordCell: 'O78' },
  { id: 'B-R16-03', label: '第 3 場', playerCells: ['B86', 'B87'], matchCell: 'C86:C87', winnerCell: 'D86', scoreACells: 'E86:G86', scoreBCells: 'J86:L86', recordCell: 'O86' },
  { id: 'B-R16-04', label: '第 4 場', playerCells: ['B94', 'B95'], matchCell: 'C94:C95', winnerCell: 'D94', scoreACells: 'E94:G94', scoreBCells: 'J94:L94', recordCell: 'O94' },
  { id: 'B-R16-05', label: '第 5 場', playerCells: ['B99', 'B100'], matchCell: 'C99:C100', winnerCell: 'D99', scoreACells: 'E99:G99', scoreBCells: 'J99:L99', recordCell: 'O99' },
  { id: 'B-R16-06', label: '第 6 場', playerCells: ['B107', 'B108'], matchCell: 'C107:C108', winnerCell: 'D107', scoreACells: 'E107:G107', scoreBCells: 'J107:L107', recordCell: 'O107' },
  { id: 'B-R16-07', label: '第 7 場', playerCells: ['B115', 'B116'], matchCell: 'C115:C116', winnerCell: 'D115', scoreACells: 'E115:G115', scoreBCells: 'J115:L115', recordCell: 'O115' },
  { id: 'B-R16-08', label: '第 8 場', playerCells: ['B123', 'B124'], matchCell: 'C123:C124', winnerCell: 'D123', scoreACells: 'E123:G123', scoreBCells: 'J123:L123', recordCell: 'O123' },
];

const groupBQuarterFinals = [
  { id: 'B-QF-01', label: 'Q1', sourceCells: ['D70', 'D71', 'D78', 'D79'], playerDisplayCells: 'P70:P73', winnerCell: 'R70', scoreACells: 'S70:U70', scoreBCells: 'X70:Z70', recordCell: 'AC70' },
  { id: 'B-QF-02', label: 'Q2', sourceCells: ['D86', 'D87', 'D94', 'D95'], playerDisplayCells: 'P86:P89', winnerCell: 'R86', scoreACells: 'S86:U86', scoreBCells: 'X86:Z86', recordCell: 'AC86' },
  { id: 'B-QF-03', label: 'Q3', sourceCells: ['D99', 'D100', 'D107', 'D108'], playerDisplayCells: 'P99:P102', winnerCell: 'R99', scoreACells: 'S99:U99', scoreBCells: 'X99:Z99', recordCell: 'AC99' },
  { id: 'B-QF-04', label: 'Q4', sourceCells: ['D115', 'D116', 'D123', 'D124'], playerDisplayCells: 'P115:P118', winnerCell: 'R115', scoreACells: 'S115:U115', scoreBCells: 'X115:Z115', recordCell: 'AC115' },
];

const groupBSemiFinals = [
  { id: 'B-SF-01', label: 'S1', sourceCells: ['R70', 'R71', 'R72', 'R73'], playerDisplayCells: 'AD70:AD77', winnerCell: 'AF70', scoreACells: 'AG70:AI70', scoreBCells: 'AL70:AN70', recordCell: 'AQ70' },
  { id: 'B-SF-02', label: 'S2', sourceCells: ['R86', 'R87', 'R88', 'R89'], playerDisplayCells: 'AD99:AD106', winnerCell: 'AF99', scoreACells: 'AG99:AI99', scoreBCells: 'AL99:AN99', recordCell: 'AQ99' },
];

const groupBFinal = {
  id: 'B-FINAL',
  label: '決賽',
  sourceCells: ['AF70', 'AF99'],
  playerDisplayCells: 'AR70:AR71',
  winnerCell: 'AT70',
  scoreACells: 'AU70:AW70',
  scoreBCells: 'AZ70:BB70',
  recordCell: 'BE70',
  championDisplayCells: 'BF70:BF71',
};

const groupBPlacements = {
  thirdPlace: { resultCells: 'BF81:BF82' },
};
```

## 七、資料流與互動邏輯

請實作以下資料流：

1. 16 強的 `playerA` 與 `playerB` 直接來自報名資料。
2. 使用者輸入或 mock data 設定 16 強 `winner` 後，該勝者自動出現在下一輪 8 強的參賽者位置。
3. 8 強勝者自動進入準決賽。
4. 準決賽勝者自動進入決賽。
5. 決賽勝者自動更新冠軍區塊。
6. 每場比賽都可以設定 `scoreA`、`scoreB`、`roundRecord` 與 `refereeCheck`。
7. 若比賽尚未開始，顯示「待判定」。
8. 若已有比分但尚未產生勝者，顯示「進行中」。
9. 若已有勝者，顯示「已完成」。
10. 前台顯示資料與原始 Google Sheets 儲存格位置必須分離；儲存格位置只作為資料來源 metadata，不要直接作為畫面文字。

## 八、建議的元件結構

```text
App
├── TournamentHeader
├── GroupTabs
├── TournamentSummary
├── BracketBoard
│   ├── RoundColumn: 16 強
│   ├── RoundColumn: 8 強
│   ├── RoundColumn: 準決賽
│   └── RoundColumn: 決賽
├── MatchCard
├── MatchConnector
├── PlacementPanel
│   ├── ChampionCard
│   ├── RunnerUpCard
│   ├── ThirdPlaceCard
│   └── FourthPlaceCard
└── MobileRoundSelector
```

## 九、畫面視覺規範

- 背景使用深色，例如 `#080B12` 或接近黑色的藍灰色。
- 卡片使用深灰色，邊框使用低透明度灰色。
- 勝者使用金色或亮綠色高亮。
- 進行中的比賽可使用亮綠色狀態標籤。
- 待判定使用中性灰色。
- 冠軍卡片需要明顯大於其他排名卡片。
- A 組與 B 組使用不同但協調的識別色。
- 連接各輪次的線條需要在桌面版顯示，在手機版可隱藏。
- 字體必須清楚支援中文與英文參賽者姓名。
- 不要使用過度複雜的 3D 效果，以免降低資料閱讀性。

## 十、完成條件

請直接完成一個可以執行的前端頁面，並且：

- 預設載入 A 組。
- 可以切換至 B 組。
- 顯示完整 16 強至決賽的 bracket。
- 使用 mock data 示範至少數場已完成、數場進行中與數場待判定的比賽。
- 能清楚看出勝者如何晉級下一輪。
- 能在手機上正常閱讀。
- 將 bracket 資料、UI 元件與顯示邏輯分離。
- 不要省略任何輪次、比分、回合記錄、裁判檢查與冠軍排名欄位。
- 先建立完整畫面，再補上資料串接介面；不要一開始就要求 Google Sheets API 金鑰。

請依照以上規格直接生成完整可執行的前端介面，不要只提供概念說明或靜態 HTML 片段。
