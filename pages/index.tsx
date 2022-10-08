import type { NextPage } from 'next'
import { useState } from 'react'
import { Player } from '../components/player'
import { useGame } from '../hooks/use-game'

const Home: NextPage = () => {
  const [name, setName] = useState('')

  const { players, addPlayer, deletePlayer, addMoney } = useGame()

  const handleAdicionar = () => {
    addPlayer(name)
    setName('')
  }

  return (
    <div className='p-4 space-y-4'>
      <input type="text" value={name} onChange={e => setName(e.target.value)}/>
      <button
        className='px-4 py-2 bg-blue-600 text-white font-bold rounded'
        onClick={handleAdicionar}>Adicionar</button>

      <div className='grid grid-cols-4 gap-4'>
        {
          players.map(p => <Player addMoney={() => addMoney(p.id, 1000)} onDelete={() => deletePlayer(p.id)} key={p.id} name={p.name} money={p.money}/>)
        }
      </div>
    </div>
  )
}

export default Home
