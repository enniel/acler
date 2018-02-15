# ACLer

Minimalistic ACL implementation for privileges management in `JS`

[![NPM Version](https://img.shields.io/npm/v/acler.svg?style=flat-square)](https://npmjs.org/package/acler)
[![GitHub license](https://img.shields.io/github/license/enniel/acler.svg)](https://github.com/enniel/acler/blob/master/LICENSE.md)
[![Build Status](https://travis-ci.org/enniel/acler.svg?branch=master)](https://travis-ci.org/enniel/acler)
[![Coverage Status](https://coveralls.io/repos/github/enniel/acler/badge.svg?branch=master)](https://coveralls.io/github/enniel/acler?branch=master)

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
