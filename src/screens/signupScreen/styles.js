import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0b12',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  headerBlock: { marginBottom: 32 },
  heading: {
    color: '#E9E6FF',
    fontSize: 30,
    fontWeight: '800',
  },
  subheading: {
    color: '#9aa6b2',
    marginTop: 6,
  },
  label: {
    color: '#a8b3c2',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 12,
  },
  input: {
    backgroundColor: 'rgba(19,26,33,0.8)',
    borderWidth: 1,
    borderColor: '#2a3350',
    color: '#e6f0ff',
    borderRadius: 14,
    paddingHorizontal: 18,
    height: 56,
    marginBottom: 20,
  },
  primaryButton: {
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 32,
    shadowColor: '#5d1df3',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
  },
  primaryButtonText: {
    color: '#ffffff',
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
    marginTop: 16,
    paddingBottom: 12,
  },
  footerText: {
    color: '#8aa4b1',
  },
});

export default styles;


