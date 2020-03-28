import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/navigator';
import {Table, Row, Rows} from 'react-native-table-component';
import MapView, {Marker} from 'react-native-maps';
import {capitalize} from '../utils';
import {ScrollView} from 'react-native-gesture-handler';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const tableHead = ['Name', 'Value'];

const Details = (props: Props) => {
  const [tableData, setTableData] = useState<(string | number)[][]>([]);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [coordinate, setCoordinate] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const item = props.route.params.countryCovid;

  useEffect(() => {
    let dataCountry = [];
    for (const [key, value] of Object.entries(item)) {
      if (key === 'countryInfo') continue;
      dataCountry.push([capitalize(key), value]);
    }
    setTableData(dataCountry);
    setInitialRegion({
      latitude: item.countryInfo.lat,
      longitude: item.countryInfo.long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setCoordinate({
      latitude: item.countryInfo.lat,
      longitude: item.countryInfo.long,
    });
  }, []);

  return (
    <ScrollView>
      <Layout style={{flex: 1}}>
        <Image
          source={{uri: item.countryInfo.flag}}
          style={{width: '100%', height: 250}}
        />
        <View style={styles.containerDesc}>
          <Text style={styles.headerText} category="h3">
            {item.country}
          </Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
        </View>
        <MapView
          style={{
            width: '100%',
            height: 250,
          }}
          region={initialRegion}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker coordinate={coordinate} title={item.country} />
        </MapView>
      </Layout>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  containerDesc: {
    padding: 10,
  },
  headerText: {
    marginHorizontal: 24,
    paddingVertical: 10,
    textAlign: 'center',
  },
  headerImage: {
    flex: 1,
    height: 192,
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
