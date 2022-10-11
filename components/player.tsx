import { IPlayer } from '../hooks/use-game'
import { TrashButton } from './TrashButton'
type PlayerProps = Omit<IPlayer, 'id'> & { onDelete: Function, addMoney: Function }

const formatter = new Intl.NumberFormat()

export const Player = (props: PlayerProps) => {
  const handleClick = () => {
    props.onDelete()
  }

  return (
    <section className='border rounded p-4 w-full h-40'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-semibold text-lg'>{props.name}</p>
          <p className=''>{formatter.format(props.money)}</p>
        </div>
        <TrashButton onClick={handleClick}/>

      </div>
      <div className='flex justify-between pt-8 space-x-2'>
        <button className='px-4 py-2 rounded bg-blue-500 text-white font-bold w-full'>Cobrar</button>
        <button className='px-4 py-2 rounded bg-blue-500 text-white font-bold w-full'>Transferir</button>
      </div>
    </section>
  )
}
