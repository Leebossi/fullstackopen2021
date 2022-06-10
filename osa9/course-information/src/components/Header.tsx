import React from 'react'

interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <h1>{props.name}</h1>
  )
}

export default Header