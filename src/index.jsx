import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import { Container } from 'react-bootstrap';
import { store } from './redux/store';
import { Provider } from 'react-redux';

// Import statement to indicate the need to bundle './index.scss'
import './index.scss';

// Main component (will eventually use all other)
const MyFlixApplication = () => {
  return (
    <Provider store={store}>
      <Container>
        <MainView />
      </Container>
    </Provider>
  );
};

// Finds root of app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to render app in root DOM element
root.render(<MyFlixApplication />);
