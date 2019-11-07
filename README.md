# have-i-been-pwned
Have I been pwned 3IT, based in http://haveibeenpwned.com

## Instrucciones para probar

Se puede usar el servicdor de Heroku o levantar un servidor/proxy para realizar las peticiones al API.

### Heroku

La url pasa por el servidor cors-anywhere de Heroku (linea 7)

### Proxy

* NodeJS
* librería local-cors-proxy (npm install -g local-cors-proxy)
* descomentar linea de variable url del proxy (linea 8)

Se debe ejecutar

```bash
lcp --proxyUrl https://haveibeenpwned.com
```
