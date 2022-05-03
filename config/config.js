import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  define: {
    // API_URL: 'https://anservice-capstone.conveyor.cloud/api',
    // API_URL: 'https://anservice-capstone-ux2.conveyor.cloud/api',
    API_URL: 'https://ed64-171-252-155-23.ap.ngrok.io/api',
    // API_URL: 'https://anservicecapstoneapi.azurewebsites.net/api',
  },
  history: {
    type: 'browser',
  },
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  routes,
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
  // mfsu: {},
});
