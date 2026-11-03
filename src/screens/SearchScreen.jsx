
import { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

export default function SearchScreen({ navigation }) {
  const [pesquisa, setPesquisa] = useState("");
  const [plantas, setPlantas] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (pesquisa.trim().length === 0) {
      setPlantas([]);
      return;
    }

    const timer = setTimeout(() => {
      buscarPlantas();
    }, 300);

    return () => clearTimeout(timer);
  }, [pesquisa]);

  async function buscarPlantas() {
    try {
      setCarregando(true);

      const resposta = await api.get("/plants/search", {
        params: {
          nome: pesquisa.trim(),
        },
      });

      setPlantas(resposta.data);
    } catch (error) {
      console.error("Erro ao pesquisar plantas:", error);
      setPlantas([]);
    } finally {
      setCarregando(false);
    }
  }

  function selecionarPlanta(planta) {
    setPesquisa(planta.nome);
    setPlantas([planta]);
  }

  function renderPlanta({ item }) {
    return (
      <TouchableOpacity
        style={styles.plantItem}
        onPress={() => selecionarPlanta(item)}
      >
        <View style={styles.plantIcon}>
          <Ionicons
            name="leaf-outline"
            size={22}
            color="#4A5D23"
          />
        </View>

        <View style={styles.plantInfo}>
          <Text style={styles.plantName}>
            {item.nome}
          </Text>

          <Text style={styles.plantPrice}>
            R$ {Number(item.preco).toFixed(2).replace(".", ",")}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color="#888"
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Pesquisar plantas
      </Text>

      <Text style={styles.subtitle}>
        Encontre a planta ideal para você.
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar plantas..."
          placeholderTextColor="#777"
          style={styles.input}
          value={pesquisa}
          onChangeText={setPesquisa}
          autoCorrect={false}
        />

        {pesquisa.length > 0 ? (
          <TouchableOpacity onPress={() => setPesquisa("")}>
            <Ionicons
              name="close-circle"
              size={22}
              color="#777"
            />
          </TouchableOpacity>
        ) : (
          <Ionicons
            name="search"
            size={22}
            color="#4A5D23"
          />
        )}
      </View>

      {carregando && (
        <ActivityIndicator
          size="small"
          color="#4A5D23"
          style={styles.loading}
        />
      )}

      {!carregando && pesquisa.trim().length > 0 && (
        <FlatList
          data={plantas}
          keyExtractor={(item) => String(item.id_plantas)}
          renderItem={renderPlanta}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Nenhuma planta encontrada.
            </Text>
          }
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4A5D23",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#777",
    marginTop: 5,
    marginBottom: 20,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9e2d5",
    borderRadius: 30,
    paddingHorizontal: 18,
    height: 52,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    outlineStyle: "none",
  },

  loading: {
    marginTop: 25,
  },

  plantItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  plantIcon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#EAF0E5",
    alignItems: "center",
    justifyContent: "center",
  },

  plantInfo: {
    flex: 1,
    marginLeft: 12,
  },

  plantName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  plantPrice: {
    fontSize: 14,
    color: "#4A5D23",
    marginTop: 4,
  },

  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 30,
    fontSize: 15,
  },
});