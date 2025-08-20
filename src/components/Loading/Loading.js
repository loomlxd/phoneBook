import { useEffect, useRef } from 'react';
import s from './Loading.module.css';

function Loading() {
  const firstDote = useRef();
  const secondDote = useRef();
  const thirdDote = useRef();
  const timeOutIdForFirst = useRef(null);
  const timeOutIdForSecond = useRef(null);
  const timeOutIdForThird = useRef(null);

  useEffect(() => {
    timeOutIdForFirst.current = setTimeout(() => {
      firstDote.current.className = `${firstDote.current.className} ${s.animation}`;
    });

    timeOutIdForSecond.current = setTimeout(() => {
      secondDote.current.className = `${secondDote.current.className} ${s.animation}`;
    }, 200);

    timeOutIdForThird.current = setTimeout(() => {
      thirdDote.current.className = `${thirdDote.current.className} ${s.animation}`;
    }, 400);

    return () => {
      clearTimeout(timeOutIdForFirst.current);
      clearTimeout(timeOutIdForSecond.current);
      clearTimeout(timeOutIdForThird.current);
    };
  }, []);

  return (
    <div className={s.container}>
      <span className={s.first_dote} ref={firstDote}></span>
      <span className={s.second_dote} ref={secondDote}></span>
      <span className={s.third_dote} ref={thirdDote}></span>
    </div>
  );
}

export default Loading;
