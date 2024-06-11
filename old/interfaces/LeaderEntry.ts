interface LeaderEntry {
  score: number
  user: string
  addedat: {
    seconds: number
    nanoseconds: number
  }
}

export default LeaderEntry
