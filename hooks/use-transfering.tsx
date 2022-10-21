import { useEffect, useState } from 'react'
import { useGame } from './use-game'

export function useTransfering(game: ReturnType<typeof useGame>) {
  const [receiverId, setReceiverId] = useState<string>()
  const [senderId, setSenderId] = useState<string>()
  const [amount, setAmount] = useState<number>()

  useEffect(() => {
    if (
      receiverId &&
      senderId &&
      amount
    ) {
      game.transfer({
        receiverId,
        senderId,
        amount
      })
      setReceiverId(undefined)
      setSenderId(undefined)
      setAmount(undefined)
    }
  }, [receiverId, senderId, amount])

  return {
    senderId,
    setSenderId,
    receiverId,
    setReceiverId,
    amount,
    setAmount
  }
}
