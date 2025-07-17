import { Pressable, Text, TextStyle, ViewStyle } from 'react-native';

type ButtonProps = {
  text: string;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  variant?: 'primary' | 'danger';
  onPress?: () => void;
};

export default function Button({
  text,
  disabled,
  containerStyle,
  variant,
  onPress,
}: ButtonProps) {
  const { container, textStyle } = getStyles(variant, disabled);
  return (
    <Pressable
      style={[container, containerStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
}

function getStyles(
  variant: ButtonProps['variant'],
  disabled?: boolean,
): { container: ViewStyle; textStyle: TextStyle } {
  const baseOpacity = disabled ? 0.5 : 1;

  switch (variant) {
    case 'danger':
      return {
        container: {
          backgroundColor: '#FDE2E2',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
          opacity: baseOpacity,
        },
        textStyle: {
          color: '#B00020',
          fontWeight: '600',
          fontSize: 16,
        },
      };
    case 'primary':
    default:
      return {
        container: {
          backgroundColor: '#D0E8FF',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
          opacity: baseOpacity,
        },
        textStyle: {
          color: '#1E60A1',
          fontWeight: '600',
          fontSize: 16,
        },
      };
  }
}
