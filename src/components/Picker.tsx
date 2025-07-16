import { Pressable, StyleSheet, Text } from 'react-native';

type PickerProps = {
  title: string;
  isSelected: boolean;
  onPress: () => void;
};

export default function Picker({ title, isSelected, onPress }: PickerProps) {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.selected]}
      onPress={onPress}
    >
      <Text>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 50,
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderWidth: 1,
    borderColor: 'rgba(91, 157, 255, 1)',
  },
});
