import { IPlayer } from '../hooks/use-game'

type PlayerProps = Omit<IPlayer, 'id'> & { onDelete: Function, addMoney: Function }

export const Player = (props: PlayerProps) => {
  const handleClick = () => {
    props.onDelete()
  }

  const handleAddMoney = () => {
    props.addMoney()
  }

  return (
    <div className='border rounded p-4'>
      <button onClick={handleClick}>Deletar</button>
      <button onClick={handleAddMoney}>Add money</button>
      <p className='font-semibold'>{props.name}</p>
      <p className=''>{props.money}</p>
    </div>
  )
}
