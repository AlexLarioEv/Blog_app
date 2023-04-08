import React from 'react'

import './Heart.scss'

interface IHeartProps {
  favorited: boolean
}

const Heart: React.FC<IHeartProps> = (props) => {
  const { favorited } = props

  return (
    <div className="heart">
      {favorited ? <img src="/assets/icons/HeartRed.svg" alt="HeartRed" /> : <img src="/assets/icons/Heart.svg" alt="HeartRed" />}
    </div>
  )
}

export default Heart
