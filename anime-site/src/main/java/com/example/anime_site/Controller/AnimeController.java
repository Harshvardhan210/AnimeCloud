package com.example.anime_site.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.anime_site.DTO.Animedto;
import com.example.anime_site.DTO.Genredto;
import com.example.anime_site.Service.AnimeService;
import java.util.List;

@RestController
@RequestMapping("/anime")
@CrossOrigin(origins = "*")
public class AnimeController {
    
    public final AnimeService animeService;

    public AnimeController(AnimeService animeService){
        this.animeService = animeService;
    }

    @GetMapping
    public Animedto getAnime(@RequestParam String name){
        return animeService.getAnime(name);
    }

    @GetMapping("/top")
    public List<Animedto> getRecommendations(@RequestParam(defaultValue = "1") int page) {
        return animeService.getRecommendations(page);
    }

    @GetMapping("/genres")
    public List<Genredto> getGenres() {
        return animeService.getGenres();
    }

    @GetMapping("/genre")
    public List<Animedto> getAnimeByGenre(@RequestParam int genreId, @RequestParam(defaultValue = "1") int page) {
        return animeService.getAnimeByGenre(genreId, page);
    }
}
