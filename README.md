# use-persisted-state

A custom [React Hook](https://reactjs.org/docs/hooks-overview.html) that provides a multi-instance,
multi-tab/browser shared and persistent state.

[![npm version](https://badge.fury.io/js/use-persisted-state.svg)](https://badge.fury.io/js/use-persisted-state) [![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)


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
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/887639?v=4" width="100px;" alt="Donavon West"/><br /><sub><b>Donavon West</b></sub>](http://donavon.com)<br />[🚇](#infra-donavon "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/donavon/use-persisted-state/commits?author=donavon "Tests") [💡](#example-donavon "Examples") [🤔](#ideas-donavon "Ideas, Planning, & Feedback") [🚧](#maintenance-donavon "Maintenance") [👀](#review-donavon "Reviewed Pull Requests") [🔧](#tool-donavon "Tools") [💻](https://github.com/donavon/use-persisted-state/commits?author=donavon "Code") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
