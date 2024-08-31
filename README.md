
# markp

Library/CLI to convert HTML into markdown

## Install C

```sh
# cli is available on npm as "markp"
npm i -g markp

# library is available in jsr as "tomd"
pnpm dlx jsr add @ch/tomd
```

## Usage

```sh
# pipe content to file
markp 'https://github.com/carlosqsilva/markp' > readme.md

# pretty print
markp 'https://github.com/carlosqsilva/markp' | glow

# pipe into a LLM (large language model)
markp 'https://github.com/carlosqsilva/markp' | mods "summarize this article"
```
