import React from 'react';
import { Result, Button } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';

const Error404: React.FC = () => {
  const history = useHistory();
  // const location = useLocation();
  // const params = useParams();

  // console.log('history', history);
  // console.log('location', location);
  // console.log('params', params);
  return (
    <Result
      status="404"
      title="404"
      subTitle="Página não encontrada"
      extra={<Button type="primary" onClick={() => history.goBack()}>Back Home</Button>}
    />
  );
};

export default Error404;
