import { For } from 'solid-js';
import routes, { RouteConfig } from '@app/routes';
import { type RouteProps, useNavigate } from '@moneko/solid';
import fastClick from 'fastclick';
import styles from './index.less';
import '@/global.less';

fastClick.attach(document.body);

type AllRoute = {
  path: string;
  metadata?: RouteConfig['metadata'];
};

function transformRoutes(inputRoutes: RouteConfig[], parentPath?: string, result: AllRoute[] = []) {
  for (const route of inputRoutes) {
    const { path, metadata, children } = route;
    const fullPath = [parentPath, path].join('/').split('/').filter(Boolean).join('/');
    const transformedRoute: AllRoute = { path: fullPath, metadata };

    if (children) {
      transformRoutes(children, fullPath, result);
    } else {
      result.push(transformedRoute);
    }
  }

  return result;
}

function App(p: RouteProps<styles>) {
  const all = transformRoutes(routes);
  const navigate = useNavigate();

  return (
    <>
      <nav class={styles.navs}>
        <For each={all}>
          {(item) => {
            return (
              <li>
                <button
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  {[item.path || '/', item.metadata?.title].filter(Boolean)}
                </button>
              </li>
            );
          }}
        </For>
      </nav>
      <main class={styles.main}>
        {p.children}
      </main>
    </>
  );
}

export default App;
