import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import { Player } from '../components/player'
import { useGame } from '../hooks/use-game'

const Home: NextPage = () => {
  const [name, setName] = useState('')
  const [money, setMoney] = useState(5000)

  const game = useGame()
  const { players, addPlayer, deletePlayer, addMoney } = game

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addPlayer({ name, money })
    setName('')
  }

  return (
    <div className='p-4 space-y-4'>
      <form className='flex justify-between space-x-2' onSubmit={handleSubmit}>
        <input placeholder='Nome' className='border rounded px-4 py-2 w-full' type="text" value={name} onChange={e => setName(e.target.value)}/>
        <input placeholder='Dinheiro' className='border rounded px-4 py-2 w-full' type="number" value={money} onChange={e => setMoney(Number(e.target.value))}/>
        <button
            className='px-4 py-2 bg-blue-600 text-white font-bold rounded'>Adicionar</button>
      </form>
      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full'>
        {
          players.map(
            player => <Player
              key={player.id}
              addMoney={() => addMoney(player.id, 1000)}
              onDelete={() => deletePlayer(player.id)}
              name={player.name}
              money={player.money}/>
          )
        }
      </div>
    </div>
  )
}

export default Home
