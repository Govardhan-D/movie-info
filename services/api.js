const baseURL = "https://api.themoviedb.org/3";
const apiKey = "api_key";
async function fetchPopular() {
  let response = await fetch(
    `${baseURL}/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
  );
  let data = await response.json();

  return data.results;
}
export default fetchPopular;
