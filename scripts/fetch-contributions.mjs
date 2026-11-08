// son bir yilin herkese acik katkilarini public/contributions.json'a yazar
// deploy workflow'u her gun calistirir, hata olursa repodaki son dosya kalir
import { writeFile } from 'node:fs/promises'

const LOGIN = 'geniuseyis'
const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 }

const token = process.env.GITHUB_TOKEN
if (!token) {
  console.log('GITHUB_TOKEN yok, mevcut dosya kullaniliyor')
  process.exit(0)
}

const query = `query ($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`

try {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { login: LOGIN } }),
  })
  const { data, errors } = await res.json()
  if (errors || !data?.user) throw new Error(JSON.stringify(errors ?? res.status))

  const days = data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({ date: day.date, count: day.contributionCount, level: LEVELS[day.contributionLevel] ?? 0 }))

  await writeFile(new URL('../public/contributions.json', import.meta.url), JSON.stringify({ days }))
  console.log(`${days.length} gun yazildi`)
} catch (error) {
  console.warn('katki verisi alinamadi, mevcut dosya kullaniliyor:', error.message)
}
