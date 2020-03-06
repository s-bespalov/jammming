import Config from "./Config";

const appId = Config.deezerAppId;
const redirectUrl = `${Config.host}/`;
const proxy = `${Config.proxy}/`;
let userAccessToken = "";
let expires;
let user;

const Deezer = {
  getAccessToken: function() {
    if(userAccessToken) {
      return userAccessToken;
    }

    const accessRegx = /access_token=([^&]*)/;
    const startTokenIdx = 13;
    const expiresRegx = /expires=([^&]*)/;
    const startExpiresIdx = 8;
    const url =
      `https://connect.deezer.com/oauth/auth.php?` +
      `app_id=${appId}&redirect_uri=${redirectUrl}` +
      `&perms=basic_access,email,manage_library` +
      `&response_type=token`;

    let accessMatch = window.location.href.match(accessRegx);
    let expiresMath = window.location.href.match(expiresRegx);
    if(accessMatch && expiresMath) {
      userAccessToken = accessMatch[0].substring(startTokenIdx);
      expires = Number(expiresMath[0].substring(startExpiresIdx)) * 1000;
      setTimeout(() => {
        alert("Authentication is expired. Login needed");
        window.location = url;
      }, expires);
      return userAccessToken;
    }


    window.location = url;
  },

  getUserId: async function(){
    if(user) {
      return;
    }

    const url = `https://api.deezer.com/user/me?` +
      `access_token=${userAccessToken}`;

    const response = await fetch(proxy + url);
    const userData = await response.json();

    user = {id: userData.id};
  },

  search: async function(term) {
    const url = `https://api.deezer.com/search?q=track:${term}` +
      `&access_token=${userAccessToken}`;

    const response = await fetch(proxy + url);
    const tracks = await response.json();

    return tracks.data.map(track => {
      return {
        id: track.id,
        name: track.title,
        artist: track.artist.name,
        album: track.album.title,
        uri: track.link
      }
    });
  },

  savePlayList: async function(name, tracks) {
    await this.getUserId();

    //create new playlist
    const url = `https://api.deezer.com/user/${user.id}/playlists` +
      `?access_token=${userAccessToken}` +
      `&title=${name}`;
    const response = await fetch(proxy + url, {method: 'POST'});
    const playList = await response.json();

    //add songs to the playlist
    const urlplay = `https://api.deezer.com/playlist/${playList.id}/tracks` +
      `?access_token=${userAccessToken}`+
      `&songs=${tracks.join()}`;
    const responsePlay = await fetch(proxy + urlplay, {
      method: 'POST'
    });

    const response2 = await responsePlay.json();
    console.log(response2);
  }

}

export default Deezer;
