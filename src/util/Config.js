import {DeezerSecrets} from '../secrets/secrets';
import {DeezerSecretsDev} from '../secrets/secrets';

const debug = true;

const Config = debug? {
  //devlopment config
  host: "http://localhost:3000",
  proxy: "https://cors-anywhere.herokuapp.com",
  deezerAppId: DeezerSecretsDev.id
} : {
  //release config
  host: "https://jammming.azurewebsites.net",
  proxy: "https://cors-anywhere.herokuapp.com",
  deezerAppId: DeezerSecrets.id
}

export default Config;
