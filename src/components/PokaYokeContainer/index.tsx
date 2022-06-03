import React from 'react';
import { useTransition } from 'react-spring';
import { usePokaYoke, PokaYokeData } from '../../hooks/pokayoke';
import Button from '../Button';

import warning from '../../assets/warning.gif';

import { Content, Container, PokaYoke } from './styles';

interface PokayokeProps {
  open: boolean;
  data: PokaYokeData;
}

const PokaYokeContainer: React.FC<PokayokeProps> = ({ open, data }) => {
  const transitions = useTransition(open, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    trail: 100,
  });

  const { closePokaYoke } = usePokaYoke();
  return (
    <Content>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Container key={key} style={props}>
              <PokaYoke>
                <img src={warning} alt="..." />
                <h1>{data.title}</h1>
                <footer>
                  <Button onClick={() => data?.callback()}>
                    {data.confirmButtonText || 'Continuar'}
                  </Button>
                  <Button color="primary" onClick={() => closePokaYoke()}>
                    {data.cancelButtonText || 'Cancelar'}
                  </Button>
                </footer>
              </PokaYoke>
            </Container>
          ),
      )}
    </Content>
  );
};

export default PokaYokeContainer;
