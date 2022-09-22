import axios from "axios";
import MD5 from "crypto-js/md5";

const MARVEL_API_BASE_URL = "http://gateway.marvel.com/";
const MARVEL_API_PUBLIC_KEY = process.env.REACT_APP_API_KEY;
const MARVEL_API_PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;

const getHash = (ts, prik, pubk) => {
  return MD5(ts + prik + pubk).toString();
};

class DisneyMarvelAPI {
  // Find the comic by ID (Made for Testing Purposes)
  async getComicsByID(ID) {
    const ts = Date.now().toString();
    const hash = getHash(ts, MARVEL_API_PRIVATE_KEY, MARVEL_API_PUBLIC_KEY);
    const url =
      MARVEL_API_BASE_URL +
      "v1/public/comics/" +
      ID +
      "?ts=" +
      ts +
      "&apikey=" +
      MARVEL_API_PUBLIC_KEY +
      "&hash=" +
      hash;
    return axios.get(url); //https://gateway.marvel.com:443/v1/public/comics/
  }
  async getCharacterByNameStart(nameStart) {
    const ts = Date.now().toString();
    const hash = getHash(ts, MARVEL_API_PRIVATE_KEY, MARVEL_API_PUBLIC_KEY);
    const url =
      MARVEL_API_BASE_URL +
      "v1/public/characters" +
      "?ts=" +
      ts +
      "&nameStartsWith=" +
      nameStart +
      "&apikey=" +
      MARVEL_API_PUBLIC_KEY +
      "&hash=" +
      hash;
    return await axios.get(url); //https://gateway.marvel.com:443/v1/public/comics/
  }
}

export default new DisneyMarvelAPI();
