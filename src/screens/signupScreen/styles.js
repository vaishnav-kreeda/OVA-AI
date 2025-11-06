import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f13',
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  title: {
    color: '#e6f0ff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  label: {
    color: '#a8b3c2',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#131a21',
    borderWidth: 1,
    borderColor: '#1f2a35',
    color: '#e6f0ff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 16,
  },
  primaryButton: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22c1c3',
    marginTop: 8,
    marginBottom: 24,
  },
  primaryButtonText: {
    color: '#0b0f13',
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    color: '#39e4a5',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#8aa4b1',
  },
});

export default styles;


