# 1.0.0 (2025-09-09)


* refactor(core)!: implement modular architecture with enhanced error handling ([a3fdb7e](https://github.com/z3rofunk/snippers/commit/a3fdb7ed17a4884764fd13aed2a3189c97407528))
* refactor(snippers)!: enhance type safety and return structured snip results ([4f7b64d](https://github.com/z3rofunk/snippers/commit/4f7b64de9a4c26f4ba31a98135e84ee7d9eaa12b))


### Bug Fixes

* relocate GitHub templates to correct directory structure ([bcff455](https://github.com/z3rofunk/snippers/commit/bcff45574bef9efbc0af19174967d5bb3df04837))


### Features

* **snippers:** add configurable timeout and enhanced error handling ([64b0db1](https://github.com/z3rofunk/snippers/commit/64b0db18b3fe3d20dc4b2f831f2e8c6e3011de93))
* **snippers:** add structured error handling and update package ([ae0edbf](https://github.com/z3rofunk/snippers/commit/ae0edbfb8a6886a853ef2969b27511f1f8935844))
* **snippers:** integrate dagd shortening with registry architecture ([283d3d1](https://github.com/z3rofunk/snippers/commit/283d3d1ac0d712b04496a72395f0f089eebb9957))
* **tests:** add comprehensive test suite for dagd snipper functionality ([d61971d](https://github.com/z3rofunk/snippers/commit/d61971d17c3d9d1f31a8dfaac390f33fd76c9a1c))


### BREAKING CHANGES

* `Snipper` class moved to `src/Snipper.ts`,
`SnipperError` moved to `error` directory, and legacy utility files
removed, requiring import path updates throughout codebase
* `snip()` no longer returns a `string`. It now returns a
`SnipResult` object. Consumers must update their usage to access the
`shortUrl` property explicitly.
