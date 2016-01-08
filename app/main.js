import LodeRactive from 'lodestar-ractive';
import IndexController from './controllers/IndexController';

let App = new LodeRactive();

App.createRoute({
  path: '/',
  controller: IndexController,
  view: {
    el: '#main-outlet',
    template: Templates['index']
  }
});
