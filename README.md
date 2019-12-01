# Cookielang
A simple, safe and strongly typed programming language made for fun.
Cookielang is also largely inspired by [Go](https://golang.org/) and [V](https://vlang.io)'s syntaxes.

# ⚠ Work In Progress
Cookielang is still a very young language, so don't let it touch production just yet!

## Hello World
```rust
fn main() {}
```

## Comments
```rust
// Single line comment
/* Multi line comments
Foo bar */
```

## Functions
Top level statements are not allowed
```rust
console.println("Hello Cookielang!") // Syntax Error
```
```rust
fn main() {
    console.println("Hello Cookielang!") // Hello Cookielang!
}
```
I will omit the main function decleration for other parts in this documentation.
## Variables
```rust
int foo = 123
int bar = 456
foo = bar
bar = true // Type Error

console.println(foo) // 456
console.println(bar) // 456
```
## If
```rust
int foo = 123
int bar = 456
if foo == bar {
    console.println("Foo equals bar") // This won't log
} else {
    console.println("Foo doesn't equal bar") // This will log
}
```
## Types
- int (u = unsigned)
    - `uint16`
    - `uint32`
    - `uint64`
    - `int16`
    - `int32`
    - `int64` (this one is also `int`)
- `bool`
- `float` (always 64 bit)
- `str`
- `map[str]str`
### Strings
TODO Write this

### Arrays

### Maps
