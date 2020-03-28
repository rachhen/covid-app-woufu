import React from 'react';

import TotalInfo from '../components/total-info';
import {Layout} from '@ui-kitten/components';

export const Total: React.FC = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center'}}>
      <TotalInfo />
    </Layout>
  );
};

export default Total;
