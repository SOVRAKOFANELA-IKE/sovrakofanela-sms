import { FC } from 'react'

const Main: FC = ({ children }) => {
  return (
    <>
      <main>
        <div>{children}</div>
      </main>
    </>
  )
}

export default Main
