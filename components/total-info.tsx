import React, {useState, useEffect} from 'react';
import {Layout, Text, Spinner, Divider} from '@ui-kitten/components';
import {View, StyleSheet} from 'react-native';
import {TotalCovid} from 'models/total-covid.model';
import {addCommas} from '../utils';

export const TotalInfo: React.FC = () => {
  const [total, setTotal] = useState<TotalCovid>();

  useEffect(() => {
    (async () => {
      const res = await fetch('https://corona.lmao.ninja/all');
      const data = await res.json();
      setTotal(data);
    })();
  });

  if (!total) {
    return (
      <Layout style={{justifyContent: 'center', alignItems: 'center'}}>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.divider}>
        <Text category="h3" status="info" style={styles.textCenter}>
          Today
        </Text>
      </View>
      <View style={styles.divider}>
        <Text category="h5" status="warning" style={styles.textCenter}>
          Coronavirus Cases:
        </Text>
        <Text category="h6" style={styles.textCenter}>
          {addCommas(total.cases)}
        </Text>
      </View>
      <Divider />
      <View style={styles.divider}>
        <Text category="h5" status="danger" style={styles.textCenter}>
          Deaths:
        </Text>
        <Text category="h6" style={styles.textCenter}>
          {addCommas(total.deaths)}
        </Text>
      </View>
      <Divider />
      <View style={styles.divider}>
        <Text category="h5" status="success" style={styles.textCenter}>
          Recovered:
        </Text>
        <Text category="h6" style={styles.textCenter}>
          {addCommas(total.recovered)}
        </Text>
      </View>
    </Layout>
  );
};

export default React.memo(TotalInfo);

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
  divider: {
    marginVertical: 10,
  },
});
