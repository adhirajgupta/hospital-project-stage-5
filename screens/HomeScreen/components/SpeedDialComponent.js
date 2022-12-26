import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import {Linking} from 'react-native'

const SpeedDialComponent = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    // <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon="chat"
          // color='green'
          actions={[
            {
              icon: 'email',
              label: 'Email',
              onPress: () => Linking.openURL('mailto:hospitalgopinath@gmail.com') ,
            },
            {
              icon: 'phone',
              label: 'Call Us',
              onPress: () => Linking.openURL('tel:+919079737008'),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    // </Provider>
  );
};

export default SpeedDialComponent;