package io.github.akumosstl.agentic.work;

import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.ast.Node;
import com.vladsch.flexmark.ast.Heading;
import com.vladsch.flexmark.ast.ListBlock;
import com.vladsch.flexmark.ast.ListItem;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

public class MarkdownParserService {
    private final Parser parser = Parser.builder().build();

    public List<String> extractTitles(Path mdFile) throws IOException {
        String content = Files.readString(mdFile);
        Node document = parser.parse(content);
        List<String> titles = new ArrayList<>();
        for (Node node : document.getChildren()) {
            if (node instanceof Heading heading) {
                titles.add(heading.getText().toString().trim());
            }
        }
        return titles;
    }

    private void collectListBlockItems(ListBlock listBlock, List<String> items) {
        for (Node itemNode : listBlock.getChildren()) {
            if (itemNode instanceof ListItem listItem) {
                StringBuilder itemText = new StringBuilder();
                for (Node child : listItem.getChildren()) {
                    itemText.append(child.getChars().trim());
                }
                String text = itemText.toString();
                if (!text.isEmpty()) {
                    items.add(text);
                }
            }
        }
    }

    private void collectBlockItems(Node node, List<String> items) {
        if (node instanceof ListBlock listBlock) {
            collectListBlockItems(listBlock, items);
        } else {
            String text = node.getChars().trim().toString();
            if (!text.isEmpty()) {
                items.add(text);
            }
        }
    }

    public List<String> extractItemsByTitle(Path mdFile, String title) throws IOException {
        String content = Files.readString(mdFile);
        Node document = parser.parse(content);
        List<String> items = new ArrayList<>();
        boolean inSection = false;
        for (Node node : document.getChildren()) {
            if (node instanceof Heading heading) {
                String headingText = heading.getText().toString().trim();
                if (inSection) {
                    break;
                }
                inSection = headingText.equalsIgnoreCase(title);
            } else if (inSection) {
                collectBlockItems(node, items);
            }
        }
        return items;
    }

    public String extractBlockByTitle(Path mdFile, String title) throws IOException {
        String content = Files.readString(mdFile);
        Node document = parser.parse(content);
        boolean inSection = false;
        StringBuilder block = new StringBuilder();
        for (Node node : document.getChildren()) {
            if (node instanceof Heading heading) {
                String headingText = heading.getText().toString().trim();
                if (inSection) {
                    break;
                }
                inSection = headingText.equalsIgnoreCase(title);
            } else if (inSection) {
                block.append(node.getChars());
            }
        }
        return block.toString().trim();
    }
}
