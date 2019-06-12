import { getMemberDebt, getMemberDebtList, getSimplifiedGraph } from '.'

/* payer가 members(본인 포함 가능)를 위해 amount를 지불한 뒤 N빵을 청구하는 경우 */
const nBbang = (payer, members, amount) => ({
  fromWho: payer,
  total: amount,
  credits: members.map(
    m => ({ toWho: m, amount: amount / members.length })
  )
})

describe('getMemberDebt', () => {
  it('returns 0 when empty payments were given', () => {
    expect(getMemberDebt([], 1)).toBe(0)
  })

  it('returns correct answer', () => {
    const profit = nBbang(3, [1, 2, 3], 3030)
    const loss = nBbang(1, [1, 2, 3, 4], 2020)

    expect(getMemberDebt([profit,], 1)).toBe(1010)
    expect(getMemberDebt([loss,], 1)).toBe(-1515)
    expect(getMemberDebt([loss, profit,], 1)).toBe(1010-1515)
    expect(getMemberDebt([loss, loss, profit,], 1)).toBe(1010-2*1515)
  })
})

describe('getMemberDebtList', () => {
  it('returns empty Object when empty payments were given'), () => {
    expect(getMemberDebtList([])).toEqual({})
  }

  it('returns correctly', () => {
    const paymentA = nBbang(3, [1, 2, 3], 3000)
    const paymentB = nBbang(4, [2, 3, 4], 3600)

    expect(getMemberDebtList([paymentA,])).toEqual({
      1: 1000, 2: 1000, 3: -2000,
    })
    expect(getMemberDebtList([paymentB,])).toEqual({
      2: 1200, 3: 1200, 4: -2400,
    })
    expect(getMemberDebtList([paymentA, paymentB])).toEqual({
      1: 1000, 2: 2200, 3: -800, 4: -2400,
    })
  })

  it('returns valid object whose sum is 0', () => {
    const memberCount = 5
    const paymentCount = 10

    const randInt = (min, max) => (
      Math.floor(Math.random() * (max - min)) + min
    )
    const randMember = () => randInt(1, memberCount)

    // 랜덤 거래를 자유롭게 추가
    const debtList = getMemberDebtList(
      [...Array(paymentCount).keys()].map(
        () => randInt(1, 5)
      ).map(
        len => nBbang(
          randMember(),
          [...Array(len).keys()].map(() => randMember()),
          randInt(100, 200) * len
        )
      )
    )
    
    expect(Object.values(debtList).reduce(
      (a, b) => a + b, 0
    )).toBe(0)
  })
})

describe('getSimplifiedGraph', () => {
  it('returns empty graph', () => {
    expect(getSimplifiedGraph({})).toEqual({
      nodes: [], edges: [],
    })
  })

  it('returns correctly', () => {
    expect(getSimplifiedGraph(
      { a: 100, b: 100, c: -200 }
    )).toEqual({
      nodes: [
        { id: 'a', label: 'a' },
        { id: 'b', label: 'b' },
        { id: 'c', label: 'c' },
      ],
      edges: [
        { from: 'a', to: 'c', label: 100 },
        { from: 'b', to: 'c', label: 100 },
      ]
    })

    expect(getSimplifiedGraph(
      { a: -101, b: 202, c: 201, d: -202, e: -100 }
    )).toEqual({
      nodes: [
        { id: 'b', label: 'b' },
        { id: 'c', label: 'c' },
        { id: 'e', label: 'e' },
        { id: 'a', label: 'a' },
        { id: 'd', label: 'd' },
      ],
      edges: [
        { from: 'b', to: 'd', label: 202 },
        { from: 'c', to: 'a', label: 101 },
        { from: 'c', to: 'e', label: 100 },
      ]
    })
  })
})

