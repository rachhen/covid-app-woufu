import React from 'react';
import {Icon, Autocomplete, StyleType, Layout} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native';
import {refactorCountries} from '../constants/country';

export interface IProps {
  onSearch: (value: string) => void;
  children?: () => React.ReactNode;
}

export interface ICountry {
  title: string;
  code: string;
}

const DATA = refactorCountries();

export const Search = ({onSearch}: IProps) => {
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState<ICountry[]>(DATA);

  const renderIcon = (style: StyleType) => (
    <TouchableOpacity onPress={onSearch.bind(null, value)}>
      <Icon name="search-outline" style={style} />
    </TouchableOpacity>
  );

  const onSelect = ({title}: {title: string}) => {
    setValue(title);
  };

  const onChangeText = (query: string) => {
    setValue(query);
    setData(
      DATA.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  return (
    <Layout>
      <Autocomplete
        value={value}
        data={data}
        placeholder="Search Country"
        icon={renderIcon}
        onChangeText={onChangeText}
        style={{borderRadius: 20, margin: 10}}
        onSelect={onSelect}
      />
    </Layout>
  );
};

export default Search;
