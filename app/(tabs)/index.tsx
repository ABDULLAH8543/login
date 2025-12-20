import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../firebase";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [user, setUser] = useState(null);

  // Redirect URI needed for Expo Auth Session
  const redirectUri = Google.makeRedirectUri({
    scheme: "googleloginapp", // must match app.json scheme
    native: "googleloginapp:/oauthredirect",
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "238599351095-9cv03v0dnoq6bnif75ga2gohsc9ok7pu.apps.googleusercontent.com",
    webClientId:
      "238599351095-q9avo14f0cqsjh7oevonq8ee0t7m2f3f.apps.googleusercontent.com",
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((res) => {
          setUser(res.user);
          // Optional: Save user to Firestore
          // saveUser(res.user);
        })
        .catch((err) => console.log("Firebase error:", err));
    }
  }, [response]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {user ? (
        <>
          <Text>Welcome</Text>
          <Text>Name: {user.displayName}</Text>
          <Text>Email: {user.email}</Text>
        </>
      ) : (
        <Button title="Login With Google" onPress={() => promptAsync()} />
      )}
    </View>
  );
}
