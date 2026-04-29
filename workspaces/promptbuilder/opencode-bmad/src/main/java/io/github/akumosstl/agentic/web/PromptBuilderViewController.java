package io.github.akumosstl.agentic.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PromptBuilderViewController {
    @GetMapping({"/", "/index", "/prompt-builder"})
    public String index() {
        return "index";
    }
}
