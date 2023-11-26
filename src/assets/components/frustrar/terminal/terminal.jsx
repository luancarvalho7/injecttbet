import React, { useState, useEffect } from 'react';
import './terminal.css';
import { Timer } from '../timer/timer';
import { GetSignals } from '../../signals/signals';

export function Terminal({ house, supplier, game }) {


  const [animRun, setAnimRun] = useState(false)

  function formatString(inputString) {
    return inputString.replace(/\s+/g, '_').toLowerCase();
  }

  const [hideClasses, setHideClasses] = useState(false);
  const hideClassesCallback = (shouldHide) => {
    setHideClasses(shouldHide);
  };

  const fHouse = formatString(house);
  const fSupplier = formatString(supplier);
  const fGame = formatString(game);

  const [currentTask, setCurrentTask] = useState(0);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [successVisible, setSuccessVisible] = useState(false);
  const [signalVisible, setSignalVisible] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0);

  const randomTime = () => Math.floor(Math.random() * (5000 - 900 + 1) + 900);
  const randomTimeUpdate = () => Math.floor(Math.random() * (1200 - 900 + 1) + 900);
  const tasks = Array.from({ length: 9 }, () => randomTime());

  const randomSuccessTime = () => Math.floor(Math.random() * (10 - 3 + 1) + 3) * 60 * 1000;

  useEffect(() => {


    /*     ANIMATION APPEAR*/
    setTimeout(setAnimRun(true), 200)


    function processTask(index) {
      if (index >= tasks.length - 1) {
        setSuccessVisible(true);
        setRemainingTime(randomSuccessTime());
        return;
      }

      setCurrentTask(index + 1);

      if (index === 3) {
        let interval = setInterval(() => {
          setLoadingPercentage((prev) => {
            const increment = Math.floor(Math.random() * 10);
            const nextValue = prev + increment;

            if (nextValue >= 100) {
              clearInterval(interval);
              setLoadingPercentage(100);
              processTask(index + 1);
              return 100;
            }
            return nextValue;
          });
        }, randomTimeUpdate());
      } else {
        setTimeout(() => {
          processTask(index + 1);
        }, tasks[index]);
      }
    }

    processTask(0);
  }, []);


  const [signalMsg, setSignalMsg] = useState('oi');
  const [round, setRound] = useState(Math.floor(Math.random() * 100) + 1);
  const [cGame, setCGame] = useState('pato')


  useEffect(() => {
    setCGame(game)
    setSignalMsg(GetSignals({ game: game, round }));
    console.log(signalMsg==undefined)
  }, [game, round]);

  return (
    <div id="terminalSection" className={animRun ? `t-afteranim` : `t-beforeanim`}>
      <div className="t-labels-holder">
        <p className='tLabel secondText'> {`${house} > ${supplier} > ${game}`} </p>
        <p className='tLabel secondText'> Terminal </p>
      </div>
      {successVisible==false &&
        <div id="terminal">
          {currentTask >= 1 && <p><span className='t-grey'>Iniciando o processo de</span> Frustração <span className='t-grey'> via </span> <span className='t-orange'> Inject</span></p>}
          {currentTask >= 2 && <p>Conectando à<span className='t-yellow'> API </span></p>}
          {currentTask >= 3 && <p>Conectando à <span className='t-green'>{fHouse}.</span><span className='t-pink'>{fGame}</span></p>}
          {currentTask >= 4 && <p>
            Baixando configuração{' '}
            <span className="t-grey">
          // [{'.'.repeat(loadingPercentage / 10)}] {loadingPercentage}%
            </span>
          </p>}
          {currentTask >= 5 && <p>Criando <span className='t-red'>requisição</span><span className='t-orange'> Inject </span></p>}
          {currentTask >= 6 && <p>Enviando <span className='t-red'>requisição</span> à <span className='t-yellow'>api</span><span className='t-green'>.{fSupplier}.co/</span><span className='t-pink'>{fGame}</span></p>}
          {currentTask >= 7 && <p>Alternado <span className='t-white'>status</span> da conta</p>}
          {currentTask >= 8 && <p><span className='t-grey'>//// <br /> Sucesso!</span></p>}
        </div>}

      {successVisible && (
        <div className={`success-overlay ${successVisible ? 'show-success' : ''}`}>
          <div className="sc-stroke">
            <div className="success-content">

              {signalVisible == false &&
                <div className="headerContent">
                  <h1> Conta  frustrada com <span>SUCESSO</span>!</h1>
                  <p className={`Time-Left ${hideClasses ? 'hidden' : ''}`}>Suas chances de ganho na {fHouse} foram aumentadas em até 8x </p>
                </div>}

              {signalVisible &&
                <>
                  <div className="timerHolder">
                    <h2>Um novo sinal será gerado em:</h2>
                    <Timer hideClassesCallback={hideClassesCallback} round={round} setRound={setRound} game={cGame} />
                  </div>


                  <div className=" fixedSC">
                    <div className="signalContent">
                      <span dangerouslySetInnerHTML={{ __html: signalMsg }}></span>
                    </div>
                  </div>

                </>}







              {signalVisible == false && <a href={signalMsg != undefined ? '#' : '#iframe'}><button className={`sucess-button`} onClick={() => {signalMsg != undefined ? setSignalVisible(true) : '' }}>{signalMsg != undefined ? 'BUSCAR ENTRADAS' : 'JOGAR AGORA'}</button></a>}

              {signalVisible && <a href='#iframe'><button className={`sucess-button`}>Jogar Agora</button></a>}
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}
