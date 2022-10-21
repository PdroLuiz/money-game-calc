import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import { Player } from '../components/player'
import { useGame } from '../hooks/use-game'
import { useTransfering } from '../hooks/use-transfering'

const Home: NextPage = () => {
  const [name, setName] = useState('')
  const [money, setMoney] = useState(5000)
  const [amountDeposit, setAmountDeposit] = useState<number>()
  const [playerIdDeposit, setPlayerIdDeposit] = useState<string>('')

  const game = useGame()
  const { players, addPlayer, deletePlayer, addMoney } = game
  const { senderId, setSenderId, setAmount, amount, setReceiverId, zerarValores } = useTransfering(game)

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addPlayer({ name, money })
    setName('')
  }

  const handleDeposit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    game.addMoney(playerIdDeposit, amountDeposit as number)
    setAmountDeposit(1000)
    setPlayerIdDeposit('')
  }

  return (
    <div className='p-4 space-y-4'>
      <form className='flex justify-between space-x-2'
        onSubmit={handleAdd}>
        <input className='border rounded px-4 py-2 w-full'
          placeholder='Nome'
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}/>
        <input className='border rounded px-4 py-2 w-full'
          placeholder='Dinheiro'
          type="number"
          value={money}
          onChange={e => setMoney(Number(e.target.value))}/>
        <button className='px-4 py-2 bg-blue-600 text-white font-bold rounded'
          >Adicionar</button>
      </form>
      <form className='flex justify-between space-x-2'
        onSubmit={handleDeposit}>
        <select className='border rounded px-4 py-2 w-full'
        onChange={e => setPlayerIdDeposit(e.target.value)}>
          <option selected={playerIdDeposit === ''}>Selecione um jogador</option>
          {
            players.map(player => <option key={player.id} value={player.id}>{player.name}</option>)
          }
        </select>
        <input className='border rounded px-4 py-2 w-full'
        type="number"
        value={amountDeposit}
        onChange={e => setAmountDeposit(Number(e.target.value))}
        />
        <button className='px-4 py-2 bg-blue-600 text-white font-bold rounded'
        disabled={Boolean(!amountDeposit && playerIdDeposit)}
        >Depositar</button>
      </form>
      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full'>
        {
          players.map(
            player => <Player
              key={player.id}
              id={player.id}
              addMoney={() => addMoney(player.id, 1000)}
              onDelete={() => deletePlayer(player.id)}
              transferingId={senderId}
              transferFunction={(value: number) => {
                setSenderId(player.id)
                setAmount(value)
              }}
              amount={amount}
              completeTransferFunction={() => setReceiverId(player.id)}
              name={player.name}
              money={player.money}
              cancelTransfer={() => zerarValores()}/>
          )
        }
      </div>
    </div>
  )
}

export default Home
