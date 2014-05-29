
#machinepack-github

###Basic usage

```js
require('node-machine')
.machine('machinepack-github/get-repo')
.configure({
  user: 'balderdashy',
  repo: 'sails'
})
.exec({
  success: console.log,
  error: console.error
})
```
