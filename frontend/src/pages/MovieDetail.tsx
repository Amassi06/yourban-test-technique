import { useParams } from 'react-router-dom';

export const MovieDetail = () => {
  const { id } = useParams();
  return <div>Page du film {id}</div>;
};