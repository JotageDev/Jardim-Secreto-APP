
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa a navegação por abas
import TabNavigation from "./tabNavigation";

// Cria o objeto Stack
const Stack = createNativeStackNavigator();

// Navegação principal do aplicativo
export default function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabNavigation}
      />
    </Stack.Navigator>
  );
}
