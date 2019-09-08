import React from 'react';
import { Div, Button } from '@vkontakte/vkui';
import Icon24Link from '@vkontakte/icons/dist/24/link';

const Footer = () => {
  return (
    <Div
      className='footer'
      style={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <Button
        level='3'
        component='a'
        target='_blank'
        href='http://rasp.yandex.ru/'
        before={<Icon24Link />}
      >
        Данные предоставлены сервисом Яндекс.Расписания
      </Button>
    </Div>
  );
};

export default Footer;
