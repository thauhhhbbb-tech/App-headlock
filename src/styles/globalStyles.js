import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  textWhite: {
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555555',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },
  switchLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
