
# markp

CLI to convert HTML into markdown

## Install

```sh
npm i -g markp
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
