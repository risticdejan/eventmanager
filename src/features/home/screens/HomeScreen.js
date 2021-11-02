import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, Modal, Portal, Searchbar} from 'react-native-paper';

export default function HomeScreen({navigation, route}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [openSearchBar, setOpenSearchBar] = React.useState(false);
  const [openFilterModal, setOpenFilterModal] = React.useState(false);

  React.useLayoutEffect(() => {
    setOpenFilterModal(route.params?.filter);
  }, [route.params?.filter]);

  React.useLayoutEffect(() => {
    setOpenSearchBar(route.params?.search);
  }, [route.params?.search]);

  const onChangeSearch = query => setSearchQuery(query);
  const hideModal = () => {
    setOpenFilterModal(false);
    navigation.setParams({
      filter: false,
    });
  };
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={openFilterModal}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      {openSearchBar && (
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      )}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.navigate('Home2')}>
          Press me
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
