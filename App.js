import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import fetchPopular from "./services/api";

const sampleData = [
  {
    id: 1,
    poster_path:
      "https://image.tmdb.org/t/p/w500/jYfMTSiFFK7ffbY2lay4zyvTkEk.jpg",
  },
  {
    id: 2,
    poster_path:
      "https://image.tmdb.org/t/p/w500/cAoktVUBhGyULRoxV6mZ2LB3x7I.jpg",
  },
];

function MovieCard({ movie }) {
  console.log(movie.poster_path);
  const image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  console.log(image_url);
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: image_url }}
        resizeMode="cover"
        style={styles.image}
      />
      <Text>{movie.title}</Text>
    </View>
  );
}

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchMovies() {
      let results = await fetchPopular();
      setData(results);
    }
    fetchMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="hello"
        style={styles.input}
        value={input}
        onChangeText={setInput}
      />
      <Text style={styles.text}>{input}</Text>
      <View style={styles.container}>
        {sampleData.length > 0 && (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => {
              console.log(item);
              return <MovieCard movie={item} />;
            }}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  text: {
    fontFamily: "roboto",
  },
  input: {
    width: "90%",
    height: 60,

    borderColor: "red",
    borderWidth: 2,
    padding: 16,
    borderRadius: 10,
  },
  card: {
    margin: 20,
    textAlign: "center",
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
});
