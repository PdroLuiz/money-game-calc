import { useState } from 'react'
import { v4 as uuid } from 'uuid'

export interface IPlayer {
  id: string
  name: string
  money: number
}
export function useGame() {
  const [players, setPlayers] = useState<IPlayer[]>([])

  const addPlayer = (name: string) => setPlayers([...players, { id: uuid(), name, money: 0 }])
  const deletePlayer = (id: string) => setPlayers(players.filter(p => p.id !== id))
  const addMoney = (id: string, value: number) => {
    setPlayers(
      players.map(player => {
        if (player.id === id) {
          player.money += value
          return player
        }
        return player
      })
    )
  }

  return {
    players,
    addPlayer,
    deletePlayer,
    addMoney
  }
}
