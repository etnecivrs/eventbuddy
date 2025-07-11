import { StyleSheet } from 'react-native';

const common = {
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  favoriteButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  favoriteActive: {
    backgroundColor: '#028a29',
  },

  favoriteButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  detailsButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  detailsButtonText: {
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  logo: {
    width: 300,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignSelf: 'center',
  },

  logoutContainer: {
    width: '80%',
    alignSelf: 'center',
  },
};

// 🎨 Tema Claro
const light = StyleSheet.create({
  ...common,

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff', // fundo claro
  },

  containerList: {
    padding: 16,
    backgroundColor: '#fff',
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'black',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },

  date: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },

  description: {
    fontSize: 16,
    marginTop: 12,
    color: '#333',
  },

  participants: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },

  button: {
    ...common.button,
    backgroundColor: '#03f463',
  },

  buttonText: {
    ...common.buttonText,
    color: '#fff',
  },

  favoriteButton: {
    ...common.favoriteButton,
    backgroundColor: '#03f463',
  },

  favoriteButtonText: {
    ...common.favoriteButtonText,
    color: '#fff',
  },

  detailsButton: {
    ...common.detailsButton,
    backgroundColor: '#03f463',
  },

  detailsButtonText: {
    ...common.detailsButtonText,
    color: '#fff',
  },

  input: {
    ...common.input,
    borderColor: '#ccc',
    color: '#333',
  },

  label: {
    ...common.label,
    color: '#444',
  },

  info: {
    fontSize: 16,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  iconButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
});

// 🌙 Tema Escuro
const dark = StyleSheet.create({
  ...common,

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },

  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },

  containerList: {
    padding: 16,
    backgroundColor: '#121212',
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#f5f5f5',
    backgroundColor: '#121212',
  },

  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#f5f5f5',
  },

  date: {
    marginTop: 4,
    fontSize: 14,
    color: '#f5f5f5',
  },

  description: {
    fontSize: 16,
    marginTop: 12,
    color: '#ddd',
  },

  participants: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '600',
    color: '#ccc',
  },

  button: {
    ...common.button,
    backgroundColor: '#03f463',
  },

  buttonText: {
    ...common.buttonText,
    color: '#000',
  },

  favoriteButton: {
    ...common.favoriteButton,
    backgroundColor: '#03f463',
  },

  favoriteButtonText: {
    ...common.favoriteButtonText,
    color: '#000',
  },

  detailsButton: {
    ...common.detailsButton,
    backgroundColor: '#03f463',
  },

  detailsButtonText: {
    ...common.detailsButtonText,
    color: '#000',
  },

  input: {
    ...common.input,
    borderColor: '#555',
    backgroundColor: '#1e1e1e',
    color: '#eee',
  },

  label: {
    ...common.label,
    color: '#ccc',
  },

  info: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 30,
    textAlign: 'center',
  },
  iconButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
});

export const themes = { light, dark };
export const themeColors = {
  light: {
    tabActive: '#03f463',
    tabInactive: 'gray',
    tabBackground: '#fff',
    headerBackground: '#fff',
    headerText: '#000',
  },
  dark: {
    tabActive: '#03f463',
    tabInactive: '#888',
    tabBackground: '#1e1e1e',
    headerBackground: '#1e1e1e',
    headerText: '#fff',
  },
};

// 👇 Hook para facilitar uso nas telas
export const useThemeStyles = (darkMode) =>
  darkMode ? themes.dark : themes.light;
