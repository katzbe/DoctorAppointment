import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

type SummaryCardProps = {
  medicalSpecialty: string;
  dateSlot: string;
  patientName: string;
};

export default function SummaryCard({
  medicalSpecialty,
  dateSlot,
  patientName,
}: SummaryCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.textBold}>מקצוע רפואי: </Text>
        {medicalSpecialty}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.textBold}>תאריך ושעה: </Text>
        {dateSlot}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.textBold}>שם המטופל: </Text>
        {patientName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    padding: 25,
    borderWidth: 1,
    borderColor: '#F3F3F3',
    borderRadius: 16,
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
    gap: 5,
  },
  text: { fontSize: 16, textAlign: 'right' },
  textBold: {
    fontWeight: '700',
  },
});
