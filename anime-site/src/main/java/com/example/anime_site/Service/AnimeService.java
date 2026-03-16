package com.example.anime_site.Service;

import com.example.anime_site.DTO.Animedto;
import com.example.anime_site.DTO.Genredto;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class AnimeService {

    private final RestTemplate restTemplate;

    public AnimeService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Cacheable(value = "animeSearch", key = "#name + '-' + #page")
    public List<Animedto> searchAnime(String name, int page) {
        String url = "https://api.jikan.moe/v4/anime?q=" + name + "&page=" + page + "&limit=12";
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            List<Map<String, Object>> data = (List<Map<String, Object>>) response.get("data");

            if (data == null || data.isEmpty()) {
                return List.of();
            }

            return data.stream()
                       .map(this::mapToDto)
                       .toList();
        } catch (Exception e) {
            System.err.println("API Rate limit or error: " + e.getMessage());
            return List.of();
        }
    }

    @Cacheable(value = "topAnime", key = "#page")
    public List<Animedto> getRecommendations(int page) {
        String url = "https://api.jikan.moe/v4/top/anime?page=" + page;
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            List<Map<String, Object>> data = (List<Map<String, Object>>) response.get("data");

            if (data == null || data.isEmpty()) {
                return List.of();
            }

            return data.stream()
                       .limit(20)
                       .map(this::mapToDto)
                       .toList();
        } catch (Exception e) {
            System.err.println("API Rate limit or error: " + e.getMessage());
            return List.of();
        }
    }

    @Cacheable(value = "animeByGenre", key = "#genreId + '-' + #page")
    public List<Animedto> getAnimeByGenre(int genreId, int page) {
        String url = "https://api.jikan.moe/v4/anime?genres=" + genreId + "&page=" + page + "&order_by=score&sort=desc";
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            List<Map<String, Object>> data = (List<Map<String, Object>>) response.get("data");

            if (data == null || data.isEmpty()) {
                return List.of();
            }

            return data.stream()
                       .map(this::mapToDto)
                       .toList();
        } catch (Exception e) {
            System.err.println("API Rate limit or error: " + e.getMessage());
            return List.of();
        }
    }


    @Cacheable(value = "genres", key = "'all'")
    public List<Genredto> getGenres() {
        String url = "https://api.jikan.moe/v4/genres/anime";
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            List<Map<String, Object>> data = (List<Map<String, Object>>) response.get("data");

            if (data == null || data.isEmpty()) {
                return List.of();
            }

            return data.stream()
                       .map(genre -> new Genredto((Integer) genre.get("mal_id"), (String) genre.get("name")))
                       .toList();
        } catch (Exception e) {
            System.err.println("API Rate limit or error: " + e.getMessage());
            return List.of();
        }
    }

    @Cacheable(value = "animeById", key = "#id")
    public Animedto getAnimeById(int id) {
        String url = "https://api.jikan.moe/v4/anime/" + id;
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            Map<String, Object> data = (Map<String, Object>) response.get("data");
            if (data == null) return null;
            return mapToDto(data);
        } catch (Exception e) {
            System.err.println("Error fetching anime by ID: " + e.getMessage());
            return null;
        }
    }

    private Animedto mapToDto(Map<String, Object> anime) {
        Animedto dto = new Animedto();
        dto.setId((Integer) anime.get("mal_id"));
        String englishTitle = (String) anime.get("title_english");
        dto.setTitle(englishTitle != null ? englishTitle : (String) anime.get("title"));
        
        Map<String, Object> images = (Map<String, Object>) anime.get("images");
        if (images != null) {
            Map<String, Object> jpg = (Map<String, Object>) images.get("jpg");
            if (jpg != null) {
                dto.setPoster((String) jpg.get("large_image_url"));
            }
        }

        dto.setScore(anime.get("score") != null ? Double.valueOf(String.valueOf(anime.get("score"))) : 0.0);
        dto.setEpisodes((Integer) anime.get("episodes"));
        dto.setYear((Integer) anime.get("year"));
        dto.setType((String) anime.get("type"));
        dto.setSynopsis((String) anime.get("synopsis"));

        List<Map<String, Object>> genresList = (List<Map<String, Object>>) anime.get("genres");
        if (genresList != null) {
            List<String> genreNames = genresList.stream()
                    .map(g -> (String) g.get("name"))
                    .collect(Collectors.toList());
            dto.setGenres(genreNames);
        } else {
            dto.setGenres(new ArrayList<>());
        }

        return dto;
    }
}
