package com.example.anime_site.Controller;

import com.example.anime_site.Entity.MyList;
import com.example.anime_site.Service.MyListService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/mylist")
@CrossOrigin(origins = "*")
public class MyListController {
    
    private final MyListService service;

    public MyListController(MyListService service) {
        this.service = service;
    }

    @PostMapping
    public MyList addToList(@RequestBody MyList item) {
        return service.addToList(item);
    }

    @GetMapping
    public List<MyList> getMyList() {
        return service.getMyList();
    }

    @DeleteMapping("/{malId}")
    public ResponseEntity<Void> removeFromList(@PathVariable Integer malId) {
        service.removeFromList(malId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{malId}/check")
    public boolean checkInList(@PathVariable Integer malId) {
        return service.isInList(malId);
    }

    @GetMapping("/{malId}")
    public ResponseEntity<MyList> getAnimeFromList(@PathVariable Integer malId) {
        MyList item = service.getAnimeById(malId);
        if (item != null) {
            return ResponseEntity.ok(item);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{malId}/status")
    public MyList updateStatus(@PathVariable Integer malId, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return service.updateStatus(malId, status);
    }
}
