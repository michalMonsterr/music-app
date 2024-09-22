import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { getToken } from "./spotifyAuth";

const MusicPlayer = () => {
  const [tracks, setTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);

  // Fetch the Spotify access token when the component mounts
  React.useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };
    fetchToken();
  }, []);

  const searchTracks = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTracks(data.tracks.items);
      setError(null);
    } catch (error) {
      setError("Failed to fetch tracks. Please try again later.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Spotify Music Player
      </Typography>

      <TextField
        label="Search for a track"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={searchTracks}
      >
        Search
      </Button>

      {error && (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        {tracks.length > 0 &&
          tracks.map((track) => (
            <Card key={track.id} sx={{ maxWidth: 600, mx: "auto" }}>
              <CardContent>
                <Typography variant="h6">{track.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    window.open(track.external_urls.spotify, "_blank")
                  }
                >
                  Play on Spotify
                </Button>
              </CardActions>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default MusicPlayer;
