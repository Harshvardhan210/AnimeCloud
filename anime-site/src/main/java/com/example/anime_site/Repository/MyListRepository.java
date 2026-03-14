package com.example.anime_site.Repository;

import com.example.anime_site.Entity.MyList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyListRepository extends JpaRepository<MyList, Integer> {
}
