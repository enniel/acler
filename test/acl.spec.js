'use strict'

/**
 * acler
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const test = require('japa')
const Acl = require('../src/Acl')

test.group('Acl', function () {
  test('without operators', async assert => {
    assert.isTrue(await Acl.check('admin', operand => {
      return ['admin'].includes(operand)
    }))
    assert.isTrue(await Acl.check('(admin)', operand => {
      return ['admin'].includes(operand)
    }))
  })

  test('and operator', async assert => {
    assert.isTrue(await Acl.check('admin && moderator', operand => {
      return ['admin', 'moderator'].includes(operand)
    }))
    assert.isFalse(await Acl.check('admin && moderator', operand => {
      return ['manager'].includes(operand)
    }))
    assert.isTrue(await Acl.check('admin and moderator', operand => {
      return ['admin', 'moderator'].includes(operand)
    }))
    assert.isFalse(await Acl.check('admin and moderator', operand => {
      return ['manager'].includes(operand)
    }))
  })

  test('not operator', async assert => {
    assert.isTrue(await Acl.check('!moderator', operand => {
      return ['admin'].includes(operand)
    }))
    assert.isFalse(await Acl.check('!moderator', operand => {
      return ['moderator'].includes(operand)
    }))
    assert.isTrue(await Acl.check('not moderator', operand => {
      return ['admin'].includes(operand)
    }))
    assert.isFalse(await Acl.check('not moderator', operand => {
      return ['moderator'].includes(operand)
    }))
  })

  test('or operator', async assert => {
    assert.isTrue(await Acl.check('admin || moderator', operand => {
      return ['admin', 'moderator'].includes(operand)
    }))
    assert.isTrue(await Acl.check('admin || moderator', operand => {
      return ['admin'].includes(operand)
    }))
    assert.isFalse(await Acl.check('admin || moderator', operand => {
      return ['manager'].includes(operand)
    }))
    assert.isFalse(await Acl.check('admin || moderator', operand => {
      return ['customer'].includes(operand)
    }))
    assert.isTrue(await Acl.check('admin or moderator', operand => {
      return ['admin', 'moderator'].includes(operand)
    }))
    assert.isTrue(await Acl.check('admin or moderator', operand => {
      return ['admin'].includes(operand)
    }))
    assert.isFalse(await Acl.check('admin or moderator', operand => {
      return ['manager'].includes(operand)
    }))
    assert.isFalse(await Acl.check('admin or moderator', operand => {
      return ['customer'].includes(operand)
    }))
  })

  test('complex expression', async assert => {
    assert.isTrue(await Acl.check('(admin && moderator) && !customer', operand => {
      return ['admin', 'moderator'].includes(operand)
    }))
    assert.isFalse(await Acl.check('(admin && moderator) && !customer', operand => {
      return ['admin', 'moderator', 'customer'].includes(operand)
    }))
  })

  test('should throw InvalidExpression', async assert => {
    try {
      await Acl.check('admin &&& moderator')
    } catch ({ name, message }) {
      assert.equal(name, 'InvalidExpression')
      assert.equal(message, 'Invalid expression.')
    }
  })
})
