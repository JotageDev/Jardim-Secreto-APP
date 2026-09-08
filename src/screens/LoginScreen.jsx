import { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import api from "../services/api";

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {

    // Verifica se os campos foram preenchidos
    if (!email || !password) {
      Alert.alert(
        "Atenção",
        "Preencha o e-mail e a senha."
      );

      return;
    }

    try {

      setCarregando(true);

      // Envia os dados para o mesmo Back-End
      // utilizado pelo projeto Web
      const response = await api.post(
        "/users/login",
        {
          email: email,
          password: password,
        }
      );

      console.log("Login realizado com sucesso!");
      console.log("Resposta da API:", response.data);

      // O Back-End retorna o token JWT
      console.log("Token:", response.data.token);

      Alert.alert(
        "Sucesso",
        "Login realizado com sucesso!"
      );

      // Entra na aplicação
      navigation.replace("Tabs");

    } catch (error) {

      console.log("Erro no login:", error);

      console.log(
        "Resposta da API:",
        error.response?.data
      );

      // Se o servidor respondeu com algum erro
      if (error.response) {

        Alert.alert(
          "Erro no login",
          error.response.data?.message ||
            "E-mail ou senha inválidos."
        );

      } else if (error.request) {

        // Não conseguiu chegar ao Back-End
        Alert.alert(
          "Erro de conexão",
          "Não foi possível conectar ao servidor. Verifique se o Back-End está rodando e se o celular está na mesma rede Wi-Fi do computador."
        );

      } else {

        Alert.alert(
          "Erro",
          "Ocorreu um erro ao tentar fazer login."
        );

      }

    } finally {

      setCarregando(false);

    }
  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Faça seu login
      </Text>

      {/* E-mail */}

      <Text style={styles.label}>
        E-mail
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"

        value={email}
        onChangeText={setEmail}

        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Senha */}

      <Text style={styles.label}>
        Senha
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"

        value={password}
        onChangeText={setPassword}

        secureTextEntry
      />

      {/* Botão */}

      <TouchableOpacity
        style={[
          styles.button,
          carregando && styles.buttonDisabled
        ]}
        onPress={handleLogin}
        disabled={carregando}
      >

        {carregando ? (

          <ActivityIndicator color="#fff" />

        ) : (

          <Text style={styles.buttonText}>
            Entrar
          </Text>

        )}

      </TouchableOpacity>

      {/* Cadastro */}

      <Text style={styles.registerText}>

        Não possui uma conta?{" "}

        <Text
          style={styles.registerLink}
          onPress={() =>
            navigation.navigate("Cadastro")
          }
        >
          Cadastre-se
        </Text>

      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginTop: 20,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    outlineStyle: "none",
  },

  button: {
    marginTop: 30,
    backgroundColor: "#4A5D23",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: "50%",
    minHeight: 45,
    justifyContent: "center",
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  registerText: {
    marginTop: 20,
    textAlign: "center",
  },

  registerLink: {
    color: "#4A5D23",
    fontWeight: "bold",
  },

});