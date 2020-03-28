import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import {Text, List, Card, Spinner, Layout} from '@ui-kitten/components';
import {StackNavigationProp} from '@react-navigation/stack';
import {CountryCovid} from 'models/country-covid.model';
import Search from '../components/search';
import {RootStackParamList} from '../navigation/navigator';

export interface IRenderItem {
  item: CountryCovid;
  index?: number;
}

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const {width} = Dimensions.get('screen');
const COLUMNS = 3;

export const CustomHeader = (item: CountryCovid) => (
  <React.Fragment>
    <Image
      style={styles.headerImage}
      source={{
        uri: item.countryInfo.flag,
      }}
    />
    <Text style={styles.headerText} category="h6">
      {item.country}
    </Text>
  </React.Fragment>
);

export const Home = (props: Props) => {
  const [dataCovid, setDataCovid] = useState<CountryCovid[]>([]);
  const [countryCovid, setCountryCovid] = useState<CountryCovid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://corona.lmao.ninja/countries');
      const data = await res.json();
      setDataCovid(data);
      setCountryCovid(data);
      setLoading(false);
    })();
  }, []);

  const onSearch = async (value: string) => {
    setLoading(true);
    const dataSearch = dataCovid.filter(item => item.country.includes(value));
    setCountryCovid(dataSearch);
    setLoading(false);
  };

  const renderItem = ({item}: IRenderItem) => (
    <Card
      style={{width: width / COLUMNS - 5, marginTop: 5}}
      onPress={() => props.navigation.navigate('Details', {countryCovid: item})}
      header={CustomHeader.bind(null, item)}>
      <Text category="c2" style={{textAlign: 'center'}}>
        Total Cases:
      </Text>
      <Text category="label" style={{textAlign: 'center'}}>
        {item.cases.toString()}
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Search onSearch={onSearch} />
      {loading ? (
        <Layout style={styles.spinner}>
          <Text category="h4">Updating Database</Text>
          <Spinner />
        </Layout>
      ) : countryCovid.length > 0 ? (
        <List
          data={countryCovid}
          renderItem={renderItem}
          numColumns={COLUMNS}
          keyExtractor={item => item.country}
          columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
        />
      ) : (
        <Layout style={styles.spinner}>
          <Text category="h4">Not Found!</Text>
          <Text category="h2">😇😇😇😇</Text>
        </Layout>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    marginHorizontal: 5,
    marginVertical: 5,
    textAlign: 'center',
  },
  headerImage: {
    height: 60,
  },
});
