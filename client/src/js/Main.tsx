import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Loader from './components/Loader';
import { Layout } from './components';

const Main = (props: { routes: string }): JSX.Element | null => {
  const { routes } = props;

  const [routerComponents, setRouterComponents] = useState<{path: string, key: string, component: React.FunctionComponent}[] | null>(null);
  async function getRouteComponets() {
    const cmp = routes === 'private' ? await import('./routing/private') : await import('./routing/public');
    setRouterComponents(cmp.default as any);
}
  const renderComponent = (Component: React.FunctionComponent, key: string) => {
    return (
      <Layout title={key}>
        <Suspense
          fallback={<Loader />}
        >
          <Component />
        </Suspense>
      </Layout>
    );
  };

  useEffect(() => {
    getRouteComponets();
    return () => {
        setRouterComponents(null);
    };
}, [routes]);
  return (
    <Routes>
      <Route path="*" element={<Loader />} />
      {
         (
          routerComponents?.map((route, i): JSX.Element => {
            const {
              path,
              
              component: Component
            } = route;
            return (
              <Route
                key={`${path}-${i}`}
                path={path}
                element={renderComponent(Component)}
              />
            );
          })
        )
      }
    </Routes>
  );
};

export default Main;
