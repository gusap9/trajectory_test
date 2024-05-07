import { useEffect, useState } from 'react';
import './App.css';
import { Loader } from './components/Loader/Loader';
import { ItemsList } from './components/ItemsList/ItemsList';
import { useAppDispatch, useAppSelector } from './store/use-app';
import { setItems } from './store/slices/itemSlice';
import { CustomMap } from './components/CustomMap/CustomMap';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state);
  useEffect(() => {
    fetch('https://test.tspb.su/test-task/vehicles')
      .then((res) => res.json())
      .then((res) => {
        dispatch(setItems(res));
        setIsLoading(false);
      });
  }, [dispatch]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className='app'>
      <ItemsList items={items} />
      <CustomMap items={items} />
    </div>
  );
}

export default App;
