// Importa os componentes utilizados na tela
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Componente da tela de Login
export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>

      {/* Título da tela */}
      <Text style={styles.title}>Faça seu login</Text>

      {/* Campo de E-mail */}
      <Text style={styles.label}>E-mail</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
      />

      {/* Campo de Senha */}
      <Text style={styles.label}>Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"

        // Oculta os caracteres digitados
        secureTextEntry
      />

      {/* Botão de Login */}
      <TouchableOpacity
        style={styles.button}

        // Navega para a tela Tabs quando o botão for pressionado
        onPress={() => navigation.navigate("Tabs")}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Texto para usuários sem cadastro */}
      <Text style={styles.registerText}>
        Não possui uma conta?{" "}

        {/* Link para a tela de cadastro */}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("Cadastro")}
        >
          Cadastre-se
        </Text>
      </Text>

    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({

  // Container principal
  container: {
    flex: 1, // ocupa toda a tela
    justifyContent: "center", // centraliza verticalmente
    alignItems: "center", // centraliza horizontalmente
    padding: 20
  },

  // Título principal
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20
  },

  // Texto das labels
  label: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginTop: 20
  },

  // Campos de entrada
  input: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginTop: 8,

    // Remove a borda azul do navegador (apenas Web)
    outlineStyle: "none"
  },

  // Botão Entrar
  button: {
    marginTop: 30,
    backgroundColor: "#4A5D23",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: "50%",
  },

  // Texto do botão
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },

  // Texto abaixo do botão
  registerText: {
    marginTop: 20,
    textAlign: "center"
  },

  // Link para cadastro
  registerLink: {
    color: "#4A5D23",
    fontWeight: "bold"
  }
});