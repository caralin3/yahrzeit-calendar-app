import React from 'react';
import {
  FlatList,
  Platform,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import {
  NavigationParams,
  NavigationRoute,
  NavigationScreenProps,
  NavigationScreenProp
} from 'react-navigation';
import {
  AlphabetScrollbar,
  HeaderIcon,
  ListItem,
  SearchBar
} from '../components';
import { ApplicationState } from '../store';
import { Person } from '../types';
import { sort } from '../utility';

export interface PeopleScreenProps extends NavigationScreenProps {
  people?: Person[];
}

interface NavigationOptionsProps {
  navigation: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >;
}

export const DisconnectedPeopleScreen: React.FC<PeopleScreenProps> = ({
  people,
  navigation
}) => {
  const sortedPeople = people ? sort(people, 'asc', 'name') : [];
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SearchBar
        onChangeText={(text: string) => console.log(text)}
        onFilter={() => null}
        onSort={() => null}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 10
        }}
      >
        <FlatList
          style={{ marginRight: 10 }}
          data={sortedPeople}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem
              item={item}
            onPress={() =>
              navigation.push('Profile', { id: item.id, name: item.name })
            }
            />
          )}
        ListEmptyComponent={
          <Text style={{ paddingHorizontal: 20 }}>No people to show</Text>
        }
        />
        <AlphabetScrollbar />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  people: state.People.response
});

export const PeopleScreen = connect(mapStateToProps)(DisconnectedPeopleScreen);

(PeopleScreen as any).navigationOptions = ({
  navigation
}: NavigationOptionsProps) => ({
  title: 'People',
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate('AddPerson')}>
      <HeaderIcon name="person-add" />
    </TouchableOpacity>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  }
});
