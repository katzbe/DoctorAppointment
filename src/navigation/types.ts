import { StaticParamList } from '@react-navigation/native';
import { RootStack } from '.';

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
