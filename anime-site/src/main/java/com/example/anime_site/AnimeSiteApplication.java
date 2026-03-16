package com.example.anime_site;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class AnimeSiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnimeSiteApplication.class, args);
	}

}
