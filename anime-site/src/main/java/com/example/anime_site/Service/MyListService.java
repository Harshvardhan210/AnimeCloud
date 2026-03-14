package com.example.anime_site.Service;

import com.example.anime_site.Entity.MyList;
import com.example.anime_site.Repository.MyListRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MyListService {

    private final MyListRepository repository;

    public MyListService(MyListRepository repository) {
        this.repository = repository;
    }

    public MyList addToList(MyList item) {
        return repository.save(item);
    }

    public List<MyList> getMyList() {
        return repository.findAll();
    }

    public void removeFromList(Integer malId) {
        repository.deleteById(malId);
    }

    public boolean isInList(Integer malId) {
        return repository.existsById(malId);
    }

    public MyList getAnimeById(Integer malId) {
        return repository.findById(malId).orElse(null);
    }

    public MyList updateStatus(Integer malId, String status) {
        MyList item = repository.findById(malId).orElse(null);
        if (item != null) {
            item.setStatus(status);
            return repository.save(item);
        }
        return null;
    }
}
