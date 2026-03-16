package com.example.anime_site.DTO;

import java.util.List;

public class Animedto {

    private Integer id;
    private String title;
    private String poster;
    private Double score;
    private Integer episodes;
    private Integer year;
    private String type;
    private List<String> genres;

    public Animedto() {
    }

    public Animedto(Integer id, String title, String poster, Double score, Integer episodes, Integer year, String type, List<String> genres) {
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.score = score;
        this.episodes = episodes;
        this.year = year;
        this.type = type;
        this.genres = genres;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Integer getEpisodes() {
        return episodes;
    }

    public void setEpisodes(Integer episodes) {
        this.episodes = episodes;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    @Override
    public String toString() {
        return "Animedto [id=" + id + ", title=" + title + ", poster=" + poster + ", score=" + score
                + ", episodes=" + episodes + ", year=" + year + ", type=" + type + ", genres=" + genres + "]";
    }
}
