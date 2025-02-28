import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import App from './src/App';
import { MyContextProvider } from './src/context/ContextProvider';

export default function Root() {
    return (
        <MyContextProvider>
            <NavigationContainer independent={true}>
                <App />
            </NavigationContainer>
        </MyContextProvider>
    );
}

registerRootComponent(Root);