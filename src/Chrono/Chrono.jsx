import React, { useState, useEffect, useReducer } from 'react'

import PlayImg from '../Images/play.svg'
import PauseImg from '../Images/pause.svg'
import ResetImg from '../Images/reset.svg'

import './Chrono.css'

export default function Chrono() {
  const [sessionTime, setSessionTime] = useState(1500)
  const [sessionTimeFixed, setSessionTimeFixed] = useState(1500)

  const [breakTime, setBreakTime] = useState(300)
  const [breakTimeFixed, setBreakTimeFixed] = useState(300)

  const [workingChrono, setWorkingChrono] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(reducer)

  function reducer(state, action) {
    switch (action.type) {
      case 'TICK':
        if (sessionTime >= 0) setSessionTime(sessionTime - 1)
        else if (breakTime >= 1) setBreakTime(breakTime - 1)
        else if (breakTime <= 0 && sessionTime <= 0) {
          setSessionTime(sessionTimeFixed)
          setBreakTime(breakTimeFixed)
        }
        break;
      default:
        break
    }
  }

  const handleSession = e => {
    const el = e.target

    if (el.classList.contains('minus')) {
      if (sessionTime / 60 > 1) {
        setSessionTime(sessionTime - 60)
        setSessionTimeFixed(sessionTimeFixed - 60)
      }
    } else if (el.classList.contains('plus')) {
      setSessionTime(sessionTime + 60)
      setSessionTimeFixed(sessionTimeFixed + 60)
    }
  }

  const handleBreak = e => {
    const el = e.target

    if (el.classList.contains('minus')) {
      if (breakTime / 60 > 1) {
        setBreakTime(breakTime - 60)
        setBreakTimeFixed(breakTimeFixed - 60)
      }
    } else if (el.classList.contains('plus')) {
      setBreakTime(breakTime + 60)
      setBreakTimeFixed(breakTimeFixed + 60)
    }
  }

  const handleReset = e => {
    if (workingChrono) setWorkingChrono(!workingChrono)
    setSessionTime(sessionTimeFixed)
    setBreakTime(breakTimeFixed)
  }

  useEffect(() => {
    let intervalId

    if (workingChrono) {
      intervalId = window.setInterval(() => {
        dispatch({ type: 'TICK' })
      }, 1000)
    }
    return () => window.clearInterval(intervalId)
  }, [workingChrono])

  const playPause = () => {
    setWorkingChrono(!workingChrono)
  }

  return (
    <div className={workingChrono ? "container-chrono anim-glow" : "container-chrono"}>

      <div className="container-config">
        <div className="box-btns session">
          <button onClick={handleSession} className="minus">-</button>
          <span>{sessionTimeFixed / 60}</span>
          <button onClick={handleSession} className="plus">+</button>
        </div>
        <div className="box-btns break">
          <button onClick={handleBreak} className="minus">-</button>
          <span>{breakTimeFixed / 60}</span>
          <button onClick={handleBreak} className="plus">+</button>
        </div>
      </div>

      <h1>
        {
          sessionTime >= 0
            ? <span>
              {
                `${Math.trunc(sessionTime / 60)} : ${sessionTime % 60 < 10 
                  ? `0${sessionTime % 60}` 
                  : sessionTime % 60}`
              }
              </span>
            : <span style={{ background: "#EC9CD3" }}>
              {
                `${Math.trunc(breakTime / 60)} : ${breakTime % 60 < 10
                  ? `0${breakTime % 60}`
                  : breakTime % 60}`
              }
            </span>
        }
      </h1>

      <div className="container-controllers">
        <button onClick={playPause}>
          <img src={workingChrono ? PauseImg : PlayImg} alt="play or pause" />
        </button>
        <button onClick={handleReset}>
          <img src={ResetImg} alt="reset" />
        </button>
      </div>

    </div>
  )
}
