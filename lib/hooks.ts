import useSWR from "swr";
import fetcher from "./fetcher";

export const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR("/playlist", fetcher);

  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylistSongs = () => {
  const { data, error } = useSWR("/playlistSongs", fetcher);

  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};

// export const useFavoriteFunc = () => {
//   const { data, error } = useSWR("/handleFavorite", fetcher);

//   return { 
//     response: (data as any) || '',
//     isLoading: !data && !error,
//     isError: error,
//   };
// };
