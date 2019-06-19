
export const getMemberDebt = (payments, memberId) => {
  return (getMemberDebtList(payments)[memberId] || 0)  // undefined 대응
}

export const getMemberDebtList = payments => {
  /* 시간복잡도 O(P + C)
      where P is Payment 총 개수 &
            C is Payment 하위에 속한 Credit 총 개수
   */
  const result = {}
  const accumulate = (key, value) => {
    result[key] = (result[key] || 0) + value
  }

  payments.forEach(payment => {
    accumulate(payment.fromWho, -payment.total)  // 내가 낸 돈은 빚에서 탕감
    payment.credits.forEach(credit => {
      accumulate(credit.toWho, credit.amount)  // 다른 사람이 내준 돈은 내준 만큼 빚 추가
    })
  })

  return result
}

export const getSimplifiedGraph = debts => {
  const members = Object.keys(debts).sort(
    (a, b) => -(debts[a] - debts[b])  // descending by value
  )
  const edges = []

  const indice = members.slice()  // 배열 복사
  while (indice.length) {
    const first = indice[0], last = indice[indice.length - 1]
    if(debts[first] === 0) break;
    const amount = Math.min(
      debts[first], -debts[last]
    )

    edges.push({ from: first, to: last, label: String(amount) })

    debts[first] -= amount
    if (debts[first] === 0)
      indice.splice(0, 1)

    debts[last] += amount
    if (debts[last] === 0)
      indice.pop()
  }

  return {
    nodes: members.map(id => ({ id, label: id, })),
    edges,
  }
}
