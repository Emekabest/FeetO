import React from 'react';;
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
/**Screens Imports................................................. */
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import ProductDetailsScreen from './Screens/ProductDetailsScreen/ProductDetailsScreen';
import CartScreen from './Screens/CartScreen/CartScreen';
import CheckoutScreen from './Screens/CheckoutScreen/CheckoutScreen';
import PaymentScreen from './Screens/PaymentScreen/PaymentScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import AccountScreen from './Screens/AccountScreen/AccountScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import AdminScreen from './Screens/AdminScreen/AdminScreen';
import AllOrdersScreen from './Screens/AdminScreen/AllOrdersScreen';
import AddProdutAdminScreen from './Screens/AdminScreen/AddProductScreen';
import SearchItemsScreen from './Screens/SearchItemsScreen/SearchItemsScreen';
/**................................................................ */
import { Provider } from 'react-redux';
import store from './Screens/Redux/Store';



const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {


  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'}/>

    <Provider store={store}>
      <SafeAreaView style = {{height:'100%'}}>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}}/>
            <Stack.Screen name="CheckOut" component={CheckoutScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Payment" component={PaymentScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Account" component={AccountScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Admin" component={AdminScreen} options={{headerShown:false}}/>
            <Stack.Screen name="AllOrders" component={AllOrdersScreen} options={{headerShown:false}}/>
            <Stack.Screen name="AddProductScreen" component={AddProdutAdminScreen} options={{headerShown:false}}/>
            <Stack.Screen name="SearchItems" component={SearchItemsScreen} options={{headerShown:false}}/>

        </Stack.Navigator>
      </SafeAreaView>
    </Provider>
    </NavigationContainer>
  );
}


export default App;