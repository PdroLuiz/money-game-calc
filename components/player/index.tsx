import { useState } from 'react'
import { IPlayer } from '../../hooks/use-game'
import { TrashButton } from '../trash-button'

type PlayerProps = IPlayer & {
  onDelete: Function
  addMoney: Function
  transferFunction: Function
  completeTransferFunction: Function
  transferingId?: string
  amount?: number
}

const formatter = new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' })

const PlayerCard = (props: PlayerProps) => {
  const [amount, setAmount] = useState<number>()

  const handleClick = () => {
    props.onDelete()
  }

  const handleTransferClick = () => {
    props.transferFunction(amount)
  }

  return (
    <section className='border rounded p-4 w-full h-40'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-semibold text-lg'>{props.name}</p>
          <p>{formatter.format(props.money)}</p>
        </div>
        <TrashButton onClick={handleClick}/>
      </div>
      <div className='flex justify-between pt-8 space-x-2'>
        <input className='border rounded px-4 py-2 w-full'
          placeholder='Valor'
          type="number"
          value={amount}
          onChange={e => setAmount(
            Number(e.target.value)
          )}/>
        <button className='px-4 py-2 rounded bg-blue-500 text-white font-bold w-full'
          onClick={handleTransferClick}
          disabled={!amount}
          >Transferir</button>
      </div>
    </section>
  )
}

const PlayerTransfering = (props: PlayerProps) => {
  return (
    <section className='border rounded p-4 w-full h-40'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-semibold text-lg'>{props.name}</p>
          <p>Transferindo {formatter.format(props.amount ?? 0)}...</p>
        </div>
      </div>
      <div className='flex justify-between pt-8 space-x-2'>
        <button className='px-4 py-2 rounded bg-red-500 text-white font-bold w-full'
          >Cancelar</button>
      </div>
    </section>
  )
}

const PlayerRecieving = (props: PlayerProps) => {
  return (
    <section className='border rounded p-4 w-full h-40'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-semibold text-lg'>{props.name}</p>
          <p>{formatter.format(props.money)}</p>
        </div>
      </div>
      <div className='flex justify-between pt-8 space-x-2'>
        <button className='px-4 py-2 rounded bg-blue-500 text-white font-bold w-full'
        onClick={e => props.completeTransferFunction()}
          >Receber</button>
      </div>
    </section>

  )
}

export const Player = (props: PlayerProps) => {
  if (props.transferingId) {
    if (props.transferingId === props.id) {
      return <PlayerTransfering {...props}/>
    }
    return <PlayerRecieving {...props}/>
  }
  return <PlayerCard {...props}/>
}
