import { useContext } from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Wrapper from './components/ui/Wrapper.jsx';
import { MyContext } from './context/ContextProvider.jsx';
import Routes from './utils/routes.jsx';
import { styles } from './utils/stylesheet.jsx';

export default function App() {
  const { toastConfig, wrapperProps } = useContext(MyContext);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Wrapper {...wrapperProps}>
          <Routes />
        </Wrapper>
        <SafeAreaView style={styles.status_container}>
          <StatusBar
            animated={true}
            backgroundColor="#F26F29"
            barStyle="light-content"
          />
        </SafeAreaView>
        <Toast position="bottom" bottomOffset={20} config={toastConfig} />
      </PaperProvider>
    </SafeAreaProvider>
  );
}