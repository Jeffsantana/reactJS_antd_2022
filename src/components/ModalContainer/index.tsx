import React from 'react';
import { useTransition } from 'react-spring';
import { FiX } from 'react-icons/fi';

import { Container, Modal, ModalContent, ModalHeader } from './styles';

interface ModalContainerProps {
  open: boolean;
  onClose(): void;
  title?: string;
  description?: string;
  icon?: any;
  style?: any;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  open,
  title,
  onClose,
  icon: Icon,
  style,
}) => {
  const transitions = useTransition(open, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    trail: 100,
  });

  return (
    <Container>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Modal key={key} style={props}>
              <ModalContent style={style}>
                <ModalHeader>
                  <div>
                    <h3>
                      {Icon && <Icon />} {title}
                    </h3>
                  </div>
                  <button type="button" onClick={() => onClose()}>
                    <FiX size={20} />
                  </button>
                </ModalHeader>
                <section>{children}</section>
              </ModalContent>
            </Modal>
          ),
      )}
    </Container>
  );
};

export default ModalContainer;
