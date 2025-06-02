import { useRoutes } from 'react-router-dom';
import { routers } from '../../routers';
function AllRouters() {
  const allRouters = useRoutes(routers);
  return <>
    {allRouters}
  </>
}

export default AllRouters;
// This component is responsible for rendering all the routes defined in the routers array.