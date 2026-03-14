package com.example.anime_site.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "my_list")
public class MyList {

    @Id
    @Column(name = "mal_id", unique = true, nullable = false)
    private Integer malId;

    private String title;
    
    @Column(length = 1000)
    private String poster;
    
    private Double score;
    private Integer episodes;
    private String status = "Watching"; // default status

    // Getters and Setters
    public Integer getMalId() { return malId; }
    public void setMalId(Integer malId) { this.malId = malId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getPoster() { return poster; }
    public void setPoster(String poster) { this.poster = poster; }
    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
    public Integer getEpisodes() { return episodes; }
    public void setEpisodes(Integer episodes) { this.episodes = episodes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
