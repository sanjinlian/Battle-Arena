import type { BracketTournamentData } from '../types/bracket'

export const bracketMockData: BracketTournamentData = {
  seasonEnabled: true,
  groupA: {
    round16: [
      { matchId: 'A-R16-01', group: 'A', round: 'R16', label: '第 1 場', playerA: '陳俊宏', playerB: '林志遠', winner: '陳俊宏', scoreA: 3, scoreB: 1, roundRecord: '2-0 / 1-0', refereeCheck: true, status: 'completed' },
      { matchId: 'A-R16-02', group: 'A', round: 'R16', label: '第 2 場', playerA: '黃建豪', playerB: '吳家銘', winner: '黃建豪', scoreA: 3, scoreB: 2, roundRecord: '1-1 / 1-0', refereeCheck: true, status: 'completed' },
      { matchId: 'A-R16-03', group: 'A', round: 'R16', label: '第 3 場', playerA: '蔡明翰', playerB: '張書豪', winner: '張書豪', scoreA: 1, scoreB: 3, roundRecord: '0-2 / 0-1', refereeCheck: true, status: 'completed' },
      { matchId: 'A-R16-04', group: 'A', round: 'R16', label: '第 4 場', playerA: '劉承翰', playerB: '王俊傑', scoreA: 2, scoreB: 2, roundRecord: '1-1 / 0-0', refereeCheck: false, status: 'in_progress' },
      { matchId: 'A-R16-05', group: 'A', round: 'R16', label: '第 5 場', playerA: '許哲維', playerB: '鄭宇翔', winner: '許哲維', scoreA: 3, scoreB: 0, roundRecord: '2-0 / 1-0', refereeCheck: true, status: 'completed' },
      { matchId: 'A-R16-06', group: 'A', round: 'R16', label: '第 6 場', playerA: '謝承軒', playerB: '江俊賢', status: 'pending' },
      { matchId: 'A-R16-07', group: 'A', round: 'R16', label: '第 7 場', playerA: '楊明哲', playerB: '洪志豪', status: 'pending' },
      { matchId: 'A-R16-08', group: 'A', round: 'R16', label: '第 8 場', playerA: '邱建宇', playerB: '沈威廷', status: 'pending' },
    ],
    quarterFinals: [
      { matchId: 'A-QF-01', group: 'A', round: 'QF', label: 'Q1', playerA: '陳俊宏', playerB: '黃建豪', winner: '陳俊宏', scoreA: 3, scoreB: 2, roundRecord: '1-1 / 1-0', refereeCheck: true, status: 'completed' },
      { matchId: 'A-QF-02', group: 'A', round: 'QF', label: 'Q2', playerA: '張書豪', playerB: '待定', status: 'pending' },
      { matchId: 'A-QF-03', group: 'A', round: 'QF', label: 'Q3', playerA: '許哲維', playerB: '待定', status: 'pending' },
      { matchId: 'A-QF-04', group: 'A', round: 'QF', label: 'Q4', playerA: '待定', playerB: '待定', status: 'pending' },
    ],
    semiFinals: [
      { matchId: 'A-SF-01', group: 'A', round: 'SF', label: 'S1', playerA: '陳俊宏', playerB: '待定', status: 'pending' },
      { matchId: 'A-SF-02', group: 'A', round: 'SF', label: 'S2', playerA: '待定', playerB: '待定', status: 'pending' },
    ],
    final: { matchId: 'A-FINAL', group: 'A', round: 'FINAL', label: '決賽', playerA: '待定', playerB: '待定', status: 'pending' },
    placements: {
      thirdPlaceMatch: { matchId: 'A-THIRD', group: 'A', round: 'THIRD_PLACE', label: '季軍賽', playerA: '待定', playerB: '待定', status: 'pending' },
    },
  },
  groupB: {
    round16: [
      { matchId: 'B-R16-01', group: 'B', round: 'R16', label: '第 1 場', playerA: '李冠霖', playerB: '周彥廷', winner: '李冠霖', scoreA: 3, scoreB: 1, roundRecord: '2-0 / 1-0', refereeCheck: true, status: 'completed' },
      { matchId: 'B-R16-02', group: 'B', round: 'R16', label: '第 2 場', playerA: '吳柏翰', playerB: '徐振豪', winner: '吳柏翰', scoreA: 3, scoreB: 2, roundRecord: '1-1 / 1-0', refereeCheck: true, status: 'completed' },
      { matchId: 'B-R16-03', group: 'B', round: 'R16', label: '第 3 場', playerA: '林俊逸', playerB: '陳冠宇', scoreA: 1, scoreB: 2, roundRecord: '0-1 / 1-0', refereeCheck: false, status: 'in_progress' },
      { matchId: 'B-R16-04', group: 'B', round: 'R16', label: '第 4 場', playerA: '鄭浩明', playerB: '劉宗翰', status: 'pending' },
      { matchId: 'B-R16-05', group: 'B', round: 'R16', label: '第 5 場', playerA: '張偉傑', playerB: '洪承翰', winner: '張偉傑', scoreA: 3, scoreB: 0, roundRecord: '2-0 / 1-0', refereeCheck: true, status: 'completed' },
      { matchId: 'B-R16-06', group: 'B', round: 'R16', label: '第 6 場', playerA: '蕭文凱', playerB: '曾志豪', status: 'pending' },
      { matchId: 'B-R16-07', group: 'B', round: 'R16', label: '第 7 場', playerA: '許建宏', playerB: '江明哲', status: 'pending' },
      { matchId: 'B-R16-08', group: 'B', round: 'R16', label: '第 8 場', playerA: '邱俊傑', playerB: '沈柏宇', status: 'pending' },
    ],
    quarterFinals: [
      { matchId: 'B-QF-01', group: 'B', round: 'QF', label: 'Q1', playerA: '李冠霖', playerB: '吳柏翰', winner: '李冠霖', scoreA: 3, scoreB: 1, roundRecord: '2-0 / 1-0', refereeCheck: true, status: 'completed' },
      { matchId: 'B-QF-02', group: 'B', round: 'QF', label: 'Q2', playerA: '待定', playerB: '待定', status: 'pending' },
      { matchId: 'B-QF-03', group: 'B', round: 'QF', label: 'Q3', playerA: '張偉傑', playerB: '待定', status: 'pending' },
      { matchId: 'B-QF-04', group: 'B', round: 'QF', label: 'Q4', playerA: '待定', playerB: '待定', status: 'pending' },
    ],
    semiFinals: [
      { matchId: 'B-SF-01', group: 'B', round: 'SF', label: 'S1', playerA: '李冠霖', playerB: '待定', status: 'pending' },
      { matchId: 'B-SF-02', group: 'B', round: 'SF', label: 'S2', playerA: '待定', playerB: '待定', status: 'pending' },
    ],
    final: { matchId: 'B-FINAL', group: 'B', round: 'FINAL', label: '決賽', playerA: '待定', playerB: '待定', status: 'pending' },
    placements: {
      thirdPlaceMatch: { matchId: 'B-THIRD', group: 'B', round: 'THIRD_PLACE', label: '季軍賽', playerA: '待定', playerB: '待定', status: 'pending' },
    },
  },
}
