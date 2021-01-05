import { FC, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Header from '../components/header/header'
import createGenerator from '../util/prob-gen/generator'
import Problem from '../util/prob-gen/problem'

const Play: FC = () => {
  const input = useRef(null)
  const generate = createGenerator({
    constraints: {
      addLeft: { min: 2, max: 100 },
      addRight: { min: 2, max: 100 },
      mulLeft: { min: 2, max: 12 },
      mulRight: { min: 2, max: 100 },
    },
    ops: ['add', 'sub', 'mul', 'div'],
  })
  const [prob, setProb] = useState<Problem>(generate())
  const [val, setVal] = useState<string>()
  const checkAns = e => {
    if (parseInt(e.target.value) === prob.answer) {
      setProb(generate())
      setVal('')
    } else {
      setVal(e.target.value)
    }
  }
  useEffect(() => {
    if (input) {
      input.current.focus()
    }
  }, [input])
  return (
    <div>
      <Head>
        <title>Zetaboard: Play</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-4xl mx-auto mt-8 px-8 py-4'>
        <Header subheading='Play a game' />
        <div className='py-4 text-3xl text-center bg-gray-300 bg-opacity-20 grid grid-cols-2'>
          <div className='grid-span-1 text-right pr-4 flex items-center justify-end'>
            {prob.text()} =
          </div>
          <input
            type='text'
            className='grid-span-1 p-1 text-black ml-4 w-32'
            onChange={checkAns}
            value={val}
            ref={input}
          />
        </div>
        <button onClick={() => setProb(generate())}>generate problem</button>
      </main>
    </div>
  )
}

export default Play
