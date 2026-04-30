# Controller Patterns in Java

## Best Practices for Building Controllers

### Use Single Responsibility Principle
Each controller should handle only one type of resource or concern.

Example:
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}
```

### Keep Controllers Thin
Controllers should only handle HTTP concerns: request parsing, response formatting, and calling services.

### Use DTOs for Request/Response
Never expose domain entities directly. Use Data Transfer Objects.

### Dependency Injection
Always use constructor injection, not field injection.