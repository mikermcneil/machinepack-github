
#machinepack-github

###Basic usage

```js
require('node-machine')
.machine('machinepack-github/get-repo')
.exec({
  success: console.log,
  error: console.error
})
```
