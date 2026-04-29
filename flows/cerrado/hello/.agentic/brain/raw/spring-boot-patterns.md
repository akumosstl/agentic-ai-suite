# Guia de Boas Práticas e Padrões: Spring Boot & Java

Este documento descreve os padrões recomendados para o desenvolvimento de aplicações robustas, escaláveis e de fácil manutenção utilizando o ecossistema Spring Boot.

## 1. Injeção de Dependência via Construtor
Evite o uso de `@Autowired` diretamente em atributos (field injection). A injeção via construtor facilita testes unitários e promove a imutabilidade.

```java
@Service
@RequiredArgsConstructor // Gera o construtor para campos final (Lombok)
public class PedidoService {

    private final PedidoRepository repository;
    private final EstoqueClient estoqueClient;

    public void processar(Pedido pedido) {
        // Lógica de negócio
    }
}
```

## 2. Camada de Controller e Tratamento Global
Mantenha os Controllers "magros". Utilize um `@ControllerAdvice` para capturar exceções de forma global, evitando blocos try-catch repetitivos.

```java
@RestController
@RequestMapping("/v1/pedidos")
public class PedidoController {

    private final PedidoService service;

    @PostMapping
    public ResponseEntity<PedidoDTO> criar(@Valid @RequestBody PedidoRequest request) {
        var response = service.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ProblemDetail> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage()));
    }
}
```

## 3. Uso de DTOs (Data Transfer Objects)
Nunca exponha suas entidades JPA diretamente na API. Use DTOs para controlar o que é enviado/recebido e evitar problemas como o `LazyInitializationException`.

```java
// Entidade JPA
@Entity
public class Usuario {
    @Id @GeneratedValue private Long id;
    private String nome;
    private String senha; // Nunca deve ser exposta
}

// DTO de Resposta
public record UsuarioResponseDTO(Long id, String nome) {}

// Mapper simples com Java Streams
public UsuarioResponseDTO toDTO(Usuario usuario) {
    return new UsuarioResponseDTO(usuario.getId(), usuario.getNome());
}
```

## 4. Padrão Strategy para Lógicas Condicionais
Em vez de múltiplos `if/else` ou `switch` para regras de negócio, utilize o padrão Strategy aproveitando o polimorfismo do Spring.

```java
public interface EstrategiaPagamento {
    TipoPagamento getTipo();
    void processar(BigDecimal valor);
}

@Service
@RequiredArgsConstructor
public class ProcessadorPagamento {

    // O Spring injeta automaticamente todos os beans que implementam a interface
    private final List<EstrategiaPagamento> estrategias;

    public void executar(TipoPagamento tipo, BigDecimal valor) {
        estrategias.stream()
            .filter(e -> e.getTipo().equals(tipo))
            .findFirst()
            .orElseThrow()
            .processar(valor);
    }
}
```

## 5. Validação com Bean Validation
Utilize as anotações do `jakarta.validation` para garantir a integridade dos dados antes que cheguem à camada de serviço.

```java
public record ProdutoRequest(
    @NotBlank(message = "O nome é obrigatório")
    String nome,

    @Min(value = 1, message = "O preço deve ser maior que zero")
    BigDecimal preco,

    @Email(message = "Email do fornecedor inválido")
    String emailFornecedor
) {}
```

## 6. Resiliência com Resilience4j
Proteja sua aplicação contra falhas em sistemas externos utilizando o padrão **Circuit Breaker**.

```java
@Service
public class IntegracaoFinanceira {

    @CircuitBreaker(name = "financeiroCB", fallbackMethod = "fallbackProcessar")
    public String chamarServicoExterno() {
        // Chamada via RestTemplate ou WebClient
        return "Sucesso";
    }

    public String fallbackProcessar(Exception e) {
        return "Serviço temporariamente indisponível. Tente mais tarde.";
    }
}
```
