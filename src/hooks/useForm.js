import { useState } from 'react';

const useForm = () => {
  let initialFromState = {
    code: 'c10870',
    city: 'Кингисепп'
  };
  let initialToState = {
    code: 'c2',
    city: 'Санкт-Петербург'
  };

  const [from, setFrom] = useState(initialFromState);
  const [to, setTo] = useState(initialToState);

  const handleCitySelect = (state, city, code) => {
    state === 'from' ? setFrom({ code, city }) : setTo({ code, city });
  };

  const swapValues = () => {
    setFrom(to);
    setTo(from);
  };

  return [from, to, swapValues, handleCitySelect];
};

export default useForm;
