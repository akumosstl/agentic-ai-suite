package io.github.akumosstl.agentic.web;

import io.github.akumosstl.agentic.work.AgentFileManager;
import io.github.akumosstl.agentic.work.MarkdownParserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/agents")
public class AgentPromptController {
    private final AgentFileManager fileManager = new AgentFileManager();
    private final MarkdownParserService parserService = new MarkdownParserService();
    // Prompt acumulado
    private final StringBuilder promptBuilder = new StringBuilder();

    @GetMapping("/titles/{file}")
    public List<String> listTitles(@PathVariable String file) throws IOException {
        Path filePath = fileManager.getAgentsDir().resolve(file);
        return parserService.extractTitles(filePath);
    }

    @GetMapping("/items/{file}/{title}")
    public List<String> getItemsByTitle(@PathVariable String file, @PathVariable String title) throws IOException {
        Path filePath = fileManager.getAgentsDir().resolve(file);
        return parserService.extractItemsByTitle(filePath, title);
    }

    @GetMapping("/block/{file}/{title}")
    public Map<String, String> getBlockByTitle(@PathVariable String file, @PathVariable String title) throws IOException {
        Path filePath = fileManager.getAgentsDir().resolve(file);
        String block = parserService.extractBlockByTitle(filePath, title);
        Map<String, String> result = new HashMap<>();
        result.put("block", block);
        return result;
    }

    @PostMapping("/textarea")
    public ResponseEntity<?> addToPrompt(@RequestBody Map<String, String> body) {
        String value = body.getOrDefault("value", "").trim();
        if (!value.isEmpty()) {
            if (promptBuilder.length() > 0) promptBuilder.append("\n");
            promptBuilder.append(value);
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/textarea/replace")
    public ResponseEntity<?> replacePrompt(@RequestBody Map<String, String> body) {
        String value = body.getOrDefault("value", "");
        promptBuilder.setLength(0);
        if (!value.isEmpty()) {
            promptBuilder.append(value);
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/textarea/history")
    public Map<String, String> getPrompt() {
        Map<String, String> result = new HashMap<>();
        result.put("history", promptBuilder.toString());
        return result;
    }

    @GetMapping("/files")
    public List<String> listFiles(@RequestParam("md") String md) {
        return fileManager.getFileNames(md);
    }
}
