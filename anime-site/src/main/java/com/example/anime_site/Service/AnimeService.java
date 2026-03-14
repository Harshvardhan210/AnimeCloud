package com.example.anime_site.Service;

import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.example.anime_site.DTO.Animedto;
import com.example.anime_site.DTO.Genredto;


@Service
public class AnimeService {

    public Animedto getAnime(String name) {
        String url = "https://api.jikan.moe/v4/anime?q=" + name;
        RestTemplate restTemplate = new RestTemplate();
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            List<Map<String, Object>> data = (List<Map<String, Object>>) response.get("data");

            if (data == null || data.isEmpty()) {
                return null;
            }

            return mapToDto(data.get(0));
        } catch (Exception e) {
            System.err.println("API Rate limit or error: " + e.getMessage());
            return null;
        }
    }

    public List<Animedto> getRecommendations(int page) {
        String url = "https://api.jikan.moe/v4/top/anime?page=" + page;
        RestTemplate restTemplate = new RestTemplate();
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

    public List<Animedto> getAnimeByGenre(int genreId, int page) {
        String url = "https://api.jikan.moe/v4/anime?genres=" + genreId + "&page=" + page + "&order_by=score&sort=desc";
        RestTemplate restTemplate = new RestTemplate();
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


    public List<Genredto> getGenres() {
        String url = "https://api.jikan.moe/v4/genres/anime";
        RestTemplate restTemplate = new RestTemplate();
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

        return dto;
    }
}
