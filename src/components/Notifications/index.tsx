import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MdNotifications } from 'react-icons/md';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const refNotification = useRef<HTMLDivElement>(null);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  const handleClickOutSide = useCallback(e => {
    if (refNotification.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [handleClickOutSide]);

  return (
    <Container>
      <Badge hasUnread onClick={handleToggleVisible}>
        <MdNotifications size={24} />
      </Badge>
      <NotificationList ref={refNotification} visible={visible}>
        <Scroll>
          <Notification unread>
            <span>Não há notificações</span>
            {/* <time>há 1 hora</time> */}
            {/* <button type="button">Marcar como lida</button> */}
          </Notification>
        </Scroll>
      </NotificationList>
    </Container>
  );
}
