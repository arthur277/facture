import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
  useRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Factures } from './screens/Factures';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import { NotFound } from './screens/NotFound';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Nouvellefacture from './screens/NouvelleFacture';
import { DefaultHeader, FactureCreationHeader } from './components/Headers';
import AppercuFacture from './screens/AppercuFacture';
import AppercuModelFacture from './screens/AppercuModelFacture';
import { Home } from '../acceuil/Home';
import { Bienvenu } from '../bienvenu/Bienvenu';
import { UploadLogo } from '../uploadLogo/UploadLogo';
import { Login } from '../login/Login';
import { CreateAccount } from '../createAccount/CreateAccount';
import { CreateHome } from '../createAccount/CreateHome';
import ClientsScreen from './screens/clients/ClientsScreen';
import ClientDetailScreen from './screens/clients/ClientDetailScreen';
import { useEffect, useState } from 'react';
import { InvoiceWithArticles } from '../interfaces';


const FactureTopTabs = createMaterialTopTabNavigator();
const FactureTabs = () => {
  return (
    <FactureTopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#000000' }, // Indicator Color
        tabBarStyle: { backgroundColor: '#00E5E5' }, // Background color
      }}
    >

      <FactureTopTabs.Screen name="TOUTES" component={Factures} />
      <FactureTopTabs.Screen name="PAYEES" component={Factures} initialParams={{ isPaidParam: true }} />
      <FactureTopTabs.Screen name="NON PAYEES" component={Factures} initialParams={{ isPaidParam: false }} />
    </FactureTopTabs.Navigator>
  );
};

const NouvelleFactureTopTabs = createMaterialTopTabNavigator();
const NouvelleFactureTabs = ({ route }: { route: any }) => {
  // Get the passed params

  const { clientId, factureId } = route.params || {};
  const [refreshKey, setRefreshKey] = useState(Date.now());
  useEffect(() => {
    setRefreshKey(Date.now());
  }, [factureId, clientId]);
  const [refreshCount, setRefreshCount] = useState(0);
  return (
    <FactureTopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#000000' }, // Indicator Color
        tabBarStyle: { backgroundColor: '#00E5E5' }, // Background color
        swipeEnabled: false,
      }}
    >

      <FactureTopTabs.Screen name="EDITION"
        component={Nouvellefacture}
        initialParams={{ clientId: clientId, factureId: factureId }} />

      <FactureTopTabs.Screen name={"APERÇU"}
        component={AppercuModelFacture}
        initialParams={{ factureId: factureId, refreshKey: refreshCount }}
        listeners={{
          tabPress: () => setRefreshCount(prev => prev + 1)
        }}
      />
    </FactureTopTabs.Navigator>
  );
};

const HomeTabs = createBottomTabNavigator({
  screenOptions: ({ route }) => ({
    tabBarStyle: {
      backgroundColor: '#00E5E5',

      height: route.name == 'Nouveau' ? 0 : 60,
    },
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'grey',
  }),
  screens: {
    Factures: {
      screen: FactureTabs,
      options: {
        header: ({ navigation, route }) => (
          <SafeAreaView>
            <DefaultHeader
              title={route.name}
              onSettingsPress={() => console.log('Settings Pressed')}
              onSearchPress={() => console.log('Search Pressed')}
            />
          </SafeAreaView>
        ),
        title: 'Factures',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="file-invoice" size={size} color={color} />
        ),
      },
    },
    Nouveau: {
      screen: NouvelleFactureTabs,
      options: {

        header: ({ navigation, route }) => (
          <SafeAreaView>
            <FactureCreationHeader title="Facture"
              onBackPress={() => navigation.goBack()}
              onDotsPress={() => console.log('Search Pressed')} />
          </SafeAreaView>
        ),
        title: 'Nouveau',
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="pluscircle" size={size} color={color} />
        ),
      },
    },
    Devis: {
      screen: Updates,
      options: {
        title: 'Devis',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="calculator" size={size} color={color} />
        ),
      },
    },
  },
});

const Stack = createNativeStackNavigator();
const ClientsStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={
      {

        headerShown: false,
        headerStyle: {
          backgroundColor: '#00E5E5',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }>
      <Stack.Screen

        name="Clients" component={ClientsScreen} />
      <Stack.Screen name="ClientDetail" component={ClientDetailScreen} />
    </Stack.Navigator>
  );
}
const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: Login,
      options: {
        headerShown: false,
        title: 'Login',
      },
    },
    CreateAccount: {
      screen: CreateAccount,
      options: {
        headerShown: false,
        title: 'CreateAccount',
      },
    },
    CreateHome: {
      screen: CreateHome,
      options: {
        headerShown: false,
        title: 'CreateHome',
      },
    },
    Home: {
      screen: Home,
      options: {
        headerShown: false,
        title: 'Home',
      },
    },
    UploadLogo: {
      screen: UploadLogo,
      options: {
        headerShown: false,
        title: 'UploadLogo',
      },
    },
    Bienvenu: {
      screen: Bienvenu,
      options: {
        headerShown: false,
        title: 'Bienvenu',
      },
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
        title: 'Home',

      },
    },


    ClientsStack: {
      screen: ClientsStackScreen,
      options: {
        headerShown: false,
        title: 'Clients',
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}