import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigator from "./navigation/Navigator";

const App = () => {

  return (
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  );
};

export default App;
