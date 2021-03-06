import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import { withRouter } from 'next/router';
import { Provider } from 'react-redux';
import AppWrapper from 'docs/src/modules/components/AppWrapper';
import initRedux from 'docs/src/modules/redux/initRedux';
import findPages from /* preval */ 'docs/src/modules/utils/findPages';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

if (process.browser) {
  loadCSS(
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    document.querySelector('#insertion-point-jss'),
  );
  loadCSS(
    'https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css',
    document.querySelector('#insertion-point-jss'),
  );
}

const pages = [
  {
    pathname: '/about'
  },
  {
    pathname: '/writing',
    children: [
      {
        pathname: '/writing/meditations',
      },
      {
        pathname: '/writing/travel',
      },
    ],
  },
  {
    pathname: '/graphics',
    children: [
      {
        pathname: '/graphics/rasterizer',
      },
      {
        pathname: '/graphics/geometry',
      },
      {
        pathname: '/graphics/ray-tracing',
      },
      {
        pathname: '/graphics/ray-tracing-materials',
      },
      {
        pathname: '/graphics/cloth-simulation',
      },
    ],
  },
  {
    pathname: '/computer-vision',
    children: [
      {
        pathname: '/computer-vision/colorizer',
      },
      {
        pathname: '/computer-vision/camera-obscura',
      },
    ],
  },
  {
    pathname: '/',
    displayNav: false,
    title: false,
  },
];

function findActivePage(currentPages, router) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      return router.pathname.indexOf(`${page.pathname}/`) === 0;
    }

    // Should be an exact match if no children
    return router.pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== router.pathname) {
    return findActivePage(activePage.children, router);
  }

  return activePage;
}

function withRoot(Component) {
  class WithRoot extends React.Component {
    redux = null;

    constructor(props) {
      super();
      this.redux = initRedux(props.reduxServerState || {});
    }

    getChildContext() {
      const { router } = this.props;

      let pathname = router.pathname;
      if (pathname !== '/') {
        // The leading / is only added to support static hosting (resolve /index.html).
        // We remove it to normalize the pathname.
        pathname = pathname.replace(/\/$/, '');
      }

      return {
        pages,
        activePage: findActivePage(pages, { ...router, pathname }),
      };
    }

    render() {
      const { pageContext, ...other } = this.props;
      return (
        <React.StrictMode>
          <Provider store={this.redux}>
            <AppWrapper pageContext={pageContext}>
              <Component initialProps={other} />
            </AppWrapper>
          </Provider>
        </React.StrictMode>
      );
    }
  }

  WithRoot.propTypes = {
    pageContext: PropTypes.object,
    reduxServerState: PropTypes.object,
    router: PropTypes.object.isRequired,
  };

  WithRoot.childContextTypes = {
    pages: PropTypes.array,
    activePage: PropTypes.object,
  };

  WithRoot.getInitialProps = ctx => {
    let initialProps = {};
    const redux = initRedux({});

    if (Component.getInitialProps) {
      const componentInitialProps = Component.getInitialProps({ ...ctx, redux });
      initialProps = {
        ...componentInitialProps,
        ...initialProps,
      };
    }

    if (process.browser) {
      return initialProps;
    }

    return {
      ...initialProps,
      // No need to include other initial Redux state because when it
      // initialises on the client-side it'll create it again anyway
      reduxServerState: redux.getState(),
    };
  };

  return withRouter(WithRoot);
}

export default withRoot;
