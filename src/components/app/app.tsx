import MainPage from '../../pages/main-pages/main-page';

type AppProps = {
    placesCnt: number;
}

function App({placesCnt}: AppProps): JSX.Element {
  return (
    <MainPage placesCnt={placesCnt}/>
  );
}

export default App;
