# ACLer

Minimalistic ACL implementation for privileges management in `JS`

## Installation

```bash
$ npm i acler --save
```
or

```bash
$ yarn add acler
```

## Usage

```js
// using ES modules
import { check } from 'acler'
// using CommonJS modules
const { check } = require('acler')

const user = {
  get roles () {
    return ['moderator']
  }
}

const can = check('administrator || moderator', role => {
  return user.roles.includes(role)
})

if (!can) {
  throw new Error('You not allowed to this resource.')
}
```

## Syntax

`and (&&)` - administrator && moderator

`or (||)` - administrator || moderator

`not (!)` - administrator && !moderator

## Credits

- [Evgeni Razumov](https://github.com/enniel)

## Support

Having trouble? [Open an issue](https://github.com/enniel/acler/issues/new)!

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
