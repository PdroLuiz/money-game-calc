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
      <form className='space-x-2' onSubmit={handleSubmit}>
        <input placeholder='Nome' className='border rounded px-4 py-2' type="text" value={name} onChange={e => setName(e.target.value)}/>
        <input placeholder='Dinheiro' className='border rounded px-4 py-2' type="number" value={money} onChange={e => setMoney(Number(e.target.value))}/>
        <button
            className='px-4 py-2 bg-blue-600 text-white font-bold rounded'>Adicionar</button>
      </form>
      <div className='grid grid-cols-4 gap-4'>
        {
          players.map(p => <Player addMoney={() => addMoney(p.id, 1000)} onDelete={() => deletePlayer(p.id)} key={p.id} name={p.name} money={p.money}/>)
        }
      </div>
    </div>
  )
}

export default Home
