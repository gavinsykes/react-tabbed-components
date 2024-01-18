# react-tabbed-components

![Travis (.com)](https://img.shields.io/travis/com/gavinsykes/react-tabbed-components)
[![codecov](https://codecov.io/gh/gavinsykes/react-tabbed-components/branch/master/graph/badge.svg)](https://codecov.io/gh/gavinsykes/react-tabbed-components)
![GitHub top language](https://img.shields.io/github/languages/top/gavinsykes/react-tabbed-components)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/gavinsykes/react-tabbed-components)

## Display your React components as tabs

### Installation

`npm install --registry https://npm.pkg.github.com @gavinsykes/react-tabbed-components`

### Usage and Interface

```typescript
interface TabbedComponentsProps {
  children: ReactElement | Array<ReactElement>;
  customClassName?: string;
  tabNames: Array<string>;
}
```

```typescript
import { TabbedComponents } from '@gavinsykes/react-tabbed-components';

<TabbedComponents
  customClassName='This defaults to TabbedComponents'
  tabNames='This represents the labels on each tab'
>
  <Children /> // The number of children **must** match the length of the tabNames array
</TabbedComponents>

// Result:
<div class="customClassName">
  <div class="customClassName__tabs">
    <button class="customClassName__tab">tabNames[0]</button>
    <button class="customClassName__tab">tabNames[1]</button>
    // ... And so on and so forth
  </div>
  <div class="customClassName__components">
    <...Children>
  </div>
</div>
```

Here is some more complex usage - in fact this usage was the whole reason I created this component!

```typescript
import { ReactElement, useEffect, useState } from 'react';
import Gist from 'react-gist';
import getGistsByUsername from './getGists';
import { TabbedComponents } from '@gavinsykes/react-tabbed-components';

interface GistInfo {
  language: string;
  linkText: string;
}

interface TabbedGistsComponentProps {
  eulerProblemNumber: number;
}

function TabbedGists(props: TabbedGistsComponentProps): ReactElement {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filteredGistInfo, setFilteredGistInfo] = useState<Array<GistInfo>>([]);

  function clearError() {
    setError(false);
    setErrorMessage('');
  }

  useEffect(() => {
    let error = false;
    let errorMessage = '';
    async function getGists() {
      const response = await getGistsByUsername('gavinsykes');
      if (response.length == 0) {
        console.log('Response length is 0');
        error = true;
        errorMessage = 'No Gists found';
      }
      const filteredGists =
        response.filter(
          gist =>
            Object.keys(gist.files)[0]
              .startsWith(`euler_problem_${props.eulerProblemNumber}.`)
        );

      setFilteredGistInfo(
        filteredGists
          .sort(
            (a,b) => 
              Object.values(a.files)[0].language > Object.values(b.files)[0].language
              ? 1
              : -1
          )
          .map(gist => (
            {
              language: Object.values(gist.files)[0].language,
              linkText: `${gist.owner.login}/${gist.id}`
            }
          ))
      );
      if (filteredGists.length == 0) {
        error = true;
        errorMessage = `No Gists found for problem ${props.eulerProblemNumber}`;
      }
      if (error) {
        setError(true);
        setErrorMessage(errorMessage);
      } else {
        clearError();
      }
      setLoading(false);
    }

    getGists();
  }, [props.eulerProblemNumber]);

  return loading
          ? <p>TabbedGists component loading...</p>
          : error
            ? <p>{errorMessage}</p>
            : <TabbedComponents
                customClassName='TabbedGists'
                tabNames={filteredGistInfo.map(gist => gist.language)}
              >
                {
                  filteredGistInfo
                    .map((gist, index) => <Gist id={gist.linkText} key={index}/>)
                }
              </TabbedComponents>;
}

export default TabbedGists;
```
