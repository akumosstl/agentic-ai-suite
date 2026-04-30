# Java Clean Code Tips

## Meaningful Names
- Use intention-revealing names
- Avoid disinformation (don't call something `accountList` if it's not a List)
- Make meaningful distinctions (don't use `a1`, `a2`, `a3`)

## Functions
- Keep them small (under 20 lines)
- Do one thing
- Use descriptive names
- Prefer fewer arguments (0-2 is ideal, 3+ needs justification)

## Code Organization
- Follow the "newspaper metaphor" - high-level concepts first, details later
- Group related functionality together
- Use packages to separate concerns by feature, not by layer
```
