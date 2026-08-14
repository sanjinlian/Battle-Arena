// ============================================================
// Bracket Config — Google Sheets cell positions (metadata only)
// Never used as display text in UI components
// ============================================================

export const BRACKET_SHEET = 'bracket'
export const SETTING_SHEET = 'Setting'
export const SEASON_ENABLED_CELL = 'C13' // Setting!C13 — TRUE/FALSE gate

// ── A Group ─────────────────────────────────────────────────

export const groupARound16Config = [
  { id: 'A-R16-01', label: '第 1 場', playerCells: ['B7', 'B8'], matchCell: 'C7:C8', winnerCell: 'D7', scoreACells: 'E7:G7', scoreBCells: 'J7:L7', recordCell: 'O7' },
  { id: 'A-R16-02', label: '第 2 場', playerCells: ['B15', 'B16'], matchCell: 'C15:C16', winnerCell: 'D15', scoreACells: 'E15:G15', scoreBCells: 'J15:L15', recordCell: 'O15' },
  { id: 'A-R16-03', label: '第 3 場', playerCells: ['B23', 'B24'], matchCell: 'C23:C24', winnerCell: 'D23', scoreACells: 'E23:G23', scoreBCells: 'J23:L23', recordCell: 'O23' },
  { id: 'A-R16-04', label: '第 4 場', playerCells: ['B31', 'B32'], matchCell: 'C31:C32', winnerCell: 'D31', scoreACells: 'E31:G31', scoreBCells: 'J31:L31', recordCell: 'O31' },
  { id: 'A-R16-05', label: '第 5 場', playerCells: ['B36', 'B37'], matchCell: 'C36:C37', winnerCell: 'D36', scoreACells: 'E36:G36', scoreBCells: 'J36:L36', recordCell: 'O36' },
  { id: 'A-R16-06', label: '第 6 場', playerCells: ['B44', 'B45'], matchCell: 'C44:C45', winnerCell: 'D44', scoreACells: 'E44:G44', scoreBCells: 'J44:L44', recordCell: 'O44' },
  { id: 'A-R16-07', label: '第 7 場', playerCells: ['B52', 'B53'], matchCell: 'C52:C53', winnerCell: 'D52', scoreACells: 'E52:G52', scoreBCells: 'J52:L52', recordCell: 'O52' },
  { id: 'A-R16-08', label: '第 8 場', playerCells: ['B60', 'B61'], matchCell: 'C60:C61', winnerCell: 'D60', scoreACells: 'E60:G60', scoreBCells: 'J60:L60', recordCell: 'O60' },
]

export const groupAQuarterFinalsConfig = [
  { id: 'A-QF-01', label: 'Q1', sourceCells: ['D7', 'D8', 'D15', 'D16'], playerDisplayCells: 'P7:P10', winnerCell: 'R7', scoreACells: 'S7:U7', scoreBCells: 'X7:Z7', recordCell: 'AC7' },
  { id: 'A-QF-02', label: 'Q2', sourceCells: ['D23', 'D24', 'D31', 'D32'], playerDisplayCells: 'P23:P26', winnerCell: 'R23', scoreACells: 'S23:U23', scoreBCells: 'X23:Z23', recordCell: 'AC23' },
  { id: 'A-QF-03', label: 'Q3', sourceCells: ['D36', 'D37', 'D44', 'D45'], playerDisplayCells: 'P36:P39', winnerCell: 'R36', scoreACells: 'S36:U36', scoreBCells: 'X36:Z36', recordCell: 'AC36' },
  { id: 'A-QF-04', label: 'Q4', sourceCells: ['D52', 'D53', 'D60', 'D61'], playerDisplayCells: 'P52:P55', winnerCell: 'R52', scoreACells: 'S52:U52', scoreBCells: 'X52:Z52', recordCell: 'AC52' },
]

export const groupASemiFinalsConfig = [
  { id: 'A-SF-01', label: 'S1', sourceCells: ['R7', 'R8', 'R9', 'R10'], playerDisplayCells: 'AD7:AD14', winnerCell: 'AF7', scoreACells: 'AG7:AI7', scoreBCells: 'AL7:AN7', recordCell: 'AQ7' },
  { id: 'A-SF-02', label: 'S2', sourceCells: ['R23', 'R24', 'R25', 'R26'], playerDisplayCells: 'AD36:AD43', winnerCell: 'AF36', scoreACells: 'AG36:AI36', scoreBCells: 'AL36:AN36', recordCell: 'AQ36' },
]

export const groupAFinalConfig = {
  id: 'A-FINAL',
  label: '決賽',
  sourceCells: ['AF7', 'AF36'],
  playerDisplayCells: 'AR7:AR8',
  winnerCell: 'AT7',
  scoreACells: 'AU7:AW7',
  scoreBCells: 'AZ7:BB7',
  recordCell: 'BE7',
  championDisplayCells: 'BF7:BF8',
}

export const groupAThirdPlaceConfig = {
  id: 'A-THIRD',
  label: '季軍賽',
  playerDisplayCells: 'AR44:AR45',
  winnerCell: 'AT46',
  scoreACells: 'AU46:AW46',
  scoreBCells: 'AZ46:BB46',
  recordCell: 'BE46',
  resultCells: 'BF46:BF47',
}

// ── B Group ─────────────────────────────────────────────────

export const groupBRound16Config = [
  { id: 'B-R16-01', label: '第 1 場', playerCells: ['B70', 'B71'], matchCell: 'C70:C71', winnerCell: 'D70', scoreACells: 'E70:G70', scoreBCells: 'J70:L70', recordCell: 'O70' },
  { id: 'B-R16-02', label: '第 2 場', playerCells: ['B78', 'B79'], matchCell: 'C78:C79', winnerCell: 'D78', scoreACells: 'E78:G78', scoreBCells: 'J78:L78', recordCell: 'O78' },
  { id: 'B-R16-03', label: '第 3 場', playerCells: ['B86', 'B87'], matchCell: 'C86:C87', winnerCell: 'D86', scoreACells: 'E86:G86', scoreBCells: 'J86:L86', recordCell: 'O86' },
  { id: 'B-R16-04', label: '第 4 場', playerCells: ['B94', 'B95'], matchCell: 'C94:C95', winnerCell: 'D94', scoreACells: 'E94:G94', scoreBCells: 'J94:L94', recordCell: 'O94' },
  { id: 'B-R16-05', label: '第 5 場', playerCells: ['B99', 'B100'], matchCell: 'C99:C100', winnerCell: 'D99', scoreACells: 'E99:G99', scoreBCells: 'J99:L99', recordCell: 'O99' },
  { id: 'B-R16-06', label: '第 6 場', playerCells: ['B107', 'B108'], matchCell: 'C107:C108', winnerCell: 'D107', scoreACells: 'E107:G107', scoreBCells: 'J107:L107', recordCell: 'O107' },
  { id: 'B-R16-07', label: '第 7 場', playerCells: ['B115', 'B116'], matchCell: 'C115:C116', winnerCell: 'D115', scoreACells: 'E115:G115', scoreBCells: 'J115:L115', recordCell: 'O115' },
  { id: 'B-R16-08', label: '第 8 場', playerCells: ['B123', 'B124'], matchCell: 'C123:C124', winnerCell: 'D123', scoreACells: 'E123:G123', scoreBCells: 'J123:L123', recordCell: 'O123' },
]

export const groupBQuarterFinalsConfig = [
  { id: 'B-QF-01', label: 'Q1', sourceCells: ['D70', 'D71', 'D78', 'D79'], playerDisplayCells: 'P70:P73', winnerCell: 'R70', scoreACells: 'S70:U70', scoreBCells: 'X70:Z70', recordCell: 'AC70' },
  { id: 'B-QF-02', label: 'Q2', sourceCells: ['D86', 'D87', 'D94', 'D95'], playerDisplayCells: 'P86:P89', winnerCell: 'R86', scoreACells: 'S86:U86', scoreBCells: 'X86:Z86', recordCell: 'AC86' },
  { id: 'B-QF-03', label: 'Q3', sourceCells: ['D99', 'D100', 'D107', 'D108'], playerDisplayCells: 'P99:P102', winnerCell: 'R99', scoreACells: 'S99:U99', scoreBCells: 'X99:Z99', recordCell: 'AC99' },
  { id: 'B-QF-04', label: 'Q4', sourceCells: ['D115', 'D116', 'D123', 'D124'], playerDisplayCells: 'P115:P118', winnerCell: 'R115', scoreACells: 'S115:U115', scoreBCells: 'X115:Z115', recordCell: 'AC115' },
]

export const groupBSemiFinalsConfig = [
  { id: 'B-SF-01', label: 'S1', sourceCells: ['R70', 'R71', 'R72', 'R73'], playerDisplayCells: 'AD70:AD77', winnerCell: 'AF70', scoreACells: 'AG70:AI70', scoreBCells: 'AL70:AN70', recordCell: 'AQ70' },
  { id: 'B-SF-02', label: 'S2', sourceCells: ['R86', 'R87', 'R88', 'R89'], playerDisplayCells: 'AD99:AD106', winnerCell: 'AF99', scoreACells: 'AG99:AI99', scoreBCells: 'AL99:AN99', recordCell: 'AQ99' },
]

export const groupBFinalConfig = {
  id: 'B-FINAL',
  label: '決賽',
  sourceCells: ['AF70', 'AF99'],
  playerDisplayCells: 'AR70:AR71',
  winnerCell: 'AT70',
  scoreACells: 'AU70:AW70',
  scoreBCells: 'AZ70:BB70',
  recordCell: 'BE70',
  championDisplayCells: 'BF70:BF71',
}

export const groupBThirdPlaceConfig = {
  id: 'B-THIRD',
  label: '季軍賽',
  resultCells: 'BF81:BF82',
}
