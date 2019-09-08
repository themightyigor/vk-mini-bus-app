import React from 'react';
import {
  SelectMimicry,
  Button,
  FormLayoutGroup,
  FormLayout
} from '@vkontakte/vkui';
import Icon24Repeat from '@vkontakte/icons/dist/24/repeat';
const SearchForm = ({ from, to, router, onSubmit, swapValues }) => (
  <FormLayout onSubmit={onSubmit}>
    <FormLayoutGroup>
      <SelectMimicry
        name='from'
        top='Куда'
        onClick={() =>
          router.navigate('select', {
            state: 'from'
          })
        }
      >
        {from.city}
      </SelectMimicry>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Icon24Repeat fill='var(--accent)' onClick={swapValues} />
      </div>
      <SelectMimicry
        name='to'
        top='Откуда'
        onClick={() =>
          router.navigate('select', {
            state: 'to'
          })
        }
      >
        {to.city}
      </SelectMimicry>
    </FormLayoutGroup>
    <Button size='xl' level='primary'>
      Найти
    </Button>
  </FormLayout>
);

export default SearchForm;
