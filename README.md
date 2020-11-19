# use-persisted-state

A custom [React Hook](https://reactjs.org/docs/hooks-overview.html) that provides a multi-instance,
multi-tab/browser shared and persistent state.

[![npm version](https://badge.fury.io/js/use-persisted-state.svg)](https://badge.fury.io/js/use-persisted-state) [![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)


`use-persisted-state` is not a hook itself, but is a factory that accepts a storage `key`
and an optional storage provider (default = `localStorage`) and returns a hook
that you can use as a direct replacement for `useState`.

## Features

💾 Persists the state to `localStorage`

🖥 Syncs between tabs and/or browser windows

📑 Shares state w/multiple hooks on a page

## Requirement

To use `use-persisted-state`, you must use `react@16.8.0` or greater which includes Hooks.

## Installation

```sh
$ npm i use-persisted-state
```

## Example

Let's take a look at how you can use `use-persisted-state`.
Here we have an example of a typical up/down counter.

```js
import { useState } from 'react';

const useCounter = initialCount => {
  const [count, setCount] = useState(initialCount);

  return {
    count,
    increment: () => setCount(currentCount => currentCount + 1),
    decrement: () => setCount(currentCount => currentCount - 1),
  };
};

export default useCounter;
```

Let's replace the import of `react` with an import from `use-persisted-state`.
And we'll call `createPersistedState` (the factory function).
This will return a `useCounterState` hook that we can use in place of `useState`.

The complete code is as follows.

```js
import createPersistedState from 'use-persisted-state';
const useCounterState = createPersistedState('count');

const useCounter = initialCount => {
  const [count, setCount] = useCounterState(initialCount);

  return {
    count,
    increment: () => setCount(currentCount => currentCount + 1),
    decrement: () => setCount(currentCount => currentCount - 1),
  };
};

export default useCounter;
```

The state is shared with any other hook using the same key, either
on the same page, across tabs, or even browser windows.

For example, open two copies of your app in two tabs or even two windows.
Any changes to state in one tab will be rendered on the other tab.

You can also close the browser and the next time you run your app,
the state will be rendered as it was before you closed your browser.

## License

**[MIT](LICENSE)** Licensed

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://donavon.com"><img src="https://avatars3.githubusercontent.com/u/887639?v=4" width="100px;" alt=""/><br /><sub><b>Donavon West</b></sub></a><br /><a href="#infra-donavon" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/donavon/use-persisted-state/commits?author=donavon" title="Tests">⚠️</a> <a href="#example-donavon" title="Examples">💡</a> <a href="#ideas-donavon" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-donavon" title="Maintenance">🚧</a> <a href="https://github.com/donavon/use-persisted-state/pulls?q=is%3Apr+reviewed-by%3Adonavon" title="Reviewed Pull Requests">👀</a> <a href="#tool-donavon" title="Tools">🔧</a> <a href="https://github.com/donavon/use-persisted-state/commits?author=donavon" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/karol-majewski"><img src="https://avatars1.githubusercontent.com/u/20233319?v=4" width="100px;" alt=""/><br /><sub><b>Karol Majewski</b></sub></a><br /><a href="https://github.com/donavon/use-persisted-state/commits?author=karol-majewski" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dispix"><img src="https://avatars1.githubusercontent.com/u/11643701?v=4" width="100px;" alt=""/><br /><sub><b>Octave Raimbault</b></sub></a><br /><a href="https://github.com/donavon/use-persisted-state/commits?author=dispix" title="Code">💻</a></td>
    <td align="center"><a href="https://morello.dev"><img src="https://avatars0.githubusercontent.com/u/19588613?v=4" width="100px;" alt=""/><br /><sub><b>Dennis Morello</b></sub></a><br /><a href="https://github.com/donavon/use-persisted-state/commits?author=dennismorello" title="Code">💻</a></td>
    <td align="center"><a href="http://fdetry.be"><img src="https://avatars0.githubusercontent.com/u/3214565?v=4" width="100px;" alt=""/><br /><sub><b>Florent</b></sub></a><br /><a href="https://github.com/donavon/use-persisted-state/commits?author=Fridus" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mungojam"><img src="https://avatars1.githubusercontent.com/u/3154635?v=4" width="100px;" alt=""/><br /><sub><b>Mark Adamson</b></sub></a><br /><a href="https://github.com/donavon/use-persisted-state/commits?author=mungojam" title="Code">💻</a></td>
    <td align="center"><a href="https://vitordino.com"><img src="https://avatars2.githubusercontent.com/u/5063967?v=4" width="100px;" alt=""/><br /><sub><b>Vitor Dino</b></sub></a><br /><a href="https://github.com/donavon/use-persisted-state/commits?author=vitordino" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
