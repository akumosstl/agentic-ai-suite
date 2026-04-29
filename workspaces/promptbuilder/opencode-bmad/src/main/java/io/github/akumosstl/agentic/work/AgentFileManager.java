package io.github.akumosstl.agentic.work;

import java.io.*;
import java.nio.file.*;
import java.util.*;

public class AgentFileManager {
    private Path agentsDir;
    private String userHome = System.getProperty("user.home");

    public AgentFileManager() {
        ensureDirectories();
    }

    private void ensureDirectories() {
        try {
            Files.createDirectories(Paths.get(userHome, ".agentic"));
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    public Path getAgentsDir() {
        return agentsDir;
    }

    public List<String> getFileNames(String md) {
        agentsDir = Paths.get(userHome, ".agentic", "templates", md);
        List<String> result = new ArrayList<>();
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(agentsDir, "*.md")) {
            for (Path entry : stream) {
                result.add(entry.getFileName().toString());
            }
        } catch (IOException e) {
            // Retorna lista vazia em caso de erro
        }
        // Ordenação natural (alfanumérica)
        result.sort((a, b) -> {
            // Remove extensão para comparar só o nome
            String na = a.replaceFirst("\\.md$", "");
            String nb = b.replaceFirst("\\.md$", "");
            // Divide por partes numéricas e textuais
            java.util.regex.Pattern p = java.util.regex.Pattern.compile("(\\d+)|(\\D+)");
            java.util.regex.Matcher ma = p.matcher(na);
            java.util.regex.Matcher mb = p.matcher(nb);
            while (ma.find() && mb.find()) {
                String pa = ma.group();
                String pb = mb.group();
                if (pa.matches("\\d+") && pb.matches("\\d+")) {
                    int cmp = Integer.compare(Integer.parseInt(pa), Integer.parseInt(pb));
                    if (cmp != 0) return cmp;
                } else {
                    int cmp = pa.compareTo(pb);
                    if (cmp != 0) return cmp;
                }
            }
            return na.compareTo(nb);
        });
        return result;
    }
}
