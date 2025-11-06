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
  passwordRow: {
    position: 'relative',
    marginBottom: 8,
  },
  passwordInput: {
    paddingRight: 44,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 14,
    fontSize: 20,
    color: '#8aa4b1',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rememberText: {
    color: '#a8b3c2',
  },
  link: {
    color: '#39e4a5',
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
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#1f2a35',
  },
  orText: {
    color: '#637487',
    marginHorizontal: 12,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#131a21',
    borderWidth: 1,
    borderColor: '#223140',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    color: '#c8d5e3',
    fontWeight: '600',
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


